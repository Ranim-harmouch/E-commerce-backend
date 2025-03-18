// const express = require("express");
// const router = express.Router();
// const productController = require('../controllers/productController');
// const upload = require("../middleware/upload");
// const {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");


// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.post("/", upload.single("image"), createProduct); // Handle image upload
// router.put("/:id", upload.single("image"), updateProduct);
// router.delete("/:id", deleteProduct);

// module.exports = router;




// import express from "express";
// import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

// const router = express.Router();

// // Define product routes
// router.get("/", getAllProducts);       // Get all products
// router.get("/:id", getProductById);    // Get product by ID
// router.post("/", addProduct);          // Add a new product
// router.put("/:id", updateProduct);     // Update a product
// router.delete("/:id", deleteProduct);  // Delete a product

// export default router; // Use export default for ES module compatibility





// import express from "express";
// import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

// const router = express.Router();

// // Define product routes
// router.get("/", getAllProducts);       // Get all products
// router.get("/:id", getProductById);    // Get product by ID
// router.post("/", addProduct);          // Add a new product
// router.put("/:id", updateProduct);     // Update a product
// router.delete("/:id", deleteProduct);  // Delete a product

// export default router;




// import express from "express";
// import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

// const router = express.Router();

// // Define product routes
// router.get("/", getAllProducts);       // Get all products
// router.get("/:id", getProductById);    // Get product by ID
// router.post("/", addProduct);          // Add a new product
// router.put("/:id", updateProduct);     // Update a product
// router.delete("/:id", deleteProduct);  // Delete a product

// export default router;




// import express from "express";
// import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

// const router = express.Router();

// // Define product routes
// router.get("/", getAllProducts);       // Get all products
// router.get("/:id", getProductById);    // Get product by ID
// router.post("/", addProduct);          // Add a new product
// router.put("/:id", updateProduct);     // Update a product
// router.delete("/:id", deleteProduct);  // Delete a product

// export default router;



// import express from "express";
// import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

// const router = express.Router();

// // Define product routes
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.post("/", addProduct);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

// export default router;

import express from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

// Define product routes
router.get("/", getAllProducts);       // Get all products
router.get("/:id", getProductById);    // Get product by ID
router.post("/", addProduct);          // Add a new product
router.put("/:id", updateProduct);     // Update a product
router.delete("/:id", deleteProduct);  // Delete a product

export default router;
