import User from "../models/User.js";

export const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  User.create(name, email, password, role, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User registered successfully!" });
  });
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "User not found!" });
    res.json(result[0]);
  });
};