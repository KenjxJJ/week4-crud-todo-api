const express = require('express');
const app = express();
// Middleware imports
const logger = require('./middlewares/logger');
const validateJoi = require('./middlewares/validator')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json()); // Parse JSON bodies
app.use(logger)

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: true },
];

// GET All – Read
app.get('/todos', (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});


// POST New – Create
app.post('/todos', validateJoi, (req, res, next) => {
  // Check if task has been set
  try {
    if (!req.body.task) return res.status(400).json({ message: 'Task is required' });
    const newTodo = { id: todos.length + 1, ...req.body }; // Auto-ID
    todos.push(newTodo);
    res.status(201).json(newTodo); // Echo back
  }
  catch (error) {
    next(error)
  }

});

// GET Active tasks
app.get('/todos/active', (req, res) => {
  const active = todos.filter((t) => !t.completed); // Array.filter()
  if (!active) return res.status(404).json({ message: 'No completed tasks found' });
  res.status(200).json(active); // Send array as JSON
});

// GET Completed tasks
app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);
  res.status(200).json(completed); // Custom Read!
});


// GET All – Read ID
app.get('/todos/:id', validateJoi, (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      throw new Error(`Invalid ID ${id}`)
    }
    const todo = todos.find((t) => t.id === id); // Array.find()
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(200).json(todo); // Send array as JSON
  } catch (error) {
    next(error)
  }
});


// PATCH Update – Partial
app.patch('/todos/:id', validateJoi, (req, res, next) => {
  try {
    const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    Object.assign(todo, req.body); // Merge: e.g., {completed: true}
    res.status(200).json(todo);
  } catch (error) {
    next(error)
  }

});

// DELETE Remove
app.delete('/todos/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error(`Invalid ID ${id}`)
    } 
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== id); // Array.filter() – non-destructive
    if (todos.length === initialLength)
      return res.status(404).json({ error: 'Not found' });
    res.status(204).send(); // Silent success
  } catch (error) {
    next(error)
  }
});

// Global Error Handler (Catch-all - Add LAST in app.js)
app.use(errorHandler);

const PORT = 3002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
