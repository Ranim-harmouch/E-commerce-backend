// src/controllers/brandController.js
import Brand from '../models/Brand.js';

// CREATE - Add a new brand
export const createBrand = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Brand name is required!' });
  }

  Brand.createBrand(name, (err, result) => {
    if (err) {
      console.error('Error creating brand:', err);
      return res.status(500).json({ message: 'Error creating brand' });
    }
    res.status(201).json({ message: 'Brand created successfully', brandId: result.insertId });
  });
};

// READ - Get all brands
export const getAllBrands = (req, res) => {
  Brand.getAllBrands((err, results) => {
    if (err) {
      console.error('Error fetching brands:', err);
      return res.status(500).json({ message: 'Error fetching brands' });
    }
    res.status(200).json(results);
  });
};

// READ - Get a brand by ID
export const getBrandById = (req, res) => {
  const { id } = req.params;

  Brand.getBrandById(id, (err, result) => {
    if (err) {
      console.error('Error fetching brand:', err);
      return res.status(500).json({ message: 'Error fetching brand' });
    }
    if (!result.length) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json(result[0]);
  });
};

// UPDATE - Update a brand by ID
export const updateBrand = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Brand name is required!' });
  }

  Brand.updateBrand(id, name, (err, result) => {
    if (err) {
      console.error('Error updating brand:', err);
      return res.status(500).json({ message: 'Error updating brand' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json({ message: 'Brand updated successfully' });
  });
};

// DELETE - Delete a brand by ID
export const deleteBrand = (req, res) => {
  const { id } = req.params;

  Brand.deleteBrand(id, (err, result) => {
    if (err) {
      console.error('Error deleting brand:', err);
      return res.status(500).json({ message: 'Error deleting brand' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.status(200).json({ message: 'Brand deleted successfully' });
  });
};
