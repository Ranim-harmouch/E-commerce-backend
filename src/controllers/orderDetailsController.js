import db from '../config/db.js';

export const addOrderDetails = (req, res) => {
  const { order_id, product_id, quantity } = req.body;
  const query = 'INSERT INTO order_details (order_id, product_id, quantity) VALUES (?, ?, ?)';
  
  db.query(query, [order_id, product_id, quantity], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ message: 'Order details added successfully', orderDetailId: result.insertId });
  });
};

export const getOrderDetailsByOrderId = (req, res) => {
  const { orderId } = req.params;
  const query = `
    SELECT od.*, p.name, p.image_link 
    FROM order_details od 
    JOIN products p ON od.product_id = p.id 
    WHERE od.order_id = ?
  `;
  
  db.query(query, [orderId], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(result);
  });
};