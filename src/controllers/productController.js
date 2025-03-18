// const productSchema = require("../schemas/productSchema");



// const db = require("../config/db");

// // Get all products
// exports.getAllProducts = async (req, res) => {
//   try {
//     const [products] = await db.query("SELECT * FROM products");
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get product by ID
// exports.getProductById = async (req, res) => {
//   try {
//     const [product] = await db.query("SELECT * FROM products WHERE id = ?", [
//       req.params.id,
//     ]);
//     if (product.length === 0) return res.status(404).json({ message: "Product not found" });
//     res.json(product[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// //Create new product with validation
// exports.createProduct = async (req, res) => {
//   try {
//     const { error } = productSchema.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     const { name, description, quantity, price, color, discount, category } = req.body;
//     const imageUrl = req.file ? /uploads/${req.file.filename} : null;

//     const result = await db.query(
//       "INSERT INTO products (name, description, quantity, price, color, discount, category, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//       [name, description, quantity, price, color, discount, category, imageUrl]
//     );

//     res.status(201).json({ message: "Product created successfully", id: result[0].insertId, image_url: imageUrl });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// // Create new product
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, description, quantity, price, color, discount, category } = req.body;
//     const result = await db.query(
//       "INSERT INTO products (name, description, quantity, price, color, discount, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [name, description, quantity, price, color, discount, category]
//     );
//     res.status(201).json({ message: "Product created successfully", id: result[0].insertId });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update product
// exports.updateProduct = async (req, res) => {
//   try {
//     const { name, description, quantity, price, color, discount, category } = req.body;
//     const result = await db.query(
//       "UPDATE products SET name=?, description=?, quantity=?, price=?, color=?, discount=?, category=? WHERE id=?",
//       [name, description, quantity, price, color, discount, category, req.params.id]
//     );
//     if (result[0].affectedRows === 0) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Delete product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const result = await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
//     if (result[0].affectedRows === 0) return res.status(404).json({ message: "Product not found" });
//     res.json({ message: "Product deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




// const db = require("../config/db");


// // Get all products
// exports.getAllProducts = async (req, res) => {
//     try {
//       const [products] = await db.query("SELECT * FROM products");
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Get product by ID
//   exports.getProductById = async (req, res) => {
//     try {
//       const [product] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
//       if (product.length === 0) return res.status(404).json({ message: "Product not found" });
//       res.json(product[0]);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Create new product with image
//   exports.createProduct = async (req, res) => {
//     try {
//       const { name, description, quantity, price, color, discount, category } = req.body;
//       const imageUrl = req.file ? /uploads/${req.file.filename} : null;
  
//       const result = await db.query(
//         "INSERT INTO products (name, description, quantity, price, color, discount, category, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//         [name, description, quantity, price, color, discount, category, imageUrl]
//       );
  
//       res.status(201).json({ message: "Product created successfully", id: result[0].insertId, image_url: imageUrl });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Update product with optional image
//   exports.updateProduct = async (req, res) => {
//     try {
//       const { name, description, quantity, price, color, discount, category } = req.body;
//       const imageUrl = req.file ? /uploads/${req.file.filename} : null;
  
//       const updateQuery = imageUrl
//         ? "UPDATE products SET name=?, description=?, quantity=?, price=?, color=?, discount=?, category=?, image_url=? WHERE id=?"
//         : "UPDATE products SET name=?, description=?, quantity=?, price=?, color=?, discount=?, category=? WHERE id=?";
  
//       const params = imageUrl
//         ? [name, description, quantity, price, color, discount, category, imageUrl, req.params.id]
//         : [name, description, quantity, price, color, discount, category, req.params.id];
  
//       const result = await db.query(updateQuery, params);
  
//       if (result[0].affectedRows === 0) return res.status(404).json({ message: "Product not found" });
  
//       res.json({ message: "Product updated successfully", image_url: imageUrl });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Delete product
//   exports.deleteProduct = async (req, res) => {
//     try {
//       const result = await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
//       if (result[0].affectedRows === 0) return res.status(404).json({ message: "Product not found" });
//       res.json({ message: "Product deleted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };




// const connection = require("../config/db");
// const Product = require('../models/Product');

// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.getAll();
//         res.json(products);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.getById(req.params.id);
//         if (!product) return res.status(404).json({ message: 'Product not found' });
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.createProduct = async (req, res) => {
//     try {
//         const id = await Product.create(req.body);
//         res.status(201).json({ id, message: 'Product created successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateProduct = async (req, res) => {
//     try {
//         await Product.update(req.params.id, req.body);
//         res.json({ message: 'Product updated successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deleteProduct = async (req, res) => {
//     try {
//         await Product.delete(req.params.id);
//         res.json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };





// import Product from "../models/Product.js";

// //  Get all products
// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.getAll();
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching products", error: error.message });
//     }
// };

// //  Get a single product by ID
// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.getById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching product", error: error.message });
//     }
// };

// //  Add a new product
// export const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         if (!name || !price || !stock || !category_id) {
//             return res.status(400).json({ message: "All required fields must be provided" });
//         }

//         const newProduct = await Product.create(name, description, price, stock, category_id);
//         res.status(201).json({ message: "Product added successfully", product: newProduct });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding product", error: error.message });
//     }
// };

// //  Update a product by ID
// export const updateProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         const { id } = req.params;

//         const success = await Product.update(id, name, description, price, stock, category_id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found or not updated" });
//         }

//         res.status(200).json({ message: "Product updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating product", error: error.message });
//     }
// };

// //  Delete a product by ID
// export const deleteProduct = async (req, res) => {
//     try {
//         const success = await Product.delete(req.params.id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting product", error: error.message });
//     }
// };






// import Product from "../models/Product.js";

// // Get all products
// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.getAll();
//         console.log("Response Products:", products); // Debugging
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: "Error fetching products", error: error.message });
//     }
// };

