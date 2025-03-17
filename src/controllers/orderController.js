import db from '../config/db.js';

export const createOrder = (req, res) => {
  const { subtotal_amount, total_amount, order_date, status, user_id } = req.body;
  const query = 'INSERT INTO orders (subtotal_amount, total_amount, order_date, status, user_id) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [subtotal_amount, total_amount, order_date, status, user_id], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
  });
};

export const getOrdersByUserId = (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM orders WHERE user_id = ?';
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(result);
  });
};

export const deleteOrder = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM orders WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  });
};