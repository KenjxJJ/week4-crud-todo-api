require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Database Connection
const connectDB = require('./database/db');
connectDB();

// Models
const Todo = require('./models/todo');

// Middleware imports
const logger = require('./middlewares/logger');
const {
  validateCreateTodo,
  validateUpdateTodo,
  validateObjectId,
} = require('./middlewares/validator');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json()); // Parse JSON bodies
app.use(logger);

// GET All – Read
app.get('/todos', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

// POST New – Create
app.post('/todos', validateCreateTodo, async (req, res, next) => {
  try {
    const { task, completed } = req.body;
    const newTodo = new Todo({
      task,
      completed,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
});

// GET Active tasks
app.get('/todos/active', async (req, res, next) => {
  try {
    const active = await Todo.find({ completed: false }).sort({ createdAt: -1 });
    res.status(200).json(active);
  } catch (error) {
    next(error);
  }
});

// GET Completed tasks
app.get('/todos/completed', async (req, res, next) => {
  try {
    const completed = await Todo.find({ completed: true }).sort({ createdAt: -1 });
    res.status(200).json(completed);
  } catch (error) {
    next(error);
  }
});

// GET Single Todo by ID
app.get('/todos/:id', validateObjectId, async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

// PATCH Update – Partial
app.patch('/todos/:id', validateObjectId, validateUpdateTodo, async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

// DELETE Remove
app.delete('/todos/:id', validateObjectId, async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Global Error Handler (Catch-all - Add LAST in app.js)
app.use(errorHandler);

// Graceful Disconnect
process.on('SIGINT', async () => {
  console.log('\nClosing MongoDB connection...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed. Exiting process.');
  process.exit(0);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
