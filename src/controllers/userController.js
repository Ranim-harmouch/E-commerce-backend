import db from '../config/db.js';

export const createUser = (req, res) => {
  const { name, email, password, role } = req.body;
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  
  db.query(query, [name, email, password, role], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result[0]);
  });
};