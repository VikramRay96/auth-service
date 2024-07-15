const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for todos
let todos = [];

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send({ message: "auth service" });
});

// Get all todos
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos[todoIndex] = { ...todos[todoIndex], title, completed };
  res.status(200).json(todos[todoIndex]);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});