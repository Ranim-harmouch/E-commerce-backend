// src/models/OrderShipment.js
import pool from '../config/db.js';

class OrderShipment {
  static create(order_id, shipment_date, shipment_amount, order_shipment_id) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO Shipments (order_id, shipment_date, shipment_amount, order_shipment_id) 
                     VALUES (?, ?, ?, ?)`;
      pool.query(query, [order_id, shipment_date, shipment_amount, order_shipment_id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Shipments';
      pool.query(query, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Shipments WHERE id = ?';
      pool.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static update(id, order_id, shipment_date, shipment_amount, order_shipment_id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE Shipments SET order_id = ?, shipment_date = ?, shipment_amount = ?, order_shipment_id = ? WHERE id = ?`;
      pool.query(query, [order_id, shipment_date, shipment_amount, order_shipment_id, id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Shipments WHERE id = ?';
      pool.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

export default OrderShipment;

