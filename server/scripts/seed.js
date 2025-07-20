const mongoose = require('mongoose');
const { seedPrograms } = require('../data/seedData');
require('dotenv').config();

async function connectToDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitzone';
    console.log('Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
}

async function runSeed() {
  console.log('🌱 Starting database seeding process...\n');
  
  try {
    // Connect to MongoDB
    const connected = await connectToDatabase();
    if (!connected) {
      process.exit(1);
    }
    
    // Check database connection
    const dbState = mongoose.connection.readyState;
    console.log('Database connection state:', dbState === 1 ? 'Connected' : 'Not Connected');
    
    if (dbState !== 1) {
      throw new Error('Database not properly connected');
    }
    
    // Drop the entire database to remove old schema/index definitions
    await mongoose.connection.dropDatabase();
    console.log("Dropped entire database to clear all old schema/indexes.");
    
    // Drop the 'programs' collection if it exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    if (collections.some(col => col.name === 'programs')) {
      await mongoose.connection.db.dropCollection('programs');
      console.log("Dropped 'programs' collection to clear old schema/indexes.");
    }
    
    // Run seed functions
    console.log('📦 Seeding programs...');
    await seedPrograms();
    console.log('✅ Programs seeded successfully\n');
    
    console.log('🎉 Database seeding completed successfully!');
    
    // Close connection
    await mongoose.connection.close();
    console.log('📤 Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    console.error('Full error:', error);
    
    // Close connection on error
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n⚠️  Received SIGINT. Closing database connection...');
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⚠️  Received SIGTERM. Closing database connection...');
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }
  process.exit(0);
});

// Run the seed function
runSeed();