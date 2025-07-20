import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Target, CheckCircle, Star, Award, Calendar } from 'lucide-react';

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const servicesData = {
    'weight-training': {
      title: 'Weight Training',
      subtitle: 'Build Strength, Power, and Muscle Mass',
      description: 'Our comprehensive weight training program combines traditional strength training with modern techniques to help you build muscle, increase power, and transform your physique. Whether you\'re a beginner or advanced lifter, our expert trainers will guide you through proper form and progressive overload principles.',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '60-90 minutes',
      level: 'All Levels',
      maxParticipants: '10',
      price: '₹2,500 per session',
      instructor: {
        name: 'Rohit Kumar',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '12 years',
        certifications: ['CSCS', 'Powerlifting Coach', 'Olympic Lifting Certified']
      },
      benefits: [
        'Increase muscle mass and strength',
        'Improve bone density and joint health',
        'Boost metabolism and fat burning',
        'Better functional movement patterns',
        'Enhanced athletic performance',
        'Injury prevention and rehabilitation'
      ],
      equipment: [
        'Olympic barbells and plates',
        'Dumbbells (5-50 kg)',
        'Power racks and squat stands',
        'Cable machines',
        'Specialty bars (hex, trap, etc.)',
        'Plate-loaded machines'
      ],
      schedule: [
        { day: 'Monday', time: '6:00 AM - 7:30 AM', focus: 'Upper Body' },
        { day: 'Monday', time: '7:00 PM - 8:30 PM', focus: 'Lower Body' },
        { day: 'Wednesday', time: '6:00 AM - 7:30 AM', focus: 'Full Body' },
        { day: 'Wednesday', time: '7:00 PM - 8:30 PM', focus: 'Push/Pull' },
        { day: 'Friday', time: '6:00 AM - 7:30 AM', focus: 'Functional' },
        { day: 'Saturday', time: '8:00 AM - 9:30 AM', focus: 'Powerlifting' }
      ],
      whatToExpect: [
        'Comprehensive warm-up and mobility work',
        'Compound movement focus (squats, deadlifts, bench press)',
        'Progressive overload programming',
        'Form correction and safety guidance',
        'Accessory exercises for muscle balance',
        'Cool-down and recovery protocols'
      ]
    },
    'cardio-fitness': {
      title: 'Cardio Fitness',
      subtitle: 'Boost Your Heart Health and Endurance',
      description: 'Our cardio fitness program is designed to improve your cardiovascular health, increase endurance, and burn calories effectively. From high-intensity interval training to steady-state cardio, we offer various approaches to keep your workouts engaging and results-driven.',
      image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '45-60 minutes',
      level: 'All Levels',
      maxParticipants: '15',
      price: '₹1,800 per session',
      instructor: {
        name: 'Priya Sharma',
        image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '8 years',
        certifications: ['ACSM Certified', 'HIIT Specialist', 'Spin Instructor']
      },
      benefits: [
        'Improved cardiovascular health',
        'Increased endurance and stamina',
        'Enhanced fat burning and weight loss',
        'Better mood and mental health',
        'Reduced risk of chronic diseases',
        'Improved sleep quality'
      ],
      equipment: [
        'Treadmills with incline',
        'Elliptical machines',
        'Stationary bikes',
        'Rowing machines',
        'Stair climbers',
        'Battle ropes and kettlebells'
      ],
      schedule: [
        { day: 'Monday', time: '7:00 AM - 8:00 AM', focus: 'HIIT Cardio' },
        { day: 'Tuesday', time: '6:30 PM - 7:30 PM', focus: 'Spin Class' },
        { day: 'Wednesday', time: '7:00 AM - 8:00 AM', focus: 'Circuit Training' },
        { day: 'Thursday', time: '6:30 PM - 7:30 PM', focus: 'Endurance Training' },
        { day: 'Friday', time: '7:00 AM - 8:00 AM', focus: 'Fat Burn Cardio' },
        { day: 'Saturday', time: '9:00 AM - 10:00 AM', focus: 'Mixed Cardio' }
      ],
      whatToExpect: [
        'Dynamic warm-up to prepare your body',
        'Variety of cardio exercises and equipment',
        'Heart rate monitoring and guidance',
        'Interval training for maximum efficiency',
        'Cool-down and stretching session',
        'Hydration and recovery tips'
      ]
    },
    'group-classes': {
      title: 'Group Classes',
      subtitle: 'Energy, Motivation, and Community',
      description: 'Join our vibrant group fitness community where motivation meets results. Our diverse range of group classes offers something for everyone, from high-energy dance workouts to mindful yoga sessions. Experience the power of working out together.',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '45-75 minutes',
      level: 'All Levels',
      maxParticipants: '20',
      price: '₹1,500 per session',
      instructor: {
        name: 'Kavya Patel',
        image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '10 years',
        certifications: ['Group Fitness Instructor', 'Yoga Alliance RYT-200', 'Zumba Licensed']
      },
      benefits: [
        'Social motivation and accountability',
        'Variety of workout styles and formats',
        'Professional instruction and form correction',
        'Fun and energetic atmosphere',
        'Build lasting friendships',
        'Suitable for all fitness levels'
      ],
      equipment: [
        'Yoga mats and blocks',
        'Light weights and resistance bands',
        'Stability balls',
        'Step platforms',
        'Foam rollers',
        'Sound system and mirrors'
      ],
      schedule: [
        { day: 'Monday', time: '9:00 AM - 10:00 AM', focus: 'Yoga Flow' },
        { day: 'Tuesday', time: '6:30 PM - 7:30 PM', focus: 'Zumba Dance' },
        { day: 'Wednesday', time: '9:00 AM - 10:00 AM', focus: 'Pilates' },
        { day: 'Thursday', time: '6:30 PM - 7:30 PM', focus: 'Body Pump' },
        { day: 'Friday', time: '9:00 AM - 10:00 AM', focus: 'Yoga Flow' },
        { day: 'Saturday', time: '10:00 AM - 11:00 AM', focus: 'Dance Fitness' }
      ],
      whatToExpect: [
        'Energetic warm-up with the group',
        'Main workout tailored to class type',
        'Modifications for different fitness levels',
        'Encouraging group atmosphere',
        'Cool-down and relaxation',
        'Post-class community interaction'
      ]
    },
    'personal-training': {
      title: 'Personal Training',
      subtitle: 'One-on-One Expert Guidance',
      description: 'Experience the ultimate in personalized fitness with our expert personal trainers. Every session is tailored to your specific goals, fitness level, and preferences. Get the individual attention you deserve to achieve faster, safer, and more sustainable results.',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: 'Flexible (45-90 min)',
      level: 'Customized',
      maxParticipants: '1',
      price: '₹6,000 per session',
      instructor: {
        name: 'Sneha Gupta',
        image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '9 years',
        certifications: ['NASM-CPT', 'Corrective Exercise Specialist', 'Nutrition Coach']
      },
      benefits: [
        'Completely customized workout plans',
        'Flexible scheduling around your life',
        'One-on-one attention and coaching',
        'Faster progress toward your goals',
        'Injury prevention and rehabilitation',
        'Nutritional guidance included'
      ],
      equipment: [
        'Full gym access',
        'Specialized equipment as needed',
        'Recovery and mobility tools',
        'Assessment equipment',
        'Technology integration',
        'Customized workout plans'
      ],
      schedule: [
        { day: 'Available 7 days a week', time: '6:00 AM - 10:00 PM', focus: 'Book anytime' }
      ],
      whatToExpect: [
        'Comprehensive fitness assessment',
        'Goal-setting and program design',
        'Personalized workout execution',
        'Real-time form correction',
        'Progress tracking and adjustments',
        'Lifestyle and nutrition coaching'
      ]
    },
    '24-7-access': {
      title: '24/7 Access',
      subtitle: 'Train on Your Schedule',
      description: 'Life doesn\'t follow a 9-to-5 schedule, and neither should your fitness routine. Our 24/7 access membership gives you the freedom to work out whenever it suits you best. Whether you\'re an early bird or a night owl, the gym is always open for you.',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: 'Unlimited',
      level: 'All Levels',
      maxParticipants: 'Unlimited',
      price: '₹4,999 per month',
      instructor: {
        name: 'Security Team',
        image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '24/7 Support',
        certifications: ['Security Certified', 'Emergency Response', 'Facility Management']
      },
      benefits: [
        'Complete flexibility in workout timing',
        'Avoid peak hour crowds',
        'Perfect for shift workers',
        'Secure keycard access system',
        'Climate-controlled environment',
        'Emergency support available'
      ],
      equipment: [
        'Full gym equipment access',
        'Cardio machines',
        'Weight training area',
        'Functional training space',
        'Locker rooms',
        'Security monitoring'
      ],
      schedule: [
        { day: 'Every Day', time: '24 Hours', focus: 'Open Access' }
      ],
      whatToExpect: [
        'Secure keycard entry system',
        'Well-lit and monitored facility',
        'Clean and maintained equipment',
        'Emergency contact system',
        'Climate-controlled environment',
        'Peace of mind with security'
      ]
    },
    'nutrition-coaching': {
      title: 'Nutrition Coaching',
      subtitle: 'Fuel Your Fitness Journey',
      description: 'Nutrition is the foundation of any successful fitness journey. Our certified nutrition coaches work with you to create sustainable eating habits that support your goals. From meal planning to supplement guidance, we provide the knowledge you need to succeed.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '60 minutes',
      level: 'All Levels',
      maxParticipants: '1',
      price: '₹3,500 per session',
      instructor: {
        name: 'Dr. Anjali Mehta',
        image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '12 years',
        certifications: ['Registered Dietitian', 'Sports Nutrition Specialist', 'Certified Nutrition Coach']
      },
      benefits: [
        'Personalized meal planning',
        'Evidence-based nutrition guidance',
        'Supplement recommendations',
        'Body composition analysis',
        'Lifestyle and habit coaching',
        'Long-term sustainable results'
      ],
      equipment: [
        'Body composition analyzer',
        'Meal planning software',
        'Nutrition tracking apps',
        'Educational materials',
        'Recipe databases',
        'Progress tracking tools'
      ],
      schedule: [
        { day: 'Monday', time: '10:00 AM - 11:00 AM', focus: 'Initial Consultation' },
        { day: 'Wednesday', time: '2:00 PM - 3:00 PM', focus: 'Follow-up Session' },
        { day: 'Friday', time: '10:00 AM - 11:00 AM', focus: 'Progress Review' },
        { day: 'Saturday', time: '11:00 AM - 12:00 PM', focus: 'Meal Prep Workshop' }
      ],
      whatToExpect: [
        'Comprehensive nutrition assessment',
        'Personalized meal plan creation',
        'Education on macro and micronutrients',
        'Supplement guidance and recommendations',
        'Habit formation strategies',
        'Ongoing support and adjustments'
      ]
    }
  };

  const service = servicesData[serviceId as keyof typeof servicesData];

  if (!service) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
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

  return (
    <div className="pt-20" id="service-detail-top">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Services</span>
            </button>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-gray-300 mb-6">{service.subtitle}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Target className="w-4 h-4" />
                <span>{service.level}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Users className="w-4 h-4" />
                <span>Max {service.maxParticipants} people</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* What to Expect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
              <div className="space-y-3">
                {service.whatToExpect.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-orange-500 text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Equipment */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipment & Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {service.equipment.map((item, index) => (
                  <div key={index} className="bg-gray-50 px-4 py-2 rounded-lg text-center text-gray-700">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Instructor</h3>
              <div className="text-center mb-4">
                <img
                  src={service.instructor.image}
                  alt={service.instructor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-bold text-gray-900">{service.instructor.name}</h4>
                <p className="text-orange-500 text-sm">{service.instructor.experience} experience</p>
              </div>
              <div className="space-y-2">
                {service.instructor.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-orange-500 mb-2">{service.price}</div>
                <p className="text-gray-600 text-sm">Starting rate</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>• Package deals available</p>
                <p>• Monthly memberships: 20% off</p>
                <p>• First session free for new members</p>
              </div>
              <button 
                onClick={() => navigate(`/purchase/${serviceId}`)}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Book Your Session
              </button>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Schedule</h3>
              <div className="space-y-3">
                {service.schedule.map((session, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{session.day}</div>
                        <div className="text-sm text-gray-600">{session.time}</div>
                        <div className="text-xs text-orange-500 mt-1">{session.focus}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/purchase/${serviceId}`)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Session</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact Instructor
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;