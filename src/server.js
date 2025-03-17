import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import orderDetailsRoutes from "./routes/orderDetailsRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/order-details", orderDetailsRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});