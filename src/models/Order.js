import db from '../config/db.js';

// Get all orders for a specific user
export const getOrdersByUser = (userId, callback) => {
    const query = 'SELECT * FROM Orders WHERE user_id = ?';
    db.query(query, [userId], callback);
};

// Get a specific order by ID for a specific user
export const getOrderById = (orderId, userId, callback) => {
    const query = 'SELECT * FROM Orders WHERE id = ? AND user_id = ?';
    db.query(query, [orderId, userId], callback);
};

// Create a new order
export const createOrder = (orderData, callback) => {
    const { subtotal_amount, total_amount, order_date, status, user_id } = orderData;
    const query = 'INSERT INTO Orders (subtotal_amount, total_amount, order_date, status, user_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [subtotal_amount, total_amount, order_date, status, user_id], callback);
};

// Delete an order by ID for a specific user
export const deleteOrder = (orderId, userId, callback) => {
    const query = 'DELETE FROM Orders WHERE id = ? AND user_id = ?';
    db.query(query, [orderId, userId], callback);
};