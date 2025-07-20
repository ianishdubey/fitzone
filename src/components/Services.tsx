import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Users, Target, Heart, Clock, Trophy, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Services = () => {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const services = [
    {
      id: 'weight-training',
      icon: Dumbbell,
      title: 'Weight Training',
      description: 'Professional weight training with state-of-the-art equipment and expert guidance.',
      features: ['Free weights', 'Resistance machines', 'Powerlifting area', 'Strength assessment'],
      gradient: 'from-orange-400 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      id: 'cardio-fitness',
      icon: Heart,
      title: 'Cardio Fitness',
      description: 'High-energy cardio workouts to boost your cardiovascular health and endurance.',
      features: ['Treadmills', 'Elliptical machines', 'Rowing machines', 'Cycling classes'],
      gradient: 'from-pink-400 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    {
      id: 'group-classes',
      icon: Users,
      title: 'Group Classes',
      description: 'Motivating group fitness classes for all fitness levels and interests.',
      features: ['Yoga classes', 'Zumba', 'CrossFit', 'Pilates'],
      gradient: 'from-blue-400 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      id: 'personal-training',
      icon: Target,
      title: 'Personal Training',
      description: 'One-on-one training sessions tailored to your specific goals and needs.',
      features: ['Custom workout plans', 'Nutrition guidance', 'Progress tracking', 'Flexible scheduling'],
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      id: '24-7-access',
      icon: Clock,
      title: '24/7 Access',
      description: 'Train on your schedule with round-the-clock gym access for premium members.',
      features: ['Keycard access', 'Security monitoring', 'Climate control', 'Emergency support'],
      gradient: 'from-purple-400 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      id: 'nutrition-coaching',
      icon: Trophy,
      title: 'Nutrition Coaching',
      description: 'Professional nutrition guidance to fuel your fitness journey effectively.',
      features: ['Meal planning', 'Supplement advice', 'Body composition analysis', 'Lifestyle coaching'],
      gradient: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50'
    }
  ];

  const handleAddToCart = (service: any) => {
    const prices: { [key: string]: number } = {
      'weight-training': 2500,
      'cardio-fitness': 1800,
      'group-classes': 1500,
      'personal-training': 6000,
      '24-7-access': 4999,
      'nutrition-coaching': 3500
    };
    
    addItem({
      id: service.id,
      name: service.title,
      price: prices[service.id] || 2000,
      type: 'service',
      duration: '60 min',
      level: 'All Levels'
    });
    
    alert(`${service.title} added to cart!`);
  };
  const handleLearnMore = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
    // Scroll to top after navigation
    setTimeout(() => {
      const element = document.getElementById('service-detail-top');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 px-6 py-2 rounded-full mb-6">
            <Dumbbell className="w-5 h-5 text-orange-500" />
            <span className="text-orange-700 font-medium">Our Services</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to achieve your fitness goals under one roof with world-class facilities and expert guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 group border border-white border-opacity-50 hover:scale-105 hover:-translate-y-2`}>
              <div className="relative mb-6">
                <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors">
                    <div className={`w-3 h-3 bg-gradient-to-r ${service.gradient} rounded-full mr-3 shadow-sm`}></div>
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200 border-opacity-50">
                <div className="space-y-3">
                  <button 
                    onClick={() => handleLearnMore(service.id)}
                    className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Learn More</span>
                  </button>
                  
                  <button 
                    onClick={() => handleAddToCart(service)}
                    className="w-full border-2 border-orange-500 text-orange-500 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;