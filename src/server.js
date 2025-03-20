// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import brandRoutes from './routes/brandRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
// import orderShipmentsRoutes from './routes/orderShipmentRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Use routes
app.use('/api/brands', brandRoutes);
app.use('/api/reviews', reviewRoutes);
// app.use('/api/shipments', orderShipmentsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

