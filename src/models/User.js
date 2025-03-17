import db from "../config/db.js";

const User = {
  create: (name, email, password, role, callback) => {
    db.query(
      "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role],
      callback
    );
  },

  findById: (id, callback) => {
    db.query("SELECT * FROM Users WHERE id = ?", [id], callback);
  }
};

export default User;