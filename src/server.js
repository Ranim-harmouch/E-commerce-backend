
import productRoutes from './routes/productRoutes.js';

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderShipmentAdressRoutes from "./routes/orderShipmentAdress.js";
import orderRoutes from "./routes/orderRoutes.js"; 
import brandRoutes from './routes/brandRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
 
import orderShipmentsRoutes from './routes/orderShipmentRoutes.js'; 

import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/health", (_, res) => {
  res.send("Still alive!");
});
app.use("/api/ordershipment", orderShipmentAdressRoutes);
app.use("/api/orders", orderRoutes); 
app.use('/api/brands', brandRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api/products', productRoutes);
app.use('/api/shipments', orderShipmentsRoutes);

app.use("/users", authRoutes);
app.use("/admin", userRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

