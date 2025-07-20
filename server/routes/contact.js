const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendWelcomeEmail } = require('../utils/emailService');

const router = express.Router();

// Contact form submission
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, phone, message } = req.body;

    // In a real application, you would save this to database
    // and/or send an email notification
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      timestamp: new Date()
    });

    // Simulate email sending (optional)
    try {
      // You could send a confirmation email here
      // await sendContactConfirmation({ name, email, message });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.json({
      message: 'Thank you for your message! We will get back to you soon.',
      success: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error processing your message' });
  }
});

module.exports = router;