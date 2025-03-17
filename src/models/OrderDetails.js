import db from "../config/db.js";

const OrderDetails = {
  addProduct: (order_id, product_id, quantity, callback) => {
    db.query(
      "INSERT INTO OrderDetails (order_id, product_id, quantity) VALUES (?, ?, ?)",
      [order_id, product_id, quantity],
      callback
    );
  },

  getProductsByOrder: (order_id, callback) => {
    db.query(
      `SELECT p.id, p.name, p.price, i.image_link, od.quantity
       FROM OrderDetails od
       JOIN Products p ON od.product_id = p.id
       LEFT JOIN ProductImages i ON p.id = i.product_id
       WHERE od.order_id = ?`,
      [order_id],
      callback
    );
  }
};

export default OrderDetails;