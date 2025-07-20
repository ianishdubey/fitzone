import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Target, Calendar, CheckCircle, Star, Play, Award } from 'lucide-react';
import { usePurchaseStore } from '../store/purchaseStore';

const ProgramDetail = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { hasPurchased } = usePurchaseStore();

  const programsData = {
    'hiit-training': {
      title: 'High-Intensity Training',
      subtitle: 'Transform Your Body with Maximum Efficiency',
      description: 'Our High-Intensity Interval Training (HIIT) program is designed for those who want maximum results in minimum time. This scientifically-proven training method alternates between intense bursts of activity and fixed periods of less-intense activity or complete rest.',
      image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '45 minutes',
      level: 'Intermediate',
      maxParticipants: '12',
      price: '₹1,875 per session',
      instructor: {
        name: 'Arjun Singh',
        image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '8 years',
        certifications: ['NASM-CPT', 'HIIT Specialist', 'Metabolic Conditioning']
      },
      benefits: [
        'Burn up to 400+ calories per session',
        'Boost metabolism for 24-48 hours post-workout',
        'Improve cardiovascular endurance',
        'Build lean muscle mass',
        'Increase mental toughness',
        'Time-efficient workouts'
      ],
      schedule: [
        { day: 'Monday', time: '6:00 AM - 6:45 AM', spots: 8 },
        { day: 'Monday', time: '7:00 PM - 7:45 PM', spots: 3 },
        { day: 'Wednesday', time: '6:00 AM - 6:45 AM', spots: 5 },
        { day: 'Wednesday', time: '7:00 PM - 7:45 PM', spots: 7 },
        { day: 'Friday', time: '6:00 AM - 6:45 AM', spots: 2 },
        { day: 'Saturday', time: '9:00 AM - 9:45 AM', spots: 10 }
      ],
      whatToExpect: [
        'Dynamic warm-up to prepare your body',
        '4-6 high-intensity intervals',
        'Active recovery periods between intervals',
        'Full-body movements targeting multiple muscle groups',
        'Cool-down and stretching session',
        'Heart rate monitoring and guidance'
      ],
      equipment: [
        'Kettlebells',
        'Battle ropes',
        'Plyometric boxes',
        'Medicine balls',
        'Resistance bands',
        'Body weight exercises'
      ]
    },
    'group-fitness': {
      title: 'Group Fitness Classes',
      subtitle: 'Energy, Motivation, and Community',
      description: 'Join our vibrant group fitness community where motivation meets results. Our diverse range of group classes offers something for everyone, from high-energy dance workouts to mindful yoga sessions.',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '60 minutes',
      level: 'All Levels',
      maxParticipants: '20',
      price: '₹1,500 per session',
      instructor: {
        name: 'Kavya Patel',
        image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '10 years',
        certifications: ['Group Fitness Instructor', 'Yoga Alliance RYT-200', 'Zumba Licensed']
      },
      benefits: [
        'Social motivation and accountability',
        'Variety of workout styles',
        'Professional instruction and form correction',
        'Fun and energetic atmosphere',
        'Build lasting friendships',
        'Suitable for all fitness levels'
      ],
      schedule: [
        { day: 'Monday', time: '9:00 AM - 10:00 AM', spots: 15, type: 'Yoga Flow' },
        { day: 'Tuesday', time: '6:30 PM - 7:30 PM', spots: 8, type: 'Zumba' },
        { day: 'Wednesday', time: '9:00 AM - 10:00 AM', spots: 12, type: 'Pilates' },
        { day: 'Thursday', time: '6:30 PM - 7:30 PM', spots: 5, type: 'Body Pump' },
        { day: 'Friday', time: '9:00 AM - 10:00 AM', spots: 18, type: 'Yoga Flow' },
        { day: 'Saturday', time: '10:00 AM - 11:00 AM', spots: 10, type: 'Dance Fitness' }
      ],
      whatToExpect: [
        'Energetic warm-up with the group',
        'Main workout tailored to class type',
        'Modifications for different fitness levels',
        'Encouraging group atmosphere',
        'Cool-down and relaxation',
        'Post-class community interaction'
      ],
      equipment: [
        'Yoga mats',
        'Light weights',
        'Resistance bands',
        'Stability balls',
        'Foam rollers',
        'Props for specific classes'
      ]
    },
    'strength-training': {
      title: 'Strength Training',
      subtitle: 'Build Power, Muscle, and Confidence',
      description: 'Our comprehensive strength training program focuses on progressive overload principles to help you build muscle, increase power, and transform your physique. Whether you\'re a beginner or advanced lifter, our program adapts to your level.',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '90 minutes',
      level: 'Beginner to Advanced',
      maxParticipants: '8',
      price: '₹2,625 per session',
      instructor: {
        name: 'Rohit Kumar',
        image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '12 years',
        certifications: ['CSCS', 'Powerlifting Coach', 'Olympic Lifting Certified']
      },
      benefits: [
        'Increase muscle mass and strength',
        'Improve bone density',
        'Boost metabolism',
        'Better functional movement',
        'Enhanced athletic performance',
        'Injury prevention'
      ],
      schedule: [
        { day: 'Monday', time: '5:30 AM - 7:00 AM', spots: 6, focus: 'Upper Body' },
        { day: 'Tuesday', time: '6:00 PM - 7:30 PM', spots: 4, focus: 'Lower Body' },
        { day: 'Wednesday', time: '5:30 AM - 7:00 AM', spots: 7, focus: 'Full Body' },
        { day: 'Thursday', time: '6:00 PM - 7:30 PM', spots: 3, focus: 'Push/Pull' },
        { day: 'Friday', time: '5:30 AM - 7:00 AM', spots: 8, focus: 'Functional' },
        { day: 'Saturday', time: '8:00 AM - 9:30 AM', spots: 5, focus: 'Powerlifting' }
      ],
      whatToExpect: [
        'Proper warm-up and mobility work',
        'Compound movement focus',
        'Progressive overload programming',
        'Form correction and safety guidance',
        'Accessory exercises for muscle balance',
        'Recovery and stretching protocols'
      ],
      equipment: [
        'Olympic barbells',
        'Dumbbells (5-100 lbs)',
        'Power racks',
        'Cable machines',
        'Specialty bars',
        'Plate-loaded machines'
      ]
    },
    'personalized-programs': {
      title: 'Personalized Programs',
      subtitle: 'Your Goals, Your Schedule, Your Success',
      description: 'Experience the ultimate in personalized fitness with our custom-designed programs. Every aspect is tailored to your specific goals, fitness level, schedule, and preferences for maximum effectiveness.',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: 'Flexible',
      level: 'Customized',
      maxParticipants: '1',
      price: '₹6,000 per session',
      instructor: {
        name: 'Sneha Gupta',
        image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
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
      schedule: [
        { day: 'Available 7 days a week', time: '6:00 AM - 10:00 PM', spots: 'Book anytime' }
      ],
      whatToExpect: [
        'Comprehensive fitness assessment',
        'Goal-setting and program design',
        'Personalized workout execution',
        'Real-time form correction',
        'Progress tracking and adjustments',
        'Lifestyle and nutrition coaching'
      ],
      equipment: [
        'Full gym access',
        'Specialized equipment as needed',
        'Recovery tools',
        'Assessment equipment',
        'Mobility aids',
        'Technology integration'
      ]
    },
    'early-bird': {
      title: 'Early Bird Sessions',
      subtitle: 'Start Your Day with Energy and Purpose',
      description: 'Rise and shine with our energizing morning workouts designed to kickstart your day. These sessions focus on building energy, improving mood, and setting a positive tone for your entire day.',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '45 minutes',
      level: 'All Levels',
      maxParticipants: '15',
      price: '₹1,650 per session',
      instructor: {
        name: 'Vikram Joshi',
        image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '7 years',
        certifications: ['Morning Fitness Specialist', 'Functional Movement', 'Energy Coaching']
      },
      benefits: [
        'Boost morning energy levels',
        'Improve mental clarity for the day',
        'Smaller, more intimate groups',
        'Consistent routine building',
        'Enhanced mood and productivity',
        'Better sleep patterns'
      ],
      schedule: [
        { day: 'Monday', time: '6:00 AM - 6:45 AM', spots: 12 },
        { day: 'Tuesday', time: '6:00 AM - 6:45 AM', spots: 8 },
        { day: 'Wednesday', time: '6:00 AM - 6:45 AM', spots: 10 },
        { day: 'Thursday', time: '6:00 AM - 6:45 AM', spots: 6 },
        { day: 'Friday', time: '6:00 AM - 6:45 AM', spots: 14 },
        { day: 'Saturday', time: '7:00 AM - 7:45 AM', spots: 15 }
      ],
      whatToExpect: [
        'Gentle wake-up movements',
        'Energy-building exercises',
        'Functional movement patterns',
        'Mindfulness and breathing work',
        'Positive group energy',
        'Day preparation rituals'
      ],
      equipment: [
        'Light weights',
        'Resistance bands',
        'Yoga mats',
        'Stability balls',
        'Foam rollers',
        'Minimal equipment focus'
      ]
    },
    'fat-burning-bootcamp': {
      title: 'Fat Burning Bootcamp',
      subtitle: 'Intense Training for Maximum Results',
      description: 'Our high-intensity bootcamp combines the best of cardio and strength training in a challenging, results-driven format. Designed for serious fat loss and overall conditioning.',
      image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
      duration: '60 minutes',
      level: 'Intermediate',
      maxParticipants: '16',
      price: '₹2,100 per session',
      instructor: {
        name: 'Priya Sharma',
        image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
        experience: '6 years',
        certifications: ['Bootcamp Instructor', 'Fat Loss Specialist', 'Metabolic Training']
      },
      benefits: [
        'Maximum calorie burn',
        'Full-body conditioning',
        'Team motivation and support',
        'Visible results in weeks',
        'Improved cardiovascular health',
        'Mental toughness building'
      ],
      schedule: [
        { day: 'Tuesday', time: '6:30 AM - 7:30 AM', spots: 12 },
        { day: 'Tuesday', time: '7:00 PM - 8:00 PM', spots: 8 },
        { day: 'Thursday', time: '6:30 AM - 7:30 AM', spots: 14 },
        { day: 'Thursday', time: '7:00 PM - 8:00 PM', spots: 6 },
        { day: 'Saturday', time: '8:00 AM - 9:00 AM', spots: 10 },
        { day: 'Sunday', time: '9:00 AM - 10:00 AM', spots: 16 }
      ],
      whatToExpect: [
        'High-energy warm-up',
        'Circuit-style training',
        'Cardio and strength intervals',
        'Team challenges and motivation',
        'Core-focused finisher',
        'Recovery and stretching'
      ],
      equipment: [
        'Battle ropes',
        'Kettlebells',
        'Plyometric boxes',
        'Agility ladders',
        'Medicine balls',
        'TRX suspension trainers'
      ]
    }
  };

  const handleDownloadSchedule = () => {
    if (!hasPurchased(programId!)) {
      navigate(`/purchase/${programId}`);
      return;
    }
    
    // Generate and download PDF
    const program = programsData[programId as keyof typeof programsData];
    if (program) {
      generateSchedulePDF(program);
    }
  };

  const generateSchedulePDF = (program: any) => {
    // Create a simple PDF content
    const pdfContent = `
${program.title} - Weekly Schedule

Duration: ${program.duration}
Level: ${program.level}
Max Participants: ${program.maxParticipants}
Price: ${program.price}

Weekly Schedule:
${program.schedule.map((session: any, index: number) => 
  `${index + 1}. ${session.day} - ${session.time}${session.type ? ` (${session.type})` : ''}${session.focus ? ` - Focus: ${session.focus}` : ''} - ${session.spots} spots available`
).join('\n')}

What to Expect:
${program.whatToExpect.map((item: string, index: number) => `${index + 1}. ${item}`).join('\n')}

Equipment Used:
${program.equipment.join(', ')}

Benefits:
${program.benefits.map((benefit: string, index: number) => `• ${benefit}`).join('\n')}

Instructor: ${program.instructor.name}
Experience: ${program.instructor.experience}
Certifications: ${program.instructor.certifications.join(', ')}

---
FitZone Gym - Your Fitness Journey Starts Here
Contact: info@fitzone.com | Phone: +1 (555) 123-4567
    `;

    // Create and download the file
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${program.title.replace(/\s+/g, '_')}_Schedule.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  const program = programsData[programId as keyof typeof programsData];

  if (!program) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
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
    <div className="pt-20" id="program-detail-top">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${program.image})` }}
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
              <span>Back to Programs</span>
            </button>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
            <p className="text-xl text-gray-300 mb-6">{program.subtitle}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Target className="w-4 h-4" />
                <span>{program.level}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                <Users className="w-4 h-4" />
                <span>Max {program.maxParticipants} people</span>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Program</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{program.description}</p>
            </section>

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.benefits.map((benefit, index) => (
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
                {program.whatToExpect.map((item, index) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Equipment Used</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {program.equipment.map((item, index) => (
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
                  src={program.instructor.image}
                  alt={program.instructor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="font-bold text-gray-900">{program.instructor.name}</h4>
                <p className="text-orange-500 text-sm">{program.instructor.experience} experience</p>
              </div>
              <div className="space-y-2">
                {program.instructor.certifications.map((cert, index) => (
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
                <div className="text-3xl font-bold text-orange-500 mb-2">{program.price}</div>
                <p className="text-gray-600 text-sm">Drop-in rate</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>• 10-session package: 15% off</p>
                <p>• Monthly unlimited: 25% off</p>
                <p>• First session free for new members</p>
              </div>
              <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                Book Session
              </button>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Schedule</h3>
              <div className="space-y-3">
                {program.schedule.map((session, index) => (
                  <div key={index} className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{session.day}</div>
                        <div className="text-sm text-gray-600">{session.time}</div>
                        {session.type && (
                          <div className="text-xs text-orange-500 mt-1">{session.type}</div>
                        )}
                        {session.focus && (
                          <div className="text-xs text-orange-500 mt-1">{session.focus}</div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600">{session.spots} spots</div>
                        <div className="text-xs text-gray-500">available</div>
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
                  onClick={() => {
                    const videoUrl = "https://www.youtube.com/watch?v=ixmxOlcrlUc";
                    window.open(videoUrl, '_blank');
                  }}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch Preview</span>
                </button>
                <button 
                  onClick={handleDownloadSchedule}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    hasPurchased(programId!) 
                      ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {hasPurchased(programId!) ? 'Download Schedule' : 'Purchase to Download'}
                </button>
                <button 
                  onClick={() => {
                    // Check if user has purchased the program
                    if (!hasPurchased(programId!)) {
                      alert('You need to purchase this program first to contact the instructor. Please complete your purchase to get direct access to your trainer.');
                      return;
                    }
                    
                    const subject = encodeURIComponent(`Inquiry about ${program.title}`);
                    const body = encodeURIComponent(`
Hello ${program.instructor.name},

I am interested in learning more about the ${program.title} program.

Could you please provide more information about:
- Class schedules
- Pricing options
- What to bring for the first session

Thank you!
                    `);
                    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@fitzone.com&su=${subject}&body=${body}`;
                    window.open(gmailUrl, '_blank');
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Contact Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;