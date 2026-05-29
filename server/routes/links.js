const express = require('express');
const User = require('../models/User');
const Analytics = require('../models/Analytics');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Get user's links (authenticated)
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.links.sort((a, b) => a.order - b.order));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a link
router.post('/', protect, async (req, res) => {
  try {
    const { title, url, icon } = req.body;
    const user = await User.findById(req.user._id);
    const order = user.links.length;
    user.links.push({ title, url, icon: icon || 'link', order });
    await user.save();
    res.status(201).json(user.links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a link
router.put('/:linkId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const link = user.links.id(req.params.linkId);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    if (req.body.title) link.title = req.body.title;
    if (req.body.url) link.url = req.body.url;
    if (req.body.icon) link.icon = req.body.icon;
    if (req.body.isActive !== undefined) link.isActive = req.body.isActive;
    if (req.body.order !== undefined) link.order = req.body.order;
    await user.save();
    res.json(user.links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a link
router.delete('/:linkId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.links = user.links.filter(l => l._id.toString() !== req.params.linkId);
    await user.save();
    res.json(user.links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reorder links
router.put('/reorder/all', protect, async (req, res) => {
  try {
    const { linkOrder } = req.body;
    const user = await User.findById(req.user._id);
    linkOrder.forEach(({ id, order }) => {
      const link = user.links.id(id);
      if (link) link.order = order;
    });
    await user.save();
    res.json(user.links.sort((a, b) => a.order - b.order));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public: Get profile by username
router.get('/public/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password -email');
    if (!user) return res.status(404).json({ message: 'Profile not found' });
    user.totalViews += 1;
    await user.save();
    res.json({
      displayName: user.displayName,
      bio: user.bio,
      profilePhoto: user.profilePhoto,
      theme: user.theme,
      links: user.links.filter(l => l.isActive).sort((a, b) => a.order - b.order),
      totalViews: user.totalViews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Track link click
router.post('/click/:username/:linkId', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const link = user.links.id(req.params.linkId);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    link.clicks += 1;
    await user.save();
    await Analytics.create({
      userId: user._id,
      linkIndex: user.links.indexOf(link),
      referrer: req.body.referrer || 'direct',
      userAgent: req.headers['user-agent'],
      ip: req.ip
    });
    res.json({ clicks: link.clicks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get analytics for authenticated user
router.get('/analytics', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const totalClicks = user.links.reduce((sum, link) => sum + link.clicks, 0);
    const linkStats = user.links.map(link => ({
      id: link._id,
      title: link.title,
      url: link.url,
      clicks: link.clicks,
      isActive: link.isActive
    }));
    const recentClicks = await Analytics.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({
      totalViews: user.totalViews,
      totalClicks,
      totalLinks: user.links.length,
      linkStats,
      recentClicks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
