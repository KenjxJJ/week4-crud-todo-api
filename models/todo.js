const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, 'Task is required'],
      trim: true,
      minlength: [3, 'Task must be at least 3 characters long'],
      maxlength: [100, 'Task cannot exceed 100 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
