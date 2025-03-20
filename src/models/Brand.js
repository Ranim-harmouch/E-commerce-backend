// src/models/Brand.js
import db from '../config/db.js';

// CREATE - Add a new brand
const createBrand = (name, callback) => {
  const query = 'INSERT INTO Brands (name) VALUES (?)';
  db.query(query, [name], callback);
};

// READ - Get all brands
const getAllBrands = (callback) => {
  const query = 'SELECT * FROM Brands';
  db.query(query, callback);
};

// READ - Get a brand by ID
const getBrandById = (id, callback) => {
  const query = 'SELECT * FROM Brands WHERE id = ?';
  db.query(query, [id], callback);
};

// UPDATE - Update a brand by ID
const updateBrand = (id, name, callback) => {
  const query = 'UPDATE Brands SET name = ? WHERE id = ?';
  db.query(query, [name, id], callback);
};

// DELETE - Delete a brand by ID
const deleteBrand = (id, callback) => {
  const query = 'DELETE FROM Brands WHERE id = ?';
  db.query(query, [id], callback);
};

export default {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
