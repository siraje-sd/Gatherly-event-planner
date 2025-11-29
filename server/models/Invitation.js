const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  invitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  inviteeEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  inviteeUsername: {
    type: String,
    trim: true
  },
  inviteeUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  invitationToken: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Generate unique token before saving
invitationSchema.pre('save', async function(next) {
  if (!this.invitationToken) {
    const uniqueId = mongoose.Types.ObjectId().toString();
    this.invitationToken = `token-${uniqueId}`;
  }
  next();
});

module.exports = mongoose.model('Invitation', invitationSchema);

