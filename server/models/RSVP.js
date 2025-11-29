const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
    required: true
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters']
  },
  guests: {
    type: Number,
    default: 1,
    min: 1
  }
}, {
  timestamps: true
});

// Ensure one RSVP per user per event
rsvpSchema.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('RSVP', rsvpSchema);

