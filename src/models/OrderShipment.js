// src/models/OrderShipment.js
import pool from '../config/db.js';

class OrderShipment {
  static async create(order_id, shipment_date, shipment_amount, order_shipment_id) {
    const query = `INSERT INTO Shipments (order_id, shipment_date, shipment_amount, order_shipment_id) 
                   VALUES (?, ?, ?, ?)`;
    try {
      const [results] = await pool.promise().query(query, [order_id, shipment_date, shipment_amount, order_shipment_id]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    const query = 'SELECT * FROM Shipments';
    try {
      const [results] = await pool.promise().query(query);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    const query = 'SELECT * FROM Shipments WHERE id = ?';
    try {
      const [results] = await pool.promise().query(query, [id]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, order_id, shipment_date, shipment_amount, order_shipment_id) {
    const query = `UPDATE Shipments SET order_id = ?, shipment_date = ?, shipment_amount = ?, order_shipment_id = ? WHERE id = ?`;
    try {
      const [results] = await pool.promise().query(query, [order_id, shipment_date, shipment_amount, order_shipment_id, id]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM Shipments WHERE id = ?';
    try {
      const [results] = await pool.promise().query(query, [id]);
      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderShipment;
