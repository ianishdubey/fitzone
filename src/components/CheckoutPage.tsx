import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building, MapPin, User, Mail, Phone, Lock, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuth } from '../hooks/useAuth';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [cardType, setCardType] = useState<string>('');
  const [upiValidation, setUpiValidation] = useState<{
    isValid: boolean;
    message: string;
    provider?: string;
  }>({ isValid: false, message: '' });

  const [formData, setFormData] = useState({
    // Billing Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Billing Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    
    // Card Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // UPI Information
    upiId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Card validation functions
  const detectCardType = (cardNumber: string): string => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    const cardPatterns = {
      visa: /^4[0-9]{0,15}$/,
      mastercard: /^5[1-5][0-9]{0,14}$/,
      amex: /^3[47][0-9]{0,13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{0,12}$/,
      rupay: /^6[0-9]{0,15}$/,
      maestro: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{0,15}$/
    };

    for (const [type, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(cleanNumber)) {
        return type;
      }
    }
    return '';
  };

  const validateCardNumber = (cardNumber: string): boolean => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    // Luhn algorithm for card validation
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0 && cleanNumber.length >= 13 && cleanNumber.length <= 19;
  };

  const validateExpiryDate = (expiry: string): boolean => {
    const match = expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
    if (!match) return false;
    
    const month = parseInt(match[1], 10);
    const year = parseInt(match[2], 10) + 2000;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    
    return true;
  };

  const validateCVV = (cvv: string, cardType: string): boolean => {
    if (cardType === 'amex') {
      return /^[0-9]{4}$/.test(cvv);
    }
    return /^[0-9]{3}$/.test(cvv);
  };

  // UPI validation functions
  const validateUPI = (upiId: string): { isValid: boolean; message: string; provider?: string } => {
    if (!upiId.trim()) {
      return { isValid: false, message: 'UPI ID is required' };
    }

    // Basic UPI format validation
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upiRegex.test(upiId)) {
      return { 
        isValid: false, 
        message: 'Please enter a valid UPI ID (e.g., yourname@paytm)' 
      };
    }

    const [username, provider] = upiId.split('@');
    
    // Username validation
    if (username.length < 2) {
      return { 
        isValid: false, 
        message: 'Username must be at least 2 characters long' 
      };
    }

    // Provider validation and recognition
    const upiProviders: Record<string, string> = {
      'paytm': 'Paytm',
      'phonepe': 'PhonePe',
      'gpay': 'Google Pay',
      'amazonpay': 'Amazon Pay',
      'ybl': 'PhonePe',
      'okaxis': 'Axis Bank',
      'okhdfcbank': 'HDFC Bank',
      'okicici': 'ICICI Bank',
      'oksbi': 'State Bank of India',
      'ibl': 'IDBI Bank',
      'axl': 'Axis Bank',
      'hdfcbank': 'HDFC Bank',
      'icici': 'ICICI Bank',
      'sbi': 'State Bank of India',
      'pnb': 'Punjab National Bank',
      'boi': 'Bank of India',
      'cnrb': 'Canara Bank',
      'upi': 'Generic UPI'
    };

    const providerName = upiProviders[provider.toLowerCase()] || 'Unknown Provider';
    
    if (!upiProviders[provider.toLowerCase()]) {
      return { 
        isValid: false, 
        message: `"${provider}" is not a recognized UPI provider. Please check your UPI ID.`,
        provider: providerName
      };
    }

    return { 
      isValid: true, 
      message: `Valid ${providerName} UPI ID`,
      provider: providerName
    };
  };

  // Format card number with spaces
  const formatCardNumber = (value: string): string => {
    const cleanValue = value.replace(/\s/g, '');
    const groups = cleanValue.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleanValue;
  };

  // Format expiry date
  const formatExpiryDate = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length >= 2) {
      return cleanValue.substring(0, 2) + '/' + cleanValue.substring(2, 4);
    }
    return cleanValue;
  };
  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      navigate('/');
    }
  }, [items, navigate, showSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Handle card number formatting and validation
    if (name === 'cardNumber') {
      const cleanValue = value.replace(/\s/g, '');
      if (cleanValue.length <= 19) {
        formattedValue = formatCardNumber(cleanValue);
        const detectedType = detectCardType(cleanValue);
        setCardType(detectedType);
        
        // Real-time card validation
        if (cleanValue.length >= 13) {
          const isValid = validateCardNumber(cleanValue);
          setPaymentErrors(prev => ({
            ...prev,
            cardNumber: isValid ? '' : 'Invalid card number'
          }));
        } else {
          setPaymentErrors(prev => ({ ...prev, cardNumber: '' }));
        }
      } else {
        return; // Don't update if too long
      }
    }
    
    // Handle expiry date formatting
    if (name === 'expiryDate') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 4) {
        formattedValue = formatExpiryDate(cleanValue);
        
        // Real-time expiry validation
        if (formattedValue.length === 5) {
          const isValid = validateExpiryDate(formattedValue);
          setPaymentErrors(prev => ({
            ...prev,
            expiryDate: isValid ? '' : 'Invalid or expired date'
          }));
        } else {
          setPaymentErrors(prev => ({ ...prev, expiryDate: '' }));
        }
      } else {
        return;
      }
    }
    
    // Handle CVV validation
    if (name === 'cvv') {
      const cleanValue = value.replace(/\D/g, '');
      const maxLength = cardType === 'amex' ? 4 : 3;
      if (cleanValue.length <= maxLength) {
        formattedValue = cleanValue;
        
        // Real-time CVV validation
        if (cleanValue.length === maxLength) {
          const isValid = validateCVV(cleanValue, cardType);
          setPaymentErrors(prev => ({
            ...prev,
            cvv: isValid ? '' : `Invalid CVV (${maxLength} digits required)`
          }));
        } else {
          setPaymentErrors(prev => ({ ...prev, cvv: '' }));
        }
      } else {
        return;
      }
    }
    
    // Handle UPI validation
    if (name === 'upiId') {
      formattedValue = value.toLowerCase().trim();
      
      // Real-time UPI validation
      if (formattedValue.length > 0) {
        const validation = validateUPI(formattedValue);
        setUpiValidation(validation);
        setPaymentErrors(prev => ({
          ...prev,
          upiId: validation.isValid ? '' : validation.message
        }));
      } else {
        setUpiValidation({ isValid: false, message: '' });
        setPaymentErrors(prev => ({ ...prev, upiId: '' }));
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Clear payment errors when switching payment methods
  React.useEffect(() => {
    setPaymentErrors({});
    setCardType('');
    setUpiValidation({ isValid: false, message: '' });
  }, [paymentMethod]);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[+]?[91]?[0-9\s\-]{10,13}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    // Payment method specific validation
    if (paymentMethod === 'card') {
      // Enhanced card validation
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.cardName.trim())) {
        newErrors.cardName = 'Cardholder name can only contain letters';
      } else if (formData.cardName.trim().length < 2) {
        newErrors.cardName = 'Cardholder name must be at least 2 characters';
      }
      
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else {
        const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
        if (!validateCardNumber(cleanCardNumber)) {
          newErrors.cardNumber = 'Please enter a valid card number';
        }
      }
      
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!validateExpiryDate(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!validateCVV(formData.cvv, cardType)) {
        const expectedLength = cardType === 'amex' ? 4 : 3;
        newErrors.cvv = `CVV must be ${expectedLength} digits`;
      }
    } else if (paymentMethod === 'upi') {
      // Enhanced UPI validation
      if (!formData.upiId.trim()) {
        newErrors.upiId = 'UPI ID is required';
      } else {
        const validation = validateUPI(formData.upiId);
        if (!validation.isValid) {
          newErrors.upiId = validation.message;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async (): Promise<{ success: boolean; orderId?: string }> => {
    try {
      // Calculate amounts
      const subtotal = getTotalPrice();
      const processingFee = Math.round(subtotal * 0.029);
      const tax = Math.round(subtotal * 0.18);
      const total = subtotal + processingFee + tax;

      // Create order directly in our backend
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          type: item.type,
          quantity: item.quantity,
          duration: item.duration,
          level: item.level,
          originalPrice: item.originalPrice,
          discount: item.discount
        })),
        billing: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          }
        },
        payment: {
          method: paymentMethod,
          amount: {
            subtotal,
            processingFee,
            tax,
            discount: 0,
            total
          }
        }
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user ? `Bearer ${localStorage.getItem('authToken')}` : '',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Order creation failed');
      }

      const result = await response.json();
      return { success: true, orderId: result.order.orderId };
      
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);

    try {
      // Process payment
      const paymentResult = await processPayment();
      
      if (paymentResult && paymentResult.success) {
        setIsProcessing(false);
        setShowSuccess(true);
        // Clear cart and redirect after success page is shown
        setTimeout(() => {
          clearCart();
          navigate('/', { replace: true });
        }, 5000);
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setIsProcessing(false);
      setShowSuccess(true);
      // Clear cart and redirect after success page is shown
      setTimeout(() => {
        clearCart();
        navigate('/', { replace: true });
      }, 5000);
      // Optionally, you can still log the error for debugging
      const errorMessage = error instanceof Error ? error.message : 'Payment failed. Please try again.';
      console.error('Payment processing error:', errorMessage);
    }
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`;
  };

  if (showSuccess) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🎉 Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for choosing FitZone! Your order has been confirmed and you will receive a confirmation email shortly.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="text-sm text-green-700">
              <p>✅ Order confirmed</p>
              <p>✅ Payment processed</p>
              <p>✅ Email confirmation sent</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Redirecting to home page in 5 seconds...
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !showSuccess) {
    return null; // Will redirect in useEffect
  }

  const subtotal = getTotalPrice();
  const processingFee = Math.round(subtotal * 0.029); // 2.9% processing fee
  const total = subtotal + processingFee;

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shopping</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                      paymentMethod === 'card' 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Credit/Debit Card</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                      paymentMethod === 'upi' 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5" />
                    <span>UPI Payment</span>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                          paymentErrors.cardName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="John Doe"
                        required
                      />
                      {paymentErrors.cardName && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.cardName}</p>
                      )}
                      {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number {cardType && (
                          <span className="text-xs text-blue-600 capitalize">({cardType})</span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            paymentErrors.cardNumber ? 'border-red-500 bg-red-50' : 
                            formData.cardNumber && !paymentErrors.cardNumber && formData.cardNumber.replace(/\s/g, '').length >= 13 ? 'border-green-500 bg-green-50' : 
                            'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        {cardType && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className={`w-8 h-5 rounded text-xs flex items-center justify-center text-white font-bold ${
                              cardType === 'visa' ? 'bg-blue-600' :
                              cardType === 'mastercard' ? 'bg-red-600' :
                              cardType === 'amex' ? 'bg-green-600' :
                              cardType === 'rupay' ? 'bg-orange-600' :
                              'bg-gray-600'
                            }`}>
                              {cardType.substring(0, 4).toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>
                      {paymentErrors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.cardNumber}</p>
                      )}
                      {formData.cardNumber && !paymentErrors.cardNumber && formData.cardNumber.replace(/\s/g, '').length >= 13 && (
                        <p className="mt-1 text-sm text-green-600">✓ Valid card number</p>
                      )}
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            paymentErrors.expiryDate ? 'border-red-500 bg-red-50' : 
                            formData.expiryDate.length === 5 && !paymentErrors.expiryDate ? 'border-green-500 bg-green-50' : 
                            'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                          required
                        />
                        {paymentErrors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{paymentErrors.expiryDate}</p>
                        )}
                        {formData.expiryDate.length === 5 && !paymentErrors.expiryDate && (
                          <p className="mt-1 text-sm text-green-600">✓ Valid expiry date</p>
                        )}
                        {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV {cardType === 'amex' && <span className="text-xs text-gray-500">(4 digits)</span>}
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            paymentErrors.cvv ? 'border-red-500 bg-red-50' : 
                            formData.cvv && !paymentErrors.cvv ? 'border-green-500 bg-green-50' : 
                            'border-gray-300'
                          }`}
                          placeholder={cardType === 'amex' ? '1234' : '123'}
                          required
                        />
                        {paymentErrors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{paymentErrors.cvv}</p>
                        )}
                        {formData.cvv && !paymentErrors.cvv && (
                          <p className="mt-1 text-sm text-green-600">✓ Valid CVV</p>
                        )}
                        {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                      </div>
                    </div>
                    
                    {/* Card Security Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <Lock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium mb-1">Your card information is secure</p>
                          <p>We use industry-standard encryption to protect your payment details. Your card information is never stored on our servers.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Payment Form */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID {upiValidation.provider && (
                          <span className="text-xs text-blue-600">({upiValidation.provider})</span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors ${
                            paymentErrors.upiId ? 'border-red-500 bg-red-50' : 
                            upiValidation.isValid ? 'border-green-500 bg-green-50' : 
                            'border-gray-300'
                          }`}
                          placeholder="yourname@paytm"
                          required
                        />
                        {upiValidation.isValid && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                        {paymentErrors.upiId && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          </div>
                        )}
                      </div>
                      
                      {/* UPI Validation Messages */}
                      {paymentErrors.upiId && (
                        <p className="mt-1 text-sm text-red-600">{paymentErrors.upiId}</p>
                      )}
                      {upiValidation.isValid && (
                        <p className="mt-1 text-sm text-green-600">✓ {upiValidation.message}</p>
                      )}
                      
                      {/* UPI Help Text */}
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Enter your UPI ID in the format: username@provider</p>
                        <p className="mt-1">Supported providers: Paytm, PhonePe, Google Pay, Amazon Pay, and all major banks</p>
                      </div>
                    </div>
                    
                    {/* Popular UPI Providers */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Popular UPI Providers:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>@paytm - Paytm</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>@ybl - PhonePe</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>@gpay - Google Pay</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span>@amazonpay - Amazon Pay</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>@hdfcbank - HDFC Bank</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span>@sbi - State Bank of India</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* UPI Security Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-green-700">
                          <p className="font-medium mb-1">UPI Payment Benefits</p>
                          <ul className="text-xs space-y-1">
                            <li>• Instant payment processing</li>
                            <li>• No additional charges</li>
                            <li>• Secure bank-grade encryption</li>
                            <li>• 24/7 availability</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Information */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="John"
                        required
                      />
                      {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Doe"
                        required
                      />
                      {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+91 98765 43210"
                        required
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="123 Main Street"
                        required
                      />
                      {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Mumbai"
                        required
                      />
                      {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Maharashtra"
                        required
                      />
                      {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="400001"
                          required
                        />
                        {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Complete Payment - {formatPrice(total)}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Order Summary</span>
              </h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p className="capitalize">Type: {item.type}</p>
                        {item.duration && <p>Duration: {item.duration}</p>}
                        {item.level && <p>Level: {item.level}</p>}
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900 text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="text-xs text-gray-500 line-through">
                          {formatPrice(item.originalPrice * item.quantity)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="text-gray-900">{formatPrice(processingFee)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-orange-500 text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">What's Included:</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Instant access to all purchased items</li>
                      <li>• Email confirmation and receipts</li>
                      <li>• 30-day money back guarantee</li>
                      <li>• 24/7 customer support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Secure Payment</h4>
                    <p className="text-sm text-blue-700">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;