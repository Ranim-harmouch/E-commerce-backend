import Order from "../models/Order.js";

// Order create
export const createOrder = (req, res) => {
  const { user_id, subtotal_amount, order_date, status, orderDetails } = req.body;

  Order.create(user_id, subtotal_amount, order_date, status, orderDetails, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Order created successfully!" });
  });
};

// Get all OREDERS
export const getAllOrders = (req, res) => {
  Order.findAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// for user
export const getOrdersByUser = (req, res) => {
  const { user_id } = req.params;

  Order.findByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// order by id
export const getOrderById = (req, res) => {
  const { id, user_id } = req.params;

  Order.findByIdAndUser(id, user_id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result) return res.status(404).json({ message: "Order not found or does not belong to the user" });

    res.json(result);
  });
};

// Deletion
export const deleteOrder = (req, res) => {
  const { id } = req.params;

  Order.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Order deleted successfully!" });
  });
};