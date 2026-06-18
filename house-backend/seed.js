
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');
const bcrypt = require('bcrypt');

const sampleData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    console.log('Cleared existing data');

    // Create a sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const sampleUser = new User({
      email: 'demo@example.com',
      username: 'demo_user',
      password: hashedPassword
    });
    await sampleUser.save();
    console.log('Created sample user');

    // Create sample properties
    const sampleProperties = [
      {
        title: 'Modern Downtown Apartment',
        description: 'A stunning modern apartment in the heart of downtown with amazing city views.',
        price: 450000,
        location: '123 Main St',
        city: 'New York',
        country: 'USA',
        type: 'Apartment',
        imageUrls: [
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
        ],
        authorId: sampleUser._id,
        forRent: false
      },
      {
        title: 'Cozy Suburban Family Home',
        description: 'Spacious 4-bedroom family home with a beautiful backyard and garden.',
        price: 650000,
        location: '456 Oak Ave',
        city: 'Los Angeles',
        country: 'USA',
        type: 'House',
        imageUrls: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
        ],
        authorId: sampleUser._id,
        forRent: false
      },
      {
        title: 'Downtown Studio Loft',
        description: 'Perfect studio apartment for young professionals, right near all the best cafes.',
        price: 1800,
        location: '789 Pine St',
        city: 'Chicago',
        country: 'USA',
        type: 'Studio',
        imageUrls: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
        ],
        authorId: sampleUser._id,
        forRent: true
      },
      {
        title: 'Luxury Beachfront Villa',
        description: 'Exquisite beachfront property with private pool and direct ocean access.',
        price: 2500000,
        location: '321 Ocean Dr',
        city: 'Miami',
        country: 'USA',
        type: 'House',
        imageUrls: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
        ],
        authorId: sampleUser._id,
        forRent: false
      },
      {
        title: 'Charming City Apartment',
        description: 'Beautiful 2-bedroom apartment with great natural light and cozy fireplace.',
        price: 2200,
        location: '654 Cedar Ln',
        city: 'Boston',
        country: 'USA',
        type: 'Apartment',
        imageUrls: [
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
          'https://images.unsplash.com/photo-1522158665529-e87b61151e45?w=800&q=80'
        ],
        authorId: sampleUser._id,
        forRent: true
      }
    ];

    await Property.insertMany(sampleProperties);
    console.log('Created sample properties');

    console.log('✅ Seed data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

sampleData();
