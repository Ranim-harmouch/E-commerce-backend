import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js'; 
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import { getMe } from './controllers/userController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.get('/', (req, res) => {
  res.send('🚀 Backend is running!');
});
app.get("/users/me", verifyToken, getMe);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});