const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const sendEmail = require('../utils/sendEmail');
const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, displayName } = req.body;
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with that email or username' });
    }
    const user = await User.create({ username, email, password, displayName });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        theme: user.theme,
        links: user.links,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Forgot password — issue a reset token
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Always return the same response so we don't reveal which emails are registered
    const genericMessage = 'If an account with that email exists, a password reset link has been sent.';
    if (!user) {
      return res.json({ message: genericMessage });
    }

    // Generate a raw token for the link and store only its hash
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    let emailed = false;
    try {
      emailed = await sendEmail({
        to: user.email,
        subject: 'Reset your LinkBio password',
        text: `Reset your password using this link (valid for 1 hour): ${resetUrl}`,
        html: `<p>Hi ${user.displayName || user.username},</p>
               <p>You requested a password reset. Click the link below to choose a new password. This link is valid for 1 hour.</p>
               <p><a href="${resetUrl}">Reset my password</a></p>
               <p>If you didn't request this, you can safely ignore this email.</p>`
      });
    } catch (mailErr) {
      // If sending fails, clear the token so a stale one isn't left behind
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: 'Failed to send reset email. Please try again later.' });
    }

    const response = { message: genericMessage };
    // No SMTP configured (dev): return the link so the flow is usable locally
    if (!emailed) response.resetUrl = resetUrl;
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reset password — consume a valid reset token and set a new password
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password; // re-hashed by the pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      profilePhoto: user.profilePhoto,
      bio: user.bio,
      theme: user.theme,
      links: user.links,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user profile
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.displayName) user.displayName = req.body.displayName;
    if (req.body.bio !== undefined) user.bio = req.body.bio;
    if (req.body.profilePhoto !== undefined) user.profilePhoto = req.body.profilePhoto;
    if (req.body.theme) user.theme = req.body.theme;
    if (req.body.username) user.username = req.body.username;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      displayName: updatedUser.displayName,
      profilePhoto: updatedUser.profilePhoto,
      bio: updatedUser.bio,
      theme: updatedUser.theme,
      links: updatedUser.links
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
