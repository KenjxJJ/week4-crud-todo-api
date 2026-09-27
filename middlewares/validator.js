const Joi = require('joi');
const mongoose = require('mongoose');

const createTodoSchema = Joi.object({
  task: Joi.string().min(3).max(100).required(),
  completed: Joi.boolean().default(false),
});

const updateTodoSchema = Joi.object({
  task: Joi.string().min(3).max(100),
  completed: Joi.boolean(),
}).min(1);

const validateCreateTodo = (req, res, next) => {
  const { error, value } = createTodoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value;
  next();
};

const validateUpdateTodo = (req, res, next) => {
  const { error, value } = updateTodoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value;
  next();
};

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: `Invalid ID: ${req.params.id}` });
  }
  next();
};

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  validateObjectId,
  validateJoi: validateCreateTodo,
};
