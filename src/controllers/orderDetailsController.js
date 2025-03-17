import OrderDetails from "../models/OrderDetails.js";

export const addProductToOrder = (req, res) => {
  const { order_id, product_id, quantity } = req.body;
  OrderDetails.addProduct(order_id, product_id, quantity, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Product added to order!" });
  });
};

export const getProductsByOrder = (req, res) => {
  const { order_id } = req.params;
  OrderDetails.getProductsByOrder(order_id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};