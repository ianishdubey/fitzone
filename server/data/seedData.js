const samplePrograms = [
  {
    id: 'hiit-training',
    title: 'High-Intensity Training',
    subtitle: 'Transform Your Body with Maximum Efficiency',
    description: 'Our High-Intensity Interval Training (HIIT) program is designed for those who want maximum results in minimum time.',
    longDescription: 'This scientifically-proven training method alternates between intense bursts of activity and fixed periods of less-intense activity or complete rest.',
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    duration: '45 minutes',
    level: 'Intermediate',
    maxParticipants: '12',
    price: 1875,
    originalPrice: 2500,
    discount: '25% off',
    instructor: {
      name: 'Arjun Singh',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      experience: '8 years',
      certifications: ['NASM-CPT', 'HIIT Specialist', 'Metabolic Conditioning'],
      bio: 'Certified fitness trainer specializing in high-intensity workouts',
      specialties: ['HIIT', 'Fat Loss', 'Conditioning']
    },
    benefits: [
      'Burn up to 400+ calories per session',
      'Boost metabolism for 24-48 hours post-workout',
      'Improve cardiovascular endurance',
      'Build lean muscle mass',
      'Increase mental toughness',
      'Time-efficient workouts'
    ],
    features: [
      'Small group training',
      'Heart rate monitoring',
      'Progressive difficulty',
      'Expert coaching'
    ],
    equipment: [
      'Kettlebells',
      'Battle ropes',
      'Plyometric boxes',
      'Medicine balls',
      'Resistance bands',
      'Body weight exercises'
    ],
    whatToExpect: [
      'Dynamic warm-up to prepare your body',
      '4-6 high-intensity intervals',
      'Active recovery periods between intervals',
      'Full-body movements targeting multiple muscle groups',
      'Cool-down and stretching session',
      'Heart rate monitoring and guidance'
    ],
    schedule: [
      { day: 'Monday', time: '6:00 AM - 6:45 AM', spots: 8, isAvailable: true },
      { day: 'Monday', time: '7:00 PM - 7:45 PM', spots: 3, isAvailable: true },
      { day: 'Wednesday', time: '6:00 AM - 6:45 AM', spots: 5, isAvailable: true },
      { day: 'Wednesday', time: '7:00 PM - 7:45 PM', spots: 7, isAvailable: true },
      { day: 'Friday', time: '6:00 AM - 6:45 AM', spots: 2, isAvailable: true },
      { day: 'Saturday', time: '9:00 AM - 9:45 AM', spots: 10, isAvailable: true }
    ],
    category: 'cardio',
    tags: ['HIIT', 'Fat Loss', 'Cardio', 'High Intensity'],
    difficulty: 4,
    caloriesBurn: { min: 400, max: 600 },
    prerequisites: ['Basic fitness level required'],
    contraindications: ['Heart conditions', 'Recent injuries'],
    isActive: true,
    isPopular: true,
    isFeatured: false,
    enrollmentCount: 156,
    rating: { average: 4.8, count: 23 }
  },
  {
    id: 'group-fitness',
    title: 'Group Fitness Classes',
    subtitle: 'Energy, Motivation, and Community',
    description: 'Join our vibrant group fitness community where motivation meets results.',
    longDescription: 'Our diverse range of group classes offers something for everyone, from high-energy dance workouts to mindful yoga sessions.',
    image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    duration: '60 minutes',
    level: 'All Levels',
    maxParticipants: '20',
    price: 1500,
    originalPrice: 2000,
    discount: '25% off',
    instructor: {
      name: 'Kavya Patel',
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      experience: '10 years',
      certifications: ['Group Fitness Instructor', 'Yoga Alliance RYT-200', 'Zumba Licensed'],
      bio: 'Experienced group fitness instructor with expertise in multiple formats',
      specialties: ['Group Classes', 'Yoga', 'Dance Fitness']
    },
    benefits: [
      'Social motivation and accountability',
      'Variety of workout styles',
      'Professional instruction and form correction',
      'Fun and energetic atmosphere',
      'Build lasting friendships',
      'Suitable for all fitness levels'
    ],
    features: [
      'Multiple class formats',
      'All fitness levels welcome',
      'Social atmosphere',
      'Expert instruction'
    ],
    equipment: [
      'Yoga mats',
      'Light weights',
      'Resistance bands',
      'Stability balls',
      'Foam rollers',
      'Props for specific classes'
    ],
    whatToExpect: [
      'Energetic warm-up with the group',
      'Main workout tailored to class type',
      'Modifications for different fitness levels',
      'Encouraging group atmosphere',
      'Cool-down and relaxation',
      'Post-class community interaction'
    ],
    schedule: [
      { day: 'Monday', time: '9:00 AM - 10:00 AM', spots: 15, type: 'Yoga Flow', isAvailable: true },
      { day: 'Tuesday', time: '6:30 PM - 7:30 PM', spots: 8, type: 'Zumba', isAvailable: true },
      { day: 'Wednesday', time: '9:00 AM - 10:00 AM', spots: 12, type: 'Pilates', isAvailable: true },
      { day: 'Thursday', time: '6:30 PM - 7:30 PM', spots: 5, type: 'Body Pump', isAvailable: true },
      { day: 'Friday', time: '9:00 AM - 10:00 AM', spots: 18, type: 'Yoga Flow', isAvailable: true },
      { day: 'Saturday', time: '10:00 AM - 11:00 AM', spots: 10, type: 'Dance Fitness', isAvailable: true }
    ],
    category: 'group',
    tags: ['Group Classes', 'Community', 'Variety', 'Fun'],
    difficulty: 2,
    caloriesBurn: { min: 300, max: 500 },
    prerequisites: [],
    contraindications: [],
    isActive: true,
    isPopular: true,
    isFeatured: true,
    enrollmentCount: 234,
    rating: { average: 4.6, count: 45 }
  },
  {
    id: 'strength-training',
    title: 'Strength Training',
    subtitle: 'Build Power, Muscle, and Confidence',
    description: 'Our comprehensive strength training program focuses on progressive overload principles to help you build muscle, increase power, and transform your physique.',
    longDescription: 'Whether you\'re a beginner or advanced lifter, our program adapts to your level with expert guidance and proven methodologies.',
    image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    duration: '90 minutes',
    level: 'Beginner to Advanced',
    maxParticipants: '8',
    price: 2625,
    originalPrice: 3500,
    discount: '25% off',
    instructor: {
      name: 'Rohit Kumar',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      experience: '12 years',
      certifications: ['CSCS', 'Powerlifting Coach', 'Olympic Lifting Certified'],
      bio: 'Expert strength coach with powerlifting and Olympic lifting background',
      specialties: ['Strength Training', 'Powerlifting', 'Olympic Lifting']
    },
    benefits: [
      'Increase muscle mass and strength',
      'Improve bone density',
      'Boost metabolism',
      'Better functional movement',
      'Enhanced athletic performance',
      'Injury prevention'
    ],
    features: [
      'Progressive overload programming',
      'Form correction and safety',
      'Compound movement focus',
      'Personalized progression'
    ],
    equipment: [
      'Olympic barbells',
      'Dumbbells (5-100 lbs)',
      'Power racks',
      'Cable machines',
      'Specialty bars',
      'Plate-loaded machines'
    ],
    whatToExpect: [
      'Proper warm-up and mobility work',
      'Compound movement focus',
      'Progressive overload programming',
      'Form correction and safety guidance',
      'Accessory exercises for muscle balance',
      'Recovery and stretching protocols'
    ],
    schedule: [
      { day: 'Monday', time: '5:30 AM - 7:00 AM', spots: 6, focus: 'Upper Body', isAvailable: true },
      { day: 'Tuesday', time: '6:00 PM - 7:30 PM', spots: 4, focus: 'Lower Body', isAvailable: true },
      { day: 'Wednesday', time: '5:30 AM - 7:00 AM', spots: 7, focus: 'Full Body', isAvailable: true },
      { day: 'Thursday', time: '6:00 PM - 7:30 PM', spots: 3, focus: 'Push/Pull', isAvailable: true },
      { day: 'Friday', time: '5:30 AM - 7:00 AM', spots: 8, focus: 'Functional', isAvailable: true },
      { day: 'Saturday', time: '8:00 AM - 9:30 AM', spots: 5, focus: 'Powerlifting', isAvailable: true }
    ],
    category: 'strength',
    tags: ['Strength Training', 'Muscle Building', 'Powerlifting', 'Progressive Overload'],
    difficulty: 3,
    caloriesBurn: { min: 250, max: 400 },
    prerequisites: ['Basic understanding of gym equipment'],
    contraindications: ['Recent back injuries', 'Uncontrolled high blood pressure'],
    isActive: true,
    isPopular: false,
    isFeatured: true,
    enrollmentCount: 89,
    rating: { average: 4.9, count: 34 }
  }
];

async function seedPrograms() {
  try {
    const Program = require('../models/Program');
    
    // Clear existing programs
    await Program.deleteMany({});
    console.log('Cleared existing programs');
    
    // Insert sample programs
    samplePrograms.forEach((program, idx) => {
      console.log(`Program #${idx + 1} schedule type:`, Array.isArray(program.schedule) ? 'array' : typeof program.schedule);
    });
    const insertedPrograms = await Program.insertMany(samplePrograms);
    console.log(`Successfully seeded ${insertedPrograms.length} programs`);
    
    return insertedPrograms;
  } catch (error) {
    console.error('Error seeding programs:', error);
    throw error;
  }
}

module.exports = { seedPrograms, samplePrograms };