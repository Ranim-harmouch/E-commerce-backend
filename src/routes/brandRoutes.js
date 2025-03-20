// src/routes/brandRoutes.js
import express from 'express';
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} from '../controllers/brandController.js';

const router = express.Router();

// CREATE a new brand
router.post('/', createBrand);

// READ all brands
router.get('/', getAllBrands);

// READ a brand by ID
router.get('/:id', getBrandById);

// UPDATE a brand by ID
router.put('/:id', updateBrand);

// DELETE a brand by ID
router.delete('/:id', deleteBrand);

export default router;
