const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Mock pricing plans data
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2199,
    originalPrice: 2999,
    period: 'month',
    features: [
      'Access to gym equipment',
      'Locker room access',
      'Basic fitness assessment',
      'Mobile app access',
      'Community support',
      'Standard hours access'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4499,
    originalPrice: 5999,
    period: 'month',
    features: [
      'All Basic features',
      'Unlimited group classes',
      'Personal training session (1/month)',
      'Nutrition consultation',
      'Priority booking',
      'Guest passes (2/month)',
      'Extended hours access'
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 7499,
    originalPrice: 9999,
    period: 'month',
    features: [
      'All Premium features',
      'Unlimited personal training',
      'Custom meal planning',
      'Recovery services',
      '24/7 gym access',
      'Exclusive member events',
      'Towel service',
      'Supplement discounts'
    ]
  }
];

// Get all pricing plans
router.get('/', async (req, res) => {
  try {
    res.json({ plans });
  } catch (error) {
    console.error('Get pricing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific plan
router.get('/:id', async (req, res) => {
  try {
    const plan = plans.find(p => p.id === req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ plan });
  } catch (error) {
    console.error('Get plan error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;