const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'editor', 'viewer'],
    required: true,
    default: 'viewer'
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Ensure one collaboration per user per event
collaborationSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Collaboration', collaborationSchema);

