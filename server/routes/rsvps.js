const express = require('express');
const RSVP = require('../models/RSVP');
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/rsvps/event/:eventId
// @desc    Get all RSVPs for an event
// @access  Private
router.get('/event/:eventId', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has access to event
    if (event.owner.toString() !== req.user._id.toString()) {
      const collaboration = await require('../models/Collaboration').findOne({
        event: req.params.eventId,
        user: req.user._id
      });
      if (!collaboration) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    const rsvps = await RSVP.find({ event: req.params.eventId })
      .populate('user', 'username email firstName lastName');

    // Calculate counts
    const counts = {
      yes: rsvps.filter(r => r.status === 'yes').reduce((sum, r) => sum + r.guests, 0),
      no: rsvps.filter(r => r.status === 'no').length,
      maybe: rsvps.filter(r => r.status === 'maybe').reduce((sum, r) => sum + r.guests, 0),
      total: rsvps.length
    };

    res.json({
      success: true,
      rsvps,
      counts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/rsvps
// @desc    Create or update RSVP
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { eventId, status, comment, guests } = req.body;

    if (!eventId || !status) {
      return res.status(400).json({ message: 'Please provide event ID and status' });
    }

    if (!['yes', 'no', 'maybe'].includes(status)) {
      return res.status(400).json({ message: 'Invalid RSVP status' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is invited or has access
    const invitation = await require('../models/Invitation').findOne({
      event: eventId,
      $or: [
        { inviteeUser: req.user._id },
        { inviteeEmail: req.user.email }
      ]
    });

    if (!invitation && event.owner.toString() !== req.user._id.toString()) {
      const collaboration = await require('../models/Collaboration').findOne({
        event: eventId,
        user: req.user._id
      });
      if (!collaboration) {
        return res.status(403).json({ message: 'You are not invited to this event' });
      }
    }

    // Update or create RSVP
    const rsvp = await RSVP.findOneAndUpdate(
      { event: eventId, user: req.user._id },
      {
        event: eventId,
        user: req.user._id,
        status,
        comment: comment || '',
        guests: guests || 1
      },
      { new: true, upsert: true }
    ).populate('user', 'username email firstName lastName');

    // Update invitation status if exists
    if (invitation && status === 'yes') {
      invitation.status = 'accepted';
      await invitation.save();
    } else if (invitation && status === 'no') {
      invitation.status = 'declined';
      await invitation.save();
    }

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`event-${eventId}`).emit('rsvp-updated', rsvp);
    }

    res.json({
      success: true,
      rsvp
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/rsvps/my/:eventId
// @desc    Get user's RSVP for an event
// @access  Private
router.get('/my/:eventId', protect, async (req, res) => {
  try {
    const rsvp = await RSVP.findOne({
      event: req.params.eventId,
      user: req.user._id
    }).populate('user', 'username email firstName lastName');

    res.json({
      success: true,
      rsvp: rsvp || null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/rsvps/:id
// @desc    Delete RSVP
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id);
    
    if (!rsvp) {
      return res.status(404).json({ message: 'RSVP not found' });
    }

    if (rsvp.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await RSVP.findByIdAndDelete(req.params.id);

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`event-${rsvp.event}`).emit('rsvp-deleted', { id: req.params.id });
    }

    res.json({
      success: true,
      message: 'RSVP deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

