const Todo = require('../models/Todo');

// Function to format Sri Lanka time
const getSriLankaTime = () => {
  const now = new Date();
  const srilankTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return srilankTime.toLocaleString('en-US', { timeZone: 'Asia/Colombo' });
};

// GET all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log(`✅ [SUCCESS] [${getSriLankaTime()}] getAllTodos - Found ${todos.length} todos`);
    res.json(todos);
  } catch (err) {
    console.error(`❌ [FAILED] [${getSriLankaTime()}] getAllTodos - ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

// GET single todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      console.error(`❌ [FAILED] [${getSriLankaTime()}] getTodoById - Todo not found (ID: ${req.params.id})`);
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log(`✅ [SUCCESS] [${getSriLankaTime()}] getTodoById - Retrieved: ${todo.title}`);
    res.json(todo);
  } catch (err) {
    console.error(`❌ [FAILED] [${getSriLankaTime()}] getTodoById - ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new todo
exports.createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    status: req.body.status
  });

  try {
    const newTodo = await todo.save();
    console.log(`✅ [SUCCESS] [${getSriLankaTime()}] createTodo - Created: "${newTodo.title}" (ID: ${newTodo._id})`);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(`❌ [FAILED] [${getSriLankaTime()}] createTodo - ${err.message}`);
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      console.error(`❌ [FAILED] [${getSriLankaTime()}] updateTodo - Todo not found (ID: ${req.params.id})`);
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.body.title) todo.title = req.body.title;
    if (req.body.description) todo.description = req.body.description;
    if (req.body.date) todo.date = req.body.date;
    if (req.body.status) todo.status = req.body.status;

    const updatedTodo = await todo.save();
    console.log(`✅ [SUCCESS] [${getSriLankaTime()}] updateTodo - Updated: "${updatedTodo.title}" (ID: ${updatedTodo._id})`);
    res.json(updatedTodo);
  } catch (err) {
    console.error(`❌ [FAILED] [${getSriLankaTime()}] updateTodo - ${err.message}`);
    res.status(400).json({ message: err.message });
  }
};

// DELETE a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      console.error(`❌ [FAILED] [${getSriLankaTime()}] deleteTodo - Todo not found (ID: ${req.params.id})`);
      return res.status(404).json({ message: 'Todo not found' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    console.log(`✅ [SUCCESS] [${getSriLankaTime()}] deleteTodo - Deleted: "${todo.title}" (ID: ${req.params.id})`);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    console.error(`❌ [FAILED] [${getSriLankaTime()}] deleteTodo - ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};
