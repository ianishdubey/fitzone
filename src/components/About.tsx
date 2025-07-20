import React from 'react';
import { Award, Users, Heart, Target, Star, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '8+', label: 'Years of Experience', icon: Award, gradient: 'from-orange-400 to-red-500' },
    { number: '450+', label: 'Happy Members', icon: Users, gradient: 'from-blue-400 to-indigo-500' },
    { number: '25+', label: 'Expert Trainers', icon: Target, gradient: 'from-green-400 to-emerald-500' },
    { number: '95%', label: 'Success Rate', icon: Heart, gradient: 'from-pink-400 to-rose-500' }
  ];

  const trainers = [
    {
      name: 'Priya Sharma',
      role: 'Head Trainer & Nutritionist',
      experience: '8 years',
      specialties: ['Weight Loss', 'Nutrition', 'HIIT'],
      image: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Strength & Conditioning Coach',
      experience: '10 years',
      specialties: ['Powerlifting', 'Bodybuilding', 'Sports Performance'],
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      name: 'Anjali Gupta',
      role: 'Yoga & Wellness Instructor',
      experience: '6 years',
      specialties: ['Yoga', 'Meditation', 'Flexibility'],
      image: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      gradient: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="inline-flex items-center space-x-2 bg-orange-100 px-6 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span className="text-orange-700 font-medium">About Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">About FitZone</h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              For over a decade, FitZone has been more than just a gym—we're a community dedicated to transforming lives through fitness, wellness, and personal growth.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our state-of-the-art facility combines cutting-edge equipment with expert guidance to create an environment where everyone can thrive. Whether you're just starting your fitness journey or you're a seasoned athlete, we provide the tools, support, and motivation you need to achieve your goals.
            </p>
            
            <div className="space-y-4">
              {[
                'Certified personal trainers with specialized expertise',
                'Modern equipment and clean, safe facilities',
                'Supportive community atmosphere for all fitness levels',
                'Comprehensive wellness programs and nutrition guidance'
              ].map((item, index) => (
                <div key={index} className="flex items-center group">
                  <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300"></div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <img 
                src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="FitZone Gym Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-sm opacity-90">Years Strong</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trainers Section */}
        <div>
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-6 py-2 rounded-full mb-6">
              <Star className="w-5 h-5 text-blue-500" />
              <span className="text-blue-700 font-medium">Our Team</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">Meet Our Expert Trainers</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our certified trainers are passionate about helping you achieve your fitness goals safely and effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map((trainer, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-500 group border border-gray-100 hover:scale-105 hover:-translate-y-2">
                <div className="relative mb-8">
                  <div className="relative">
                    <img 
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${trainer.gradient} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}>
                      {trainer.experience}
                    </div>
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">{trainer.name}</h4>
                <p className={`bg-gradient-to-r ${trainer.gradient} bg-clip-text text-transparent font-semibold mb-6`}>{trainer.role}</p>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {trainer.specialties.map((specialty, idx) => (
                    <span key={idx} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700 transition-colors duration-300 font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;