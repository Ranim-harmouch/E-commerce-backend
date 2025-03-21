import db from "../config/db.js"; // Import MySQL connection

const OrderShipmentAddress = {
  getAll: (callback) => {
    db.query("SELECT * FROM Order_shipping_address", (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  create: (data, callback) => {
    const { full_address, street_address, department_floor, town_city } = data;
    db.query(
      "INSERT INTO Order_shipping_address (full_address, street_address, department_floor, town_city) VALUES (?, ?, ?, ?)",
      [full_address, street_address, department_floor, town_city],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, { id: results.insertId, ...data });
      }
    );
  },

  delete: (id, callback) => {
    db.query(
      "DELETE FROM Order_shipping_address WHERE id = ?",
      [id],
      (err, results) => {
        if (err) return callback(err, null);
        if (results.affectedRows === 0) return callback({ message: "Not Found" }, null);
        callback(null, { message: "Deleted successfully" });
      }
    );
  },
};

export default OrderShipmentAddress;