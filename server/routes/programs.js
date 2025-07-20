const express = require('express');
const Program = require('../models/Program');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all programs
router.get('/', async (req, res) => {
  try {
    const programs = await Program.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select('-reviews -media');

    res.json({ programs });
  } catch (error) {
    console.error('Get programs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific program
router.get('/:id', async (req, res) => {
  try {
    const program = await Program.findOne({ 
      id: req.params.id, 
      isActive: true 
    });

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json({ program });
  } catch (error) {
    console.error('Get program error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review to program (requires auth)
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const program = await Program.findOne({ id: req.params.id });
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Check if user already reviewed
    const existingReview = program.reviews.find(
      review => review.userId.toString() === req.user.userId
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this program' });
    }

    await program.addReview(req.user.userId, rating, comment);

    res.json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;