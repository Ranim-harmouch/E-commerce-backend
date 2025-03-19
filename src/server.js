
import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js'; 
import cors from 'cors';

dotenv.config();  

import productRoutes from './routes/productRoutes.js';
import imagesRoutes from "./routes/imagesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

console.log('Using database host:', process.env.DB_HOST);

app.use('/api/products', productRoutes);
app.use('/api/image', imagesRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
