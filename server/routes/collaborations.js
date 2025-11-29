const express = require('express');
const Collaboration = require('../models/Collaboration');
const Event = require('../models/Event');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/collaborations/event/:eventId
// @desc    Get all collaborations for an event
// @access  Private
router.get('/event/:eventId', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user has access
    if (event.owner.toString() !== req.user._id.toString()) {
      const collaboration = await Collaboration.findOne({
        event: req.params.eventId,
        user: req.user._id
      });
      if (!collaboration || !['owner', 'editor'].includes(collaboration.role)) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    const collaborations = await Collaboration.find({ event: req.params.eventId })
      .populate('user', 'username email firstName lastName')
      .populate('invitedBy', 'username email');

    res.json({
      success: true,
      collaborations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/collaborations
// @desc    Add collaborator to event
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { eventId, userId, role } = req.body;

    if (!eventId || !userId || !role) {
      return res.status(400).json({ message: 'Please provide event ID, user ID or username, and role' });
    }

    if (!['editor', 'viewer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Use "editor" or "viewer"' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Only owner can add collaborators
    if (event.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only event owner can add collaborators' });
    }

    // Find user by ID or username
    let user;
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      // MongoDB ObjectId format
      user = await User.findById(userId);
    } else {
      // Assume it's a username
      user = await User.findOne({ username: userId });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please provide a valid user ID or username' });
    }

    // Cannot add owner as collaborator
    if (event.owner.toString() === user._id.toString()) {
      return res.status(400).json({ message: 'Event owner is already a collaborator' });
    }

    // Check if collaboration already exists
    const existing = await Collaboration.findOne({ event: eventId, user: user._id });
    if (existing) {
      return res.status(400).json({ message: 'User is already a collaborator' });
    }

    const collaboration = await Collaboration.create({
      event: eventId,
      user: user._id,
      role,
      invitedBy: req.user._id
    });

    await collaboration.populate('user', 'username email firstName lastName');
    await collaboration.populate('invitedBy', 'username email');

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`user-${user._id}`).emit('collaboration-added', collaboration);
      io.to(`event-${eventId}`).emit('collaboration-updated', collaboration);
    }

    res.status(201).json({
      success: true,
      collaboration
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/collaborations/:id
// @desc    Update collaboration role
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { role } = req.body;

    if (!['editor', 'viewer'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const collaboration = await Collaboration.findById(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }

    const event = await Event.findById(collaboration.event);
    
    // Only owner can update roles
    if (event.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only event owner can update roles' });
    }

    collaboration.role = role;
    await collaboration.save();

    await collaboration.populate('user', 'username email firstName lastName');

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`event-${collaboration.event}`).emit('collaboration-updated', collaboration);
    }

    res.json({
      success: true,
      collaboration
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/collaborations/:id
// @desc    Remove collaborator
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const collaboration = await Collaboration.findById(req.params.id);
    if (!collaboration) {
      return res.status(404).json({ message: 'Collaboration not found' });
    }

    const event = await Event.findById(collaboration.event);
    
    // Only owner can remove collaborators, or user can remove themselves
    if (event.owner.toString() !== req.user._id.toString() && 
        collaboration.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Collaboration.findByIdAndDelete(req.params.id);

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.to(`event-${collaboration.event}`).emit('collaboration-removed', { id: req.params.id });
    }

    res.json({
      success: true,
      message: 'Collaborator removed successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


