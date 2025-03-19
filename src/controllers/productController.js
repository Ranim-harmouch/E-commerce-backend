

import Product from "../models/Product.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();

        if (!Array.isArray(products)) {
            throw new Error("Unexpected database response format"); // Error check
        }

        res.status(200).json({
            data: products,
            message: "Products retrieved successfully",
            error: null
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({
            data: null,
            message: "Failed to retrieve products",
            error: error.message
        });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching product with ID:", id); 
        
        const product = await Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({
                data: null,
                message: "Product not found",
                error: null
            });
        }
        res.status(200).json({
            data: product,
            message: "Product retrieved successfully",
            error: null
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            data: null,
            message: "Error fetching product",
            error: error.message
        });
    }
};

// Add a new product
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;
        if (!name || !price || !stock || !category_id) {
            return res.status(400).json({
                data: null,
                message: "All required fields must be provided",
                error: null
            });
        }

        const newProduct = await Product.create(name, description, price, stock, category_id);
        res.status(201).json({
            data: newProduct,
            message: "Product added successfully",
            error: null
        });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            data: null,
            message: "Error adding product",
            error: error.message
        });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id } = req.body;
        const { id } = req.params;

        const success = await Product.update(id, name, description, price, stock, category_id);
        if (!success) {
            return res.status(404).json({
                data: null,
                message: "Product not found or not updated",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Product updated successfully",
            error: null
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({
            data: null,
            message: "Error updating product",
            error: error.message
        });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const success = await Product.delete(req.params.id);
        if (!success) {
            return res.status(404).json({
                data: null,
                message: "Product not found",
                error: null
            });
        }

        res.status(200).json({
            data: null,
            message: "Product deleted successfully",
            error: null
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({
            data: null,
            message: "Error deleting product",
            error: error.message
        });
    }
};
