// MongoDB initialization script for Docker
db = db.getSiblingDB('fitzone');

// Create collections
db.createCollection('users');
db.createCollection('programs');
db.createCollection('orders');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.programs.createIndex({ "id": 1 }, { unique: true });
db.orders.createIndex({ "orderId": 1 }, { unique: true });
db.orders.createIndex({ "userId": 1 });

// Insert sample programs
db.programs.insertMany([
  {
    id: 'hiit-training',
    title: 'High-Intensity Training',
    subtitle: 'Transform Your Body with Maximum Efficiency',
    description: 'Our High-Intensity Interval Training (HIIT) program is designed for those who want maximum results in minimum time.',
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    duration: '45 minutes',
    level: 'Intermediate',
    maxParticipants: '12',
    price: 1875,
    originalPrice: 2500,
    discount: '25% off',
    instructor: {
      name: 'Arjun Singh',
      experience: '8 years',
      certifications: ['NASM-CPT', 'HIIT Specialist']
    },
    benefits: [
      'Burn up to 400+ calories per session',
      'Boost metabolism for 24-48 hours',
      'Improve cardiovascular endurance'
    ],
    category: 'cardio',
    isActive: true,
    isPopular: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'group-fitness',
    title: 'Group Fitness Classes',
    subtitle: 'Energy, Motivation, and Community',
    description: 'Join our vibrant group fitness community where motivation meets results.',
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    duration: '60 minutes',
    level: 'All Levels',
    maxParticipants: '20',
    price: 1500,
    originalPrice: 2000,
    discount: '25% off',
    instructor: {
      name: 'Kavya Patel',
      experience: '10 years',
      certifications: ['Group Fitness Instructor', 'Yoga Alliance RYT-200']
    },
    benefits: [
      'Social motivation and accountability',
      'Variety of workout styles',
      'Professional instruction'
    ],
    category: 'group',
    isActive: true,
    isPopular: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized successfully!');