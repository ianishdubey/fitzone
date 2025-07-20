const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow guest orders
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    type: String,
    quantity: Number,
    duration: String,
    level: String,
    originalPrice: Number,
    discount: String
  }],
  billing: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    isGuest: { type: Boolean, default: false },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'upi', 'wallet', 'bank_transfer'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentIntentId: String,
    amount: {
      subtotal: Number,
      processingFee: Number,
      tax: Number,
      discount: Number,
      total: Number
    },
    currency: {
      type: String,
      default: 'INR'
    },
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number,
    refundReason: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  fulfillment: {
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed'],
      default: 'pending'
    },
    completedAt: Date,
    notes: String
  },
  notifications: {
    confirmationSent: { type: Boolean, default: false },
    reminderSent: { type: Boolean, default: false },
    completionSent: { type: Boolean, default: false }
  },
  metadata: {
    source: String,
    userAgent: String,
    ipAddress: String,
    referrer: String
  },
  notes: String,
  history: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String,
    updatedBy: String
  }]
}, {
  timestamps: true
});

// Indexes
orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ createdAt: -1 });

// Virtual for total amount
orderSchema.virtual('totalAmount').get(function() {
  return this.payment.amount.total;
});

// Method to add history entry
orderSchema.methods.addHistory = function(status, note = '', updatedBy = 'system') {
  this.history.push({
    status,
    note,
    updatedBy,
    timestamp: new Date()
  });
  
  this.status = status;
  
  // Don't save here to avoid conflicts, let the caller save
  return this;
};

// Method to update payment status
orderSchema.methods.updatePaymentStatus = function(status, transactionId = null) {
  this.payment.status = status;
  
  if (transactionId) {
    this.payment.transactionId = transactionId;
  }
  
  if (status === 'completed') {
    this.payment.paidAt = new Date();
    this.status = 'confirmed';
  } else if (status === 'failed') {
    this.status = 'cancelled';
  }
  
  this.addHistory(this.status, `Payment ${status}`);
  return this.save();
};

// Method to process refund
orderSchema.methods.processRefund = function(amount, reason) {
  this.payment.status = 'refunded';
  this.payment.refundedAt = new Date();
  this.payment.refundAmount = amount;
  this.payment.refundReason = reason;
  this.status = 'refunded';
  
  this.addHistory('refunded', `Refund processed: ₹${amount} - ${reason}`);
  return this.save();
};

// Static method to generate order ID
orderSchema.statics.generateOrderId = function() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `FZ-${timestamp}-${random}`.toUpperCase();
};

module.exports = mongoose.model('Order', orderSchema);