import OrderShipment from '../models/OrderShipment.js';

const createShipment = async (req, res) => {
  const { order_id, shipment_date, shipment_amount, order_shipment_id } = req.body;
  try {
    const result = await OrderShipment.create(order_id, shipment_date, shipment_amount, order_shipment_id);
    res.status(201).json({
      data: result,
      message: 'Shipment created successfully!',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: 'Error creating shipment',
      error: error.message,
    });
  }
};

const getAllShipments = async (req, res) => {
  try {
    const shipments = await OrderShipment.getAll();
    res.status(200).json({
      data: shipments,
      message: 'Shipments fetched successfully',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: 'Error fetching shipments',
      error: error.message,
    });
  }
};

const getShipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await OrderShipment.getById(id);
    if (shipment.length === 0) {
      return res.status(404).json({
        data: null,
        message: 'Shipment not found',
        error: null,
      });
    }
    res.status(200).json({
      data: shipment,
      message: 'Shipment fetched successfully',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: 'Error fetching shipment',
      error: error.message,
    });
  }
};

const updateShipment = async (req, res) => {
  const { id } = req.params;
  const { order_id, shipment_date, shipment_amount, order_shipment_id } = req.body;
  try {
    const result = await OrderShipment.update(id, order_id, shipment_date, shipment_amount, order_shipment_id);
    res.status(200).json({
      data: result,
      message: 'Shipment updated successfully!',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: 'Error updating shipment',
      error: error.message,
    });
  }
};

const deleteShipment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await OrderShipment.delete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        data: null,
        message: 'Shipment not found',
        error: null,
      });
    }
    res.status(200).json({
      data: null,
      message: 'Shipment deleted successfully!',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: 'Error deleting shipment',
      error: error.message,
    });
  }
};

export { createShipment, getAllShipments, getShipmentById, updateShipment, deleteShipment };
