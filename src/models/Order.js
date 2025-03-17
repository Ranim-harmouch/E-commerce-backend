import db from "../config/db.js";

const Order = {
  create: (user_id, subtotal_amount, total_amount, order_date, status, callback) => {
    db.query(
      "INSERT INTO Orders (user_id, subtotal_amount, total_amount, order_date, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, subtotal_amount, total_amount, order_date, status],
      callback
    );
  },

  findByUserId: (user_id, callback) => {
    db.query("SELECT * FROM Orders WHERE user_id = ?", [user_id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM Orders WHERE id = ?", [id], callback);
  }
};

export default Order;