import express from "express";
import { createOrder, getOrdersByUser, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/user/:user_id", getOrdersByUser);
router.delete("/:id", deleteOrder);

export default router;