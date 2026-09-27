require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./database/db');
const Todo = require('./models/todo');

const sampleTodos = [
  { task: 'Learn Node.js and Express', completed: true },
  { task: 'Connect to MongoDB Atlas with Mongoose', completed: true },
  { task: 'Build and deploy RESTful CRUD API', completed: false },
  { task: 'Master backend database architectures', completed: false },
];

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing todos...');
    await Todo.deleteMany({});

    console.log('Inserting seed data...');
    const inserted = await Todo.insertMany(sampleTodos);
    console.log(`Successfully seeded ${inserted.length} todos!`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
