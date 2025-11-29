const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Event = require('../models/Event');
const Collaboration = require('../models/Collaboration');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/events';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Helper function to check event access
const checkEventAccess = async (userId, eventId, requiredRole = 'viewer') => {
  const event = await Event.findById(eventId);
  if (!event) return { hasAccess: false, event: null };

  // Owner always has access
  if (event.owner.toString() === userId.toString()) {
    return { hasAccess: true, event, role: 'owner' };
  }

  // Check collaboration
  const collaboration = await Collaboration.findOne({ event: eventId, user: userId });
  if (collaboration) {
    const roles = ['viewer', 'editor', 'owner'];
    const userRoleIndex = roles.indexOf(collaboration.role);
    const requiredRoleIndex = roles.indexOf(requiredRole);
    
    if (userRoleIndex >= requiredRoleIndex) {
      return { hasAccess: true, event, role: collaboration.role };
    }
  }

  return { hasAccess: false, event };
};

// @route   GET /api/events
// @desc    Get all events for user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get events where user is owner or collaborator
    const ownedEvents = await Event.find({ owner: userId });
    const collaborations = await Collaboration.find({ user: userId });
    const collaboratedEventIds = collaborations.map(c => c.event);
    const collaboratedEvents = await Event.find({ _id: { $in: collaboratedEventIds } });
    
    const allEvents = [...ownedEvents, ...collaboratedEvents];
    
    res.json({
      success: true,
      events: allEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const { hasAccess, event } = await checkEventAccess(req.user._id, req.params.id);
    
    if (!hasAccess || !event) {
      return res.status(404).json({ message: 'Event not found or access denied' });
    }

    await event.populate('owner', 'username email firstName lastName');
    
    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private
router.post('/', protect, upload.single('coverImage'), async (req, res) => {
  try {
    const { title, description, category, startDate, endDate, location, isPublic } = req.body;

    if (!title || !category || !startDate || !endDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const eventData = {
      title,
      description,
      category,
      startDate,
      endDate,
      location,
      isPublic: isPublic === 'true' || isPublic === true,
      owner: req.user._id
    };

    if (req.file) {
      eventData.coverImage = `/uploads/events/${req.file.filename}`;
    }

    const event = await Event.create(eventData);
    
    // Create owner collaboration
    await Collaboration.create({
      event: event._id,
      user: req.user._id,
      role: 'owner',
      invitedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private
router.put('/:id', protect, upload.single('coverImage'), async (req, res) => {
  try {
    const { hasAccess, role } = await checkEventAccess(req.user._id, req.params.id, 'editor');
    
    if (!hasAccess) {
      return res.status(403).json({ message: 'Not authorized to edit this event' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, description, category, startDate, endDate, location, isPublic } = req.body;

    if (title) event.title = title;
    if (description !== undefined) event.description = description;
    if (category) event.category = category;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;
    if (location !== undefined) event.location = location;
    if (isPublic !== undefined) event.isPublic = isPublic === 'true' || isPublic === true;

    if (req.file) {
      // Delete old image if exists
      if (event.coverImage) {
        const oldImagePath = path.join(__dirname, '..', event.coverImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      event.coverImage = `/uploads/events/${req.file.filename}`;
    }

    await event.save();

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Only owner can delete
    if (event.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    // Delete cover image if exists
    if (event.coverImage) {
      const imagePath = path.join(__dirname, '..', event.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Event.findByIdAndDelete(req.params.id);
    await Collaboration.deleteMany({ event: req.params.id });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/events/invite/:link
// @desc    Get event by invitation link
// @access  Public
router.get('/invite/:link', async (req, res) => {
  try {
    const event = await Event.findOne({ invitationLink: req.params.link });
    
    if (!event) {
      return res.status(404).json({ message: 'Invalid invitation link' });
    }

    await event.populate('owner', 'username email firstName lastName');

    res.json({
      success: true,
      event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

