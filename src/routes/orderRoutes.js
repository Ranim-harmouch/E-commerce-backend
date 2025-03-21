import express from "express";
import { createOrder, getAllOrders, getOrdersByUser, getOrderById, deleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder); 
router.get("/", getAllOrders); // this route is for admin only
router.get("/user/:user_id", getOrdersByUser); 
router.get("/:id/user/:user_id", getOrderById); 
router.delete("/:id", deleteOrder); 

export default router;