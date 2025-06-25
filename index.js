const express = require('express');
const app = express();
// const port = 3000;

// Middleware buat parse JSON
app.use(express.json());

// Array buat nyimpan to-do
let todos = [
  {
    id: 1,
    title: "Belajar Cloud Computing",
    description: "Mengerjakan tugas besar komputasi awan",
    completed: false,
    dueDate: "2025-06-25",
    createdAt: "2025-06-16T13:00:00Z"
  }
];

// Counter buat generate ID baru
let idCounter = 2;

// GET /todos - Ambil semua to-do
app.get('/api/todos', (req, res) => {
  res.json({
    status: 'success',
    message: 'Data retrieved successfully',
    data: todos
  });
});

// POST /todos - Tambah to-do baru
app.post('/api/todos', (req, res) => {
  const { title, description, dueDate } = req.body;

  // Validasi input
  if (!title || !dueDate) {
    return res.status(400).json({
      status: 'error',
      message: 'Title and dueDate are required'
    });
  }

  const newTodo = {
    id: idCounter++,
    title,
    description: description || '',
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);

  res.status(201).json({
    status: 'success',
    message: 'To-do created successfully',
    data: newTodo
  });
});

// GET /todos/:id - Ambil detail to-do berdasarkan ID
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      status: 'error',
      message: 'To-do with the given ID not found'
    });
  }

  res.json({
    status: 'success',
    message: 'Data retrieved successfully',
    data: todo
  });
});

// PUT /todos/:id - Update to-do berdasarkan ID
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'To-do with the given ID not found'
    });
  }

  const { title, description, completed, dueDate } = req.body;

  // Validasi input
  if (!title || !dueDate) {
    return res.status(400).json({
      status: 'error',
      message: 'Title and dueDate are required'
    });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    title,
    description: description || '',
    completed: completed || false,
    dueDate
  };

  res.json({
    status: 'success',
    message: 'To-do updated successfully',
    data: todos[todoIndex]
  });
});

// DELETE /todos/:id - Hapus to-do berdasarkan ID
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'To-do with the given ID not found'
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];

  res.json({
    status: 'success',
    message: 'To-do deleted successfully',
    data: deletedTodo
  });
});

// Jalankan server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