// // Get a single product by ID
// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.getById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         console.error("Error fetching product:", error);
//         res.status(500).json({ message: "Error fetching product", error: error.message });
//     }
// };

// // Add a new product
// export const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         if (!name || !price || !stock || !category_id) {
//             return res.status(400).json({ message: "All required fields must be provided" });
//         }

//         const newProduct = await Product.create(name, description, price, stock, category_id);
//         res.status(201).json({ message: "Product added successfully", product: newProduct });
//     } catch (error) {
//         console.error("Error adding product:", error);
//         res.status(500).json({ message: "Error adding product", error: error.message });
//     }
// };

// // Update a product by ID
// export const updateProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         const { id } = req.params;

//         const success = await Product.update(id, name, description, price, stock, category_id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found or not updated" });
//         }

//         res.status(200).json({ message: "Product updated successfully" });
//     } catch (error) {
//         console.error("Error updating product:", error);
//         res.status(500).json({ message: "Error updating product", error: error.message });
//     }
// };

// // Delete a product by ID
// export const deleteProduct = async (req, res) => {
//     try {
//         const success = await Product.delete(req.params.id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting product:", error);
//         res.status(500).json({ message: "Error deleting product", error: error.message });
//     }
// };




// import Product from "../models/Product.js";

// // Get all products
// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.getAll();
//         console.log("Response Products:", products); // Debugging
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: "Error fetching products", error: error.message });
//     }
// };

// // Get a single product by ID
// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.getById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         console.error("Error fetching product:", error);
//         res.status(500).json({ message: "Error fetching product", error: error.message });
//     }
// };

// // Add a new product
// export const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         if (!name || !price || !stock || !category_id) {
//             return res.status(400).json({ message: "All required fields must be provided" });
//         }

//         const newProduct = await Product.create(name, description, price, stock, category_id);
//         res.status(201).json({ message: "Product added successfully", product: newProduct });
//     } catch (error) {
//         console.error("Error adding product:", error);
//         res.status(500).json({ message: "Error adding product", error: error.message });
//     }
// };

// // Update a product by ID
// export const updateProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         const { id } = req.params;

//         const success = await Product.update(id, name, description, price, stock, category_id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found or not updated" });
//         }

//         res.status(200).json({ message: "Product updated successfully" });
//     } catch (error) {
//         console.error("Error updating product:", error);
//         res.status(500).json({ message: "Error updating product", error: error.message });
//     }
// };

// // Delete a product by ID
// export const deleteProduct = async (req, res) => {
//     try {
//         const success = await Product.delete(req.params.id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting product:", error);
//         res.status(500).json({ message: "Error deleting product", error: error.message });
//     }
// };










// import Product from "../models/Product.js";

// // Get all products
// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.getAll();
//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: "Error fetching products", error: error.message });
//     }
// };

// // Get a single product by ID
// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.getById(req.params.id);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(product);
//     } catch (error) {
//         console.error("Error fetching product:", error);
//         res.status(500).json({ message: "Error fetching product", error: error.message });
//     }
// };

// // Add a new product
// export const addProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         if (!name || !price || !stock || !category_id) {
//             return res.status(400).json({ message: "All required fields must be provided" });
//         }

//         const newProduct = await Product.create(name, description, price, stock, category_id);
//         res.status(201).json({ message: "Product added successfully", product: newProduct });
//     } catch (error) {
//         console.error("Error adding product:", error);
//         res.status(500).json({ message: "Error adding product", error: error.message });
//     }
// };

// // Update a product by ID
// export const updateProduct = async (req, res) => {
//     try {
//         const { name, description, price, stock, category_id } = req.body;
//         const { id } = req.params;

//         const success = await Product.update(id, name, description, price, stock, category_id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found or not updated" });
//         }

//         res.status(200).json({ message: "Product updated successfully" });
//     } catch (error) {
//         console.error("Error updating product:", error);
//         res.status(500).json({ message: "Error updating product", error: error.message });
//     }
// };

// // Delete a product by ID
// export const deleteProduct = async (req, res) => {
//     try {
//         const success = await Product.delete(req.params.id);
//         if (!success) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.status(200).json({ message: "Product deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting product:", error);
//         res.status(500).json({ message: "Error deleting product", error: error.message });
//     }
// };






// 















import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();

        if (!Array.isArray(products)) {
            throw new Error("Unexpected database response format"); // Error check
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

// Add a new product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;
        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        const newProduct = await Product.create(name, description, price, stock, category_id);
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;
        const { id } = req.params;

        const success = await Product.update(id, name, description, price, stock, category_id);
        if (!success) {
            return res.status(404).json({ message: "Product not found or not updated" });
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const success = await Product.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};
