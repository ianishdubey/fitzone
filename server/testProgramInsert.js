const mongoose = require('mongoose');
const Program = require('./models/Program');

async function test() {
  await mongoose.connect('mongodb://localhost:27017/fitzone');
  await mongoose.connection.dropDatabase();

  try {
    await Program.create({
      id: 'test',
      title: 'Test',
      description: 'Test',
      image: 'test.jpg',
      duration: '1h',
      level: 'Beginner',
      maxParticipants: '10',
      price: 100,
      instructor: { name: 'Test' },
      schedule: [
        { day: 'Monday', time: '10:00', spots: 5, isAvailable: true }
      ],
      category: 'cardio'
    });
    console.log('Success!');
  } catch (e) {
    console.error(e);
  }
  await mongoose.disconnect();
}

test(); 