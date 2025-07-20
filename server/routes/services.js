const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Mock services data
const services = [
  {
    id: 'weight-training',
    title: 'Weight Training',
    description: 'Professional weight training with state-of-the-art equipment',
    price: 2500,
    duration: '60-90 minutes',
    level: 'All Levels'
  },
  {
    id: 'cardio-fitness',
    title: 'Cardio Fitness',
    description: 'High-energy cardio workouts to boost cardiovascular health',
    price: 1800,
    duration: '45-60 minutes',
    level: 'All Levels'
  },
  {
    id: 'group-classes',
    title: 'Group Classes',
    description: 'Motivating group fitness classes for all levels',
    price: 1500,
    duration: '45-75 minutes',
    level: 'All Levels'
  },
  {
    id: 'personal-training',
    title: 'Personal Training',
    description: 'One-on-one training sessions tailored to your goals',
    price: 6000,
    duration: 'Flexible',
    level: 'Customized'
  },
  {
    id: '24-7-access',
    title: '24/7 Access',
    description: 'Round-the-clock gym access for premium members',
    price: 4999,
    duration: 'Unlimited',
    level: 'All Levels'
  },
  {
    id: 'nutrition-coaching',
    title: 'Nutrition Coaching',
    description: 'Professional nutrition guidance for your fitness journey',
    price: 3500,
    duration: '60 minutes',
    level: 'All Levels'
  }
];

// Get all services
router.get('/', async (req, res) => {
  try {
    res.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific service
router.get('/:id', async (req, res) => {
  try {
    const service = services.find(s => s.id === req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ service });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;