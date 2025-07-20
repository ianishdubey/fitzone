import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Crown, Shield, Sparkles, Zap, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Pricing = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const plans = [
    {
      name: 'Basic',
      price: '2,199',
      period: 'month',
      description: 'Perfect for beginners starting their fitness journey',
      gradient: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      textColor: 'text-blue-700',
      features: [
        'Access to gym equipment',
        'Locker room access',
        'Basic fitness assessment',
        'Mobile app access',
        'Community support',
        'Standard hours access'
      ],
      popular: false,
      color: 'blue'
    },
    {
      name: 'Premium',
      price: '4,499',
      period: 'month',
      description: 'Most popular plan with comprehensive features',
      gradient: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      textColor: 'text-orange-700',
      features: [
        'All Basic features',
        'Unlimited group classes',
        'Personal training session (1/month)',
        'Nutrition consultation',
        'Priority booking',
        'Guest passes (2/month)',
        'Extended hours access'
      ],
      popular: true,
      color: 'orange'
    },
    {
      name: 'Elite',
      price: '7,499',
      period: 'month',
      description: 'Premium experience with exclusive benefits',
      gradient: 'from-purple-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-blue-50',
      textColor: 'text-purple-700',
      features: [
        'All Premium features',
        'Unlimited personal training',
        'Custom meal planning',
        'Recovery services',
        '24/7 gym access',
        'Exclusive member events',
        'Towel service',
        'Supplement discounts'
      ],
      popular: false,
      color: 'blue'
    }
  ];

  const handleAddToCart = (plan: any) => {
    const price = parseInt(plan.price.replace(',', ''));
    addItem({
      id: `plan-${plan.name.toLowerCase()}`,
      name: `${plan.name} Plan`,
      price: price,
      type: 'plan',
      duration: plan.period,
      level: plan.name,
      originalPrice: plan.name === 'Premium' ? 5999 : plan.name === 'Elite' ? 9999 : 2999,
      discount: plan.name === 'Premium' ? '25% off' : plan.name === 'Elite' ? '25% off' : '27% off'
    });
    
    alert(`${plan.name} Plan added to cart!`);
  };
  const getIcon = (planName: string) => {
    switch (planName) {
      case 'Basic':
        return <Shield className="w-8 h-8" />;
      case 'Premium':
        return <Star className="w-8 h-8" />;
      case 'Elite':
        return <Crown className="w-8 h-8" />;
      default:
        return <Shield className="w-8 h-8" />;
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-orange-500 bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-orange-400 border-opacity-30">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-orange-300 font-medium">Membership Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Choose Your <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Fitness Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan that fits your lifestyle and fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {plans.map((plan, index) => (
            <div key={index} className={`${plan.bgColor} backdrop-blur-sm rounded-2xl shadow-xl p-8 relative transition-all duration-500 hover:shadow-2xl hover:scale-105 border border-white border-opacity-20 ${plan.popular ? 'ring-2 ring-orange-400 ring-opacity-50 transform scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8 relative">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${plan.gradient} text-white shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                  {getIcon(plan.name)}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                <p className={`${plan.textColor} mb-6 leading-relaxed`}>{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-xl font-bold text-gray-900">₹</span>
                    <span className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">Billed monthly • Cancel anytime</div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/pricing/${plan.name.toLowerCase()}`)}
                  className={`w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-lg bg-gradient-to-r ${plan.gradient} text-white hover:shadow-xl flex items-center justify-center space-x-2`}
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
                
                <button 
                  onClick={() => handleAddToCart(plan)}
                  className="w-full py-3 rounded-xl font-bold transition-all duration-300 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
              
              {plan.popular && (
                <div className="mt-4 text-center">
                  <span className="text-xs text-orange-600 font-medium bg-orange-100 px-3 py-1 rounded-full">
                    Save 25% compared to Basic
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 relative z-10">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <h3 className="text-xl font-bold text-white mb-4">All Plans Include</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>7-day money-back guarantee</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Student discounts available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;