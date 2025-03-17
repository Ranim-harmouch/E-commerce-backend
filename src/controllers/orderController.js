import Order from "../models/Order.js";

export const createOrder = (req, res) => {
  const { user_id, subtotal_amount, total_amount, order_date, status } = req.body;
  Order.create(user_id, subtotal_amount, total_amount, order_date, status, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Order created successfully!" });
  });
};

export const getOrdersByUser = (req, res) => {
  const { user_id } = req.params;
  Order.findByUserId(user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

export const deleteOrder = (req, res) => {
  const { id } = req.params;
  Order.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Order deleted successfully!" });
  });
};