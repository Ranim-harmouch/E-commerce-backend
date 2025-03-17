import express from 'express';
import { getOrders, getOrderById, createOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// Get all orders
router.get('/', getOrders);

// Get a specific order by ID
router.get('/:orderId', getOrderById);

// Create a new order
router.post('/', createOrder);

// Delete an order
router.delete('/:orderId', deleteOrder);

export default router;
