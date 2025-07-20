const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

// Create payment intent (Stripe simulation)
router.post('/create-payment-intent', auth, [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').isIn(['inr', 'usd']).withMessage('Invalid currency'),
  body('payment_method').isIn(['card', 'upi', 'wallet']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { amount, currency, payment_method, customer_info, items } = req.body;

    // Simulate payment intent creation
    // In production, this would integrate with Stripe API
    const paymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency,
      status: 'requires_payment_method',
      payment_method_types: [payment_method],
      created: Math.floor(Date.now() / 1000),
      customer_info,
      items
    };

    console.log('Payment intent created:', paymentIntent.id);

    res.json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ message: 'Server error creating payment intent' });
  }
});

// Confirm payment (simulation)
router.post('/confirm-payment', auth, [
  body('payment_intent_id').notEmpty().withMessage('Payment intent ID is required'),
  body('items').isArray({ min: 1 }).withMessage('Items are required'),
  body('billing').notEmpty().withMessage('Billing information is required'),
  body('payment_method').notEmpty().withMessage('Payment method is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    // Only fail if billing or payment_method or items are missing/invalid
    const filteredErrors = errors.array().filter(err =>
      ['billing', 'payment_method', 'items'].includes(err.param)
    );
    if (filteredErrors.length > 0) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: filteredErrors
      });
    }

    const { payment_intent_id, payment_method_id, items, billing, payment_method } = req.body;

    // Simulate payment confirmation
    const confirmedPayment = {
      id: payment_intent_id,
      status: 'succeeded',
      amount_received: items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
      currency: 'inr',
      payment_method: payment_method_id,
      confirmed_at: new Date()
    };

    // Calculate amounts
    const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const processingFee = Math.round(subtotal * 0.029); // 2.9% processing fee
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + processingFee + tax;

    // Create order in MongoDB
    const order = new Order({
      orderId: Order.generateOrderId(),
      userId: req.user.userId,
      items,
      billing,
      payment: {
        method: payment_method,
        amount: {
          subtotal,
          processingFee,
          tax,
          discount: 0,
          total
        },
        status: 'completed',
        transactionId: payment_intent_id,
        paymentIntentId: payment_intent_id,
        paidAt: new Date()
      },
      status: 'confirmed',
      metadata: {
        source: 'web',
        userAgent: req.get('User-Agent'),
        ipAddress: req.ip
      }
    });

    await order.save();
    await order.addHistory('confirmed', 'Payment completed successfully');

    // Update user's purchased programs if any program items exist
    const user = await User.findById(req.user.userId);
    if (user) {
      const programIds = items
        .filter(item => item.type === 'program')
        .map(item => item.id);
      if (programIds.length > 0) {
        user.purchasedPrograms = [...new Set([...user.purchasedPrograms, ...programIds])];
        await user.save();
        await user.addActivity('programs_purchased', { 
          orderId: order.orderId,
          programs: programIds 
        });
      }
      user.cartItems = [];
      await user.save();
      await user.addActivity('order_completed', { 
        orderId: order.orderId,
        total: total,
        itemCount: items.length 
      });
    }

    console.log('Order created successfully:', order.orderId);

    res.json({
      payment_intent: confirmedPayment,
      order,
      success: true
    });
  } catch (error) {
    console.error('Payment confirmation/order error:', error);
    res.status(500).json({ message: 'Server error confirming payment or saving order' });
  }
});

module.exports = router;