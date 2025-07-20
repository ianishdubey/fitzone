import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Users, Target, Calendar, Clock, Flame, ArrowRight, Star, Award, CheckCircle } from 'lucide-react';

const ProgramsPage = () => {
  const navigate = useNavigate();

  const programs = [
    {
      id: 'hiit-training',
      icon: Zap,
      title: 'High-Intensity Training',
      description: 'Push your limits with our HIIT programs designed for maximum results in minimum time. Experience explosive workouts that torch calories and build endurance.',
      duration: '45 min',
      level: 'Intermediate',
      intensity: 'High',
      calories: '400-600',
      image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Burn 400+ calories', 'Boost metabolism for 24-48 hours', 'Build explosive power', 'Improve cardiovascular health'],
      benefits: ['Maximum calorie burn', 'Time-efficient workouts', 'Increased mental toughness', 'Enhanced athletic performance'],
      schedule: ['Mon, Wed, Fri - 6:00 AM', 'Mon, Wed, Fri - 7:00 PM', 'Sat - 9:00 AM'],
      price: '$25',
      popular: false
    },
    {
      id: 'group-fitness',
      icon: Users,
      title: 'Group Fitness Classes',
      description: 'Join our energetic group classes and train alongside like-minded fitness enthusiasts. From yoga to dance fitness, find your perfect class.',
      duration: '60 min',
      level: 'All Levels',
      intensity: 'Medium',
      calories: '300-500',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Social motivation', 'Variety of styles', 'Professional instruction', 'Fun atmosphere'],
      benefits: ['Community support', 'Diverse workout options', 'Improved coordination', 'Stress relief'],
      schedule: ['Daily classes available', 'Morning & Evening slots', 'Weekend specials'],
      price: '₹1,500',
      popular: true
    },
    {
      id: 'strength-training',
      icon: Target,
      title: 'Strength Training',
      description: 'Build muscle, increase power, and transform your physique with our comprehensive strength programs. Progressive overload meets expert coaching.',
      duration: '90 min',
      level: 'Beginner to Advanced',
      intensity: 'High',
      calories: '250-400',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Progressive overload', 'Form correction', 'Muscle building', 'Strength gains'],
      benefits: ['Increased muscle mass', 'Better bone density', 'Improved metabolism', 'Functional strength'],
      schedule: ['Mon-Sat available', 'Morning & Evening', 'Small group sessions'],
      price: '₹2,625',
      popular: false
    },
    {
      id: 'personalized-programs',
      icon: Calendar,
      title: 'Personalized Programs',
      description: 'Custom workout plans tailored specifically to your goals, schedule, and fitness level. One-on-one attention for maximum results.',
      duration: 'Flexible',
      level: 'Customized',
      intensity: 'Variable',
      calories: 'Goal-dependent',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Goal-specific training', 'Flexible scheduling', '1-on-1 coaching', 'Progress tracking'],
      benefits: ['Faster results', 'Injury prevention', 'Personalized attention', 'Flexible timing'],
      schedule: ['Available 7 days/week', '6:00 AM - 10:00 PM', 'Book anytime'],
      price: '₹6,000',
      popular: false
    },
    {
      id: 'early-bird',
      icon: Clock,
      title: 'Early Bird Sessions',
      description: 'Start your day right with our energizing morning workouts designed to boost your energy and set a positive tone for your entire day.',
      duration: '45 min',
      level: 'All Levels',
      intensity: 'Medium',
      calories: '300-450',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['Morning energy boost', 'Smaller groups', 'Focused training', 'Day preparation'],
      benefits: ['Better sleep patterns', 'Increased daily energy', 'Consistent routine', 'Mental clarity'],
      schedule: ['Mon-Sat - 6:00 AM', 'Limited to 15 people', 'Premium atmosphere'],
      price: '₹1,650',
      popular: false
    },
    {
      id: 'fat-burning-bootcamp',
      icon: Flame,
      title: 'Fat Burning Bootcamp',
      description: 'Intensive bootcamp sessions combining cardio and strength training for maximum fat loss. High-energy workouts with team motivation.',
      duration: '60 min',
      level: 'Intermediate',
      intensity: 'Very High',
      calories: '500-700',
      image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      features: ['High calorie burn', 'Full-body workout', 'Team motivation', 'Visible results'],
      benefits: ['Rapid fat loss', 'Improved conditioning', 'Mental toughness', 'Community support'],
      schedule: ['Tue, Thu, Sat', 'Morning & Evening', 'Weekend specials'],
      price: '₹2,100',
      popular: false
    }
  ];

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

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'very high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-orange-900 py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fitness Programs
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover the perfect program to match your fitness goals, schedule, and experience level
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">6</div>
              <div className="text-gray-300">Specialized Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-300">Weekly Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">All</div>
              <div className="text-gray-300">Fitness Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Program</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each program is carefully designed by our expert trainers to deliver specific results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group ${program.popular ? 'ring-2 ring-orange-500' : ''}`}>
                {program.popular && (
                  <div className="bg-orange-500 text-white text-center py-2 font-medium">
                    <Star className="w-4 h-4 inline mr-2" />
                    Most Popular Program
                  </div>
                )}
                
                <div className="md:flex">
                  {/* Image Section */}
                  <div className="md:w-1/2 relative">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-orange-500 text-white p-3 rounded-xl">
                        <program.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-95 px-4 py-2 rounded-full">
                      <span className="text-2xl font-bold text-orange-500">{program.price}</span>
                      <span className="text-gray-600 text-sm">/session</span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor(program.intensity)}`}>
                        {program.intensity}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                    
                    {/* Program Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-bold text-gray-900">{program.duration}</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500">Level</div>
                        <div className="font-bold text-gray-900">{program.level}</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500">Calories</div>
                        <div className="font-bold text-gray-900">{program.calories}</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-500">Schedule</div>
                        <div className="font-bold text-gray-900">{program.schedule.length} times/week</div>
                      </div>
                    </div>
                    
                    {/* Key Benefits */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                      <div className="space-y-2">
                        {program.benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleJoinProgram(program.id)}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium flex items-center justify-center space-x-2 group"
                    >
                      <span>Learn More & Join</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of members who have already started their fitness journey with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/programs')}
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => {
                const subject = encodeURIComponent('Gym Tour Request');
                const body = encodeURIComponent(`
Hello FitZone Team,

I would like to schedule a tour of your gym facility.

Please let me know your available times for this week.

Thank you!
                `);
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@fitzone.com&su=${subject}&body=${body}`;
                window.open(gmailUrl, '_blank');
              }}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-colors"
            >
              Schedule Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;