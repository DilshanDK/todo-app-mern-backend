require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Enable CORS for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://todo-app-mern-frontend-d3ig.onrender.com' // Add your frontend URL
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

console.log('🚀 [DEBUG] Backend server starting...');
console.log(`📍 [DEBUG] API URL: http://localhost:${process.env.PORT || 5000}`);

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
console.log('🔗 [DEBUG] Connecting to MongoDB...');

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ [DEBUG] MongoDB connected successfully'))
  .catch((err) => console.error('❌ [DEBUG] MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  console.log('🔍 [DEBUG] GET / endpoint called');
  res.send('Backend is running!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('🔍 [DEBUG] GET /health endpoint called');
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  console.log(`📊 [DEBUG] Database status: ${dbStatus}`);
  res.json({
    message: 'Backend is healthy',
    database: dbStatus,
    timestamp: new Date()
  });
});

// Test CORS endpoint
app.get('/api/test', (req, res) => {
  console.log('✅ [DEBUG] CORS is working! Frontend can connect.');
  res.json({ message: 'CORS is working correctly' });
});

// Mount the routes at /api/todos
app.use('/api/todos', todoRoutes);
console.log('📝 [DEBUG] Routes mounted at /api/todos');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ [DEBUG] Server running on http://localhost:${PORT}`);
  console.log('🎯 [DEBUG] Ready to receive requests!\n');
});
