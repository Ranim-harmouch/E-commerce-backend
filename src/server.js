// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import brandRoutes from './routes/brandRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Use routes
app.use('/api/brands', brandRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

