
import express from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, uploadMiddleware  } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);       // Get all products
router.get("/:id", getProductById);    // Get product by ID
router.post("/", uploadMiddleware, addProduct);          // Add a new product
router.put("/:id", updateProduct);     // Update a product
router.delete("/:id", deleteProduct);  // Delete a product

export default router;
