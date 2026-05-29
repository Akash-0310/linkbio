const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  linkIndex: { type: Number, required: true },
  referrer: { type: String, default: 'direct' },
  userAgent: { type: String },
  ip: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
