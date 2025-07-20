import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Star, Crown, Shield, Zap, Users, Clock, Award, CheckCircle } from 'lucide-react';

const PricingDetail = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const plansData = {
    'basic': {
      name: 'Basic',
      price: '2,199',
      originalPrice: '2,999',
      period: 'month',
      description: 'Perfect for beginners starting their fitness journey with essential gym access and basic support.',
      longDescription: 'Our Basic plan is designed for fitness enthusiasts who want access to quality equipment and facilities without breaking the bank. This plan includes everything you need to start your fitness journey with confidence.',
      gradient: 'from-blue-400 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      textColor: 'text-blue-700',
      features: [
        'Access to gym equipment during standard hours',
        'Locker room and shower facilities',
        'Basic fitness assessment and goal setting',
        'Mobile app access with workout tracking',
        'Community support and motivation',
        'Standard hours access (6 AM - 10 PM)',
        'Free Wi-Fi throughout the facility',
        'Parking facilities'
      ],
      benefits: [
        'Cost-effective way to start your fitness journey',
        'Access to professional-grade equipment',
        'Clean and well-maintained facilities',
        'Supportive community environment',
        'Flexible month-to-month membership'
      ],
      testimonials: [
        {
          name: 'Rahul Sharma',
          rating: 4,
          comment: 'Great value for money! The basic plan has everything I need to stay fit.',
          image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          name: 'Priya Singh',
          rating: 5,
          comment: 'Perfect for beginners like me. The staff is very helpful and encouraging.',
          image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        }
      ],
      popular: false,
      color: 'blue',
      savings: '27% off'
    },
    'premium': {
      name: 'Premium',
      price: '4,499',
      originalPrice: '5,999',
      period: 'month',
      description: 'Most popular plan with comprehensive features including group classes and personal training.',
      longDescription: 'Our Premium plan offers the perfect balance of value and comprehensive fitness services. With unlimited group classes, personal training sessions, and priority booking, this plan is designed for serious fitness enthusiasts.',
      gradient: 'from-orange-400 to-red-500',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
      textColor: 'text-orange-700',
      features: [
        'All Basic plan features included',
        'Unlimited group fitness classes',
        'One personal training session per month',
        'Nutrition consultation with certified dietitian',
        'Priority booking for classes and equipment',
        'Guest passes (2 per month)',
        'Extended hours access (5 AM - 11 PM)',
        'Towel service included',
        'Supplement discounts (10% off)',
        'Free body composition analysis'
      ],
      benefits: [
        'Comprehensive fitness solution',
        'Professional guidance and support',
        'Variety in workout routines',
        'Faster results with expert help',
        'Social motivation through group classes'
      ],
      testimonials: [
        {
          name: 'Amit Patel',
          rating: 5,
          comment: 'The premium plan transformed my fitness journey. The personal training sessions are invaluable!',
          image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          name: 'Kavya Mehta',
          rating: 5,
          comment: 'Love the group classes! Great variety and amazing instructors. Worth every rupee.',
          image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        }
      ],
      popular: true,
      color: 'orange',
      savings: '25% off'
    },
    'elite': {
      name: 'Elite',
      price: '7,499',
      originalPrice: '9,999',
      period: 'month',
      description: 'Premium experience with exclusive benefits including unlimited personal training and 24/7 access.',
      longDescription: 'Our Elite plan is the ultimate fitness experience, offering unlimited personal training, 24/7 gym access, and exclusive member benefits. This plan is perfect for those who want the best of everything.',
      gradient: 'from-purple-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-blue-50',
      textColor: 'text-purple-700',
      features: [
        'All Premium plan features included',
        'Unlimited personal training sessions',
        'Custom meal planning and nutrition coaching',
        'Recovery services (massage, sauna)',
        '24/7 gym access with keycard',
        'Exclusive member events and workshops',
        'Premium towel and amenity service',
        'Supplement discounts (20% off)',
        'Priority equipment reservation',
        'Complimentary guest passes (5 per month)',
        'Free fitness gear and merchandise',
        'Dedicated parking spot'
      ],
      benefits: [
        'Maximum personalized attention',
        'Fastest path to fitness goals',
        'Exclusive access and privileges',
        'Complete wellness solution',
        'VIP treatment and service'
      ],
      testimonials: [
        {
          name: 'Rajesh Kumar',
          rating: 5,
          comment: 'Elite plan is worth every penny! The unlimited personal training has completely transformed my physique.',
          image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          name: 'Sneha Gupta',
          rating: 5,
          comment: 'The 24/7 access is perfect for my schedule. The recovery services are an amazing bonus!',
          image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        }
      ],
      popular: false,
      color: 'purple',
      savings: '25% off'
    }
  };

  const plan = plansData[planId as keyof typeof plansData];

  if (!plan) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="pt-20" id="pricing-detail-top">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Pricing</span>
          </button>
          
          <div className="text-center text-white">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-r ${plan.gradient} text-white shadow-lg`}>
              {getIcon(plan.name)}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{plan.name} Plan</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">{plan.description}</p>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="text-center">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-2xl font-bold">₹</span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-xl text-gray-300">/{plan.period}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-gray-400 line-through">₹{plan.originalPrice}</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">{plan.savings}</span>
                </div>
              </div>
            </div>
            
            {plan.popular && (
              <div className="inline-flex items-center space-x-2 bg-orange-500 px-6 py-2 rounded-full mb-6">
                <Star className="w-4 h-4" />
                <span className="font-medium">Most Popular Choice</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Plan</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">{plan.longDescription}</p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
              <div className="space-y-3">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-500 text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonials */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Our Members Say</h2>
              <div className="space-y-6">
                {plan.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <div className="flex space-x-1">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className={`${plan.bgColor} rounded-xl p-6 sticky top-24`}>
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center space-x-1 mb-2">
                  <span className="text-2xl font-bold text-gray-900">₹</span>
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-gray-500 line-through text-sm">₹{plan.originalPrice}</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">{plan.savings}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  // Add to cart instead of direct purchase
                  const prices: { [key: string]: number } = {
                    'basic': 2199,
                    'premium': 4499,
                    'elite': 7499
                  };
                  
                  // You can implement addToCart here or navigate to purchase
                  navigate(`/purchase/plan-${planId}`);
                }}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg bg-gradient-to-r ${plan.gradient} text-white hover:shadow-xl mb-4`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Get Started Now</span>
                  <Zap className="w-4 h-4" />
                </span>
              </button>

              <div className="text-center text-sm text-gray-600 space-y-1">
                <p>✓ 7-day money-back guarantee</p>
                <p>✓ No setup fees</p>
                <p>✓ Cancel anytime</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Highlights</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">Access Level</div>
                    <div className="text-sm text-gray-600">{plan.name} membership</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium text-gray-900">Hours</div>
                    <div className="text-sm text-gray-600">
                      {plan.name === 'Elite' ? '24/7 Access' : plan.name === 'Premium' ? '5 AM - 11 PM' : '6 AM - 10 PM'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="font-medium text-gray-900">Support</div>
                    <div className="text-sm text-gray-600">
                      {plan.name === 'Elite' ? 'Unlimited PT' : plan.name === 'Premium' ? '1 PT/month' : 'Community'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Have questions about this plan? Our fitness consultants are here to help you choose the right membership.
              </p>
              <button 
                onClick={() => {
                  const subject = encodeURIComponent(`Inquiry about ${plan.name} Plan`);
                  const body = encodeURIComponent(`
Hello FitZone Team,

I am interested in learning more about the ${plan.name} plan.

Could you please provide more information about:
- Membership benefits
- Payment options
- Getting started process

Thank you!
                  `);
                  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@fitzone.com&su=${subject}&body=${body}`;
                  window.open(gmailUrl, '_blank');
                }}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetail;