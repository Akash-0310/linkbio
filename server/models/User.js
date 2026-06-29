const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-z0-9_-]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  displayName: {
    type: String,
    required: true,
    maxlength: 50
  },
  bio: {
    type: String,
    maxlength: 200,
    default: ''
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    enum: ['gradient-blue', 'gradient-purple', 'gradient-sunset', 'gradient-ocean', 'gradient-forest', 'minimal-light', 'minimal-dark'],
    default: 'gradient-blue'
  },
  links: [{
    title: { type: String, required: true, maxlength: 50 },
    url: { type: String, required: true },
    icon: { type: String, default: 'link' },
    clicks: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
  }],
  totalViews: { type: Number, default: 0 },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date }
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
