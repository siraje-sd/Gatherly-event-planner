const express = require('express');
const Invitation = require('../models/Invitation');
const Event = require('../models/Event');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/invitations/event/:eventId
// @desc    Get all invitations for an event
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
      if (!collaboration || !['owner', 'editor'].includes(collaboration.role)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    const invitations = await Invitation.find({ event: req.params.eventId })
      .populate('invitedBy', 'username email')
      .populate('inviteeUser', 'username email firstName lastName');

    res.json({
      success: true,
      invitations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/invitations
// @desc    Create new invitation
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { eventId, inviteeEmail, inviteeUsername } = req.body;

    if (!eventId || (!inviteeEmail && !inviteeUsername)) {
      return res.status(400).json({ message: 'Please provide event ID and invitee email or username' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has permission to invite
    if (event.owner.toString() !== req.user._id.toString()) {
      const collaboration = await require('../models/Collaboration').findOne({
        event: eventId,
        user: req.user._id
      });
      if (!collaboration || !['owner', 'editor'].includes(collaboration.role)) {
        return res.status(403).json({ message: 'Not authorized to invite guests' });
      }
    }

    let inviteeUser = null;
    if (inviteeUsername) {
      inviteeUser = await User.findOne({ username: inviteeUsername });
      if (!inviteeUser) {
        return res.status(404).json({ message: 'User not found' });
      }
    } else if (inviteeEmail) {
      inviteeUser = await User.findOne({ email: inviteeEmail });
    }

    // Check if invitation already exists
    const existingInvitation = await Invitation.findOne({
      event: eventId,
      $or: [
        { inviteeEmail: inviteeEmail?.toLowerCase() },
        { inviteeUser: inviteeUser?._id }
      ]
    });

    if (existingInvitation) {
      return res.status(400).json({ message: 'Invitation already sent' });
    }

    const invitation = await Invitation.create({
      event: eventId,
      invitedBy: req.user._id,
      inviteeEmail: inviteeEmail?.toLowerCase(),
      inviteeUsername,
      inviteeUser: inviteeUser?._id
    });

    await invitation.populate('invitedBy', 'username email');
    if (inviteeUser) {
      await invitation.populate('inviteeUser', 'username email firstName lastName');
    }

    // Emit socket event
    const io = req.app.get('io');
    if (io && inviteeUser) {
      io.to(`user-${inviteeUser._id}`).emit('new-invitation', invitation);
    }

    res.status(201).json({
      success: true,
      invitation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/invitations/:id/status
// @desc    Update invitation status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'accepted', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    // Check if user is the invitee
    if (invitation.inviteeUser && invitation.inviteeUser.toString() !== req.user._id.toString()) {
      if (invitation.inviteeEmail && invitation.inviteeEmail !== req.user.email) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    invitation.status = status;
    await invitation.save();

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`event-${invitation.event}`).emit('invitation-updated', invitation);
    }

    res.json({
      success: true,
      invitation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/invitations/:id
// @desc    Delete invitation
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ message: 'Invitation not found' });
    }

    const event = await Event.findById(invitation.event);
    
    // Check if user has permission
    if (event.owner.toString() !== req.user._id.toString()) {
      const collaboration = await require('../models/Collaboration').findOne({
        event: invitation.event,
        user: req.user._id
      });
      if (!collaboration || !['owner', 'editor'].includes(collaboration.role)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    await Invitation.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Invitation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

