import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Target, Calendar, Clock, Flame, ArrowRight, Star, Sparkles, ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Programs = () => {
  const navigate = useNavigate();
  const { addItem, toggleCart } = useCartStore();

  const programs = [
    {
      id: 'hiit-training',
      icon: Zap,
      title: 'High-Intensity Training',
      description: 'Push your limits with our HIIT programs designed for maximum results in minimum time.',
      duration: '45 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Burn 400+ calories', 'Boost metabolism', 'Build endurance', 'Expert guidance'],
      gradient: 'from-orange-400 to-red-500',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      id: 'group-fitness',
      icon: Users,
      title: 'Group Fitness Classes',
      description: 'Join our energetic group classes and train alongside like-minded fitness enthusiasts.',
      duration: '60 min',
      level: 'All Levels',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Social motivation', 'Variety of styles', 'Professional instruction', 'Fun atmosphere'],
      gradient: 'from-blue-400 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50'
    },
    {
      id: 'strength-training',
      icon: Target,
      title: 'Strength Training',
      description: 'Build muscle, increase power, and transform your physique with our comprehensive strength programs.',
      duration: '90 min',
      level: 'Beginner to Advanced',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Progressive overload', 'Form correction', 'Muscle building', 'Strength gains'],
      gradient: 'from-green-400 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      id: 'personalized-programs',
      icon: Calendar,
      title: 'Personalized Programs',
      description: 'Custom workout plans tailored specifically to your goals, schedule, and fitness level.',
      duration: 'Flexible',
      level: 'Customized',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Goal-specific', 'Flexible scheduling', '1-on-1 coaching', 'Progress tracking'],
      gradient: 'from-purple-400 to-violet-500',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      id: 'early-bird',
      icon: Clock,
      title: 'Early Bird Sessions',
      description: 'Start your day right with our energizing morning workouts designed to boost your energy.',
      duration: '45 min',
      level: 'All Levels',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Morning energy', 'Smaller groups', 'Focused training', 'Day preparation'],
      gradient: 'from-yellow-400 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    {
      id: 'fat-burning-bootcamp',
      icon: Flame,
      title: 'Fat Burning Bootcamp',
      description: 'Intensive bootcamp sessions combining cardio and strength training for maximum fat loss.',
      duration: '60 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['High calorie burn', 'Full-body workout', 'Team motivation', 'Visible results'],
      gradient: 'from-pink-400 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50'
    }
  ];

  const handleAddToCart = (program: any) => {
    addItem({
      id: program.id,
      name: program.title,
      price: program.price || 1875,
      type: 'program',
      image: program.image,
      duration: program.duration,
      level: program.level
    });
    
    // Show success message
    alert(`${program.title} added to cart!`);
  };
  const handleJoinProgram = (programId: string) => {
    navigate(`/program/${programId}`);
    // Scroll to top after navigation
    setTimeout(() => {
      const element = document.getElementById('program-detail-top');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-blue-700 font-medium">Fitness Programs</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Choose Your <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Perfect Program</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our diverse range of fitness programs designed to help you achieve your specific goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className={`bg-gradient-to-br ${program.bgGradient} backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group border border-white border-opacity-50 hover:scale-105 hover:-translate-y-2`}>
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4">
                  <div className={`bg-gradient-to-r ${program.gradient} text-white p-3 rounded-xl shadow-lg`}>
                    <program.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-gray-800">{program.duration}</span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">{program.title}</h3>
                  <span className={`text-sm bg-gradient-to-r ${program.gradient} bg-clip-text text-transparent font-bold px-3 py-1 bg-white rounded-full shadow-sm`}>
                    {program.level}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">{program.description}</p>
                
                <div className="space-y-3 mb-8">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 group-hover:text-gray-800 transition-colors">
                      <div className={`w-3 h-3 bg-gradient-to-r ${program.gradient} rounded-full mr-3 shadow-sm`}></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => handleJoinProgram(program.id)}
                    className={`w-full bg-gradient-to-r ${program.gradient} text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center space-x-2`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  
                  <button 
                    onClick={() => handleAddToCart(program)}
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

export default Programs;