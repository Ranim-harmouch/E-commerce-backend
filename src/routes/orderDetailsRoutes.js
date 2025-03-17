import express from 'express';
import { addOrderDetails, getOrderDetailsByOrderId } from '../controllers/orderdetailsController.js';

const router = express.Router();

router.post('/', addOrderDetails);
router.get('/order/:orderId', getOrderDetailsByOrderId);

export default router;