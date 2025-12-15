const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
router.get('/', todoController.getAllTodos);

// GET single todo by ID
router.get('/:id', todoController.getTodoById);

// CREATE a new todo
router.post('/', todoController.createTodo);

// UPDATE a todo
router.put('/:id', todoController.updateTodo);

// DELETE a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
