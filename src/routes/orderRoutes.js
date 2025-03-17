import express from 'express';
import { createOrder, getOrdersByUserId, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/user/:userId', getOrdersByUserId);
router.delete('/:id', deleteOrder);

export default router;