// src/routes/orderShipmentsRoutes.js
import express from 'express';
import { createShipment, getAllShipments, getShipmentById, updateShipment, deleteShipment } from '../controllers/orderShipmentController.js';

const router = express.Router();

router.post('/', createShipment);
router.get('/', getAllShipments);
router.get('/:id', getShipmentById);
router.put('/:id', updateShipment);
router.delete('/:id', deleteShipment);

export default router;

