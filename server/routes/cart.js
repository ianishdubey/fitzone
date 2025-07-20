const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('cartItems');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalItems = user.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = user.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      items: user.cartItems,
      totalItems,
      totalPrice,
      formattedTotal: `₹${totalPrice.toLocaleString()}`
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/add', auth, [
  body('id').notEmpty().withMessage('Item ID is required'),
  body('name').notEmpty().withMessage('Item name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('type').isIn(['program', 'plan', 'service']).withMessage('Invalid item type'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { id, name, price, type, image, duration, level, quantity = 1 } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if item already exists in cart
    const existingItemIndex = user.cartItems.findIndex(item => item.id === id);

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      user.cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      user.cartItems.push({
        id,
        name,
        price,
        type,
        image,
        duration,
        level,
        quantity,
        addedAt: new Date()
      });
    }

    await user.save();
    await user.addActivity('cart_item_added', { itemId: id, itemName: name, quantity });

    const totalItems = user.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = user.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      message: 'Item added to cart successfully',
      items: user.cartItems,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update item quantity
router.put('/update/:itemId', auth, [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { itemId } = req.params;
    const { quantity } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.cartItems.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const oldQuantity = user.cartItems[itemIndex].quantity;
    user.cartItems[itemIndex].quantity = quantity;

    await user.save();
    await user.addActivity('cart_item_updated', { 
      itemId, 
      oldQuantity, 
      newQuantity: quantity 
    });

    const totalItems = user.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = user.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      message: 'Cart updated successfully',
      items: user.cartItems,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.cartItems.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const removedItem = user.cartItems[itemIndex];
    user.cartItems.splice(itemIndex, 1);

    await user.save();
    await user.addActivity('cart_item_removed', { 
      itemId, 
      itemName: removedItem.name 
    });

    const totalItems = user.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = user.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      message: 'Item removed from cart successfully',
      items: user.cartItems,
      totalItems,
      totalPrice
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemCount = user.cartItems.length;
    user.cartItems = [];

    await user.save();
    await user.addActivity('cart_cleared', { itemCount });

    res.json({
      message: 'Cart cleared successfully',
      items: [],
      totalItems: 0,
      totalPrice: 0
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;