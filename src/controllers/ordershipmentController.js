// src/controllers/orderShipmentsController.js
import OrderShipment from '../models/OrderShipment.js';

const createShipment = async (req, res) => {
  const { order_id, shipment_date, shipment_amount, order_shipment_id } = req.body;
  try {
    const result = await OrderShipment.create(order_id, shipment_date, shipment_amount, order_shipment_id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shipment', error });
  }
};

const getAllShipments = async (req, res) => {
  try {
    const shipments = await OrderShipment.getAll();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shipments', error });
  }
};

const getShipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await OrderShipment.getById(id);
    if (shipment.length === 0) {
      res.status(404).json({ message: 'Shipment not found' });
    } else {
      res.status(200).json(shipment);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shipment', error });
  }
};

const updateShipment = async (req, res) => {
  const { id } = req.params;
  const { order_id, shipment_date, shipment_amount, order_shipment_id } = req.body;
  try {
    const result = await OrderShipment.update(id, order_id, shipment_date, shipment_amount, order_shipment_id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating shipment', error });
  }
};

const deleteShipment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await OrderShipment.delete(id);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Shipment not found' });
    } else {
      res.status(200).json({ message: 'Shipment deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shipment', error });
  }
};

export { createShipment, getAllShipments, getShipmentById, updateShipment, deleteShipment };
