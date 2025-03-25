// src/models/OrderShipment.js
import pool from '../config/db.js';

const OrderShipment = {
  // Create a new order shipment
  create: async (orderShipmentData) => {
    const { order_id, shipment_date, shipment_amount, order_shipment_id } = orderShipmentData;

    if (!order_id || !shipment_date || !shipment_amount || !order_shipment_id) {
      throw new Error("All fields are required");
    }

    const query = `INSERT INTO Shipments (order_id, shipment_date, shipment_amount, order_shipment_id) 
                   VALUES (?, ?, ?, ?)`;
    try {
      const [results] = await pool.promise().query(query, [order_id, shipment_date, shipment_amount, order_shipment_id]);
      return results;
    } catch (err) {
      throw err;
    }
  },

  // Get all shipments
  getAll: async () => {
    const query = 'SELECT * FROM Shipments';
    try {
      const [results] = await pool.promise().query(query);
      return results;
    } catch (err) {
      throw err;
    }
  },

  // Get a shipment by ID
  getById: async (id) => {
    const query = 'SELECT * FROM Shipments WHERE id = ?';
    try {
      const [results] = await pool.promise().query(query, [id]);
      if (results.length === 0) {
        throw new Error("Shipment not found");
      }
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  // Update an existing shipment
  update: async (id, orderShipmentData) => {
    const { order_id, shipment_date, shipment_amount, order_shipment_id } = orderShipmentData;

    if (!order_id || !shipment_date || !shipment_amount || !order_shipment_id) {
      throw new Error("All fields are required");
    }

    const query = `UPDATE Shipments SET order_id = ?, shipment_date = ?, shipment_amount = ?, order_shipment_id = ? WHERE id = ?`;
    try {
      const [results] = await pool.promise().query(query, [order_id, shipment_date, shipment_amount, order_shipment_id, id]);
      if (results.affectedRows === 0) {
        throw new Error("Shipment not found");
      }
      return results;
    } catch (err) {
      throw err;
    }
  },

  // Delete a shipment by ID
  delete: async (id) => {
    const query = 'DELETE FROM Shipments WHERE id = ?';
    try {
      const [results] = await pool.promise().query(query, [id]);
      if (results.affectedRows === 0) {
        throw new Error("Shipment not found");
      }
      return results;
    } catch (err) {
      throw err;
    }
  }
};

export default OrderShipment;
