
import axios from "axios";
import multer from "multer";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single("image");

// Upload image to ImgBB using callbacks
const uploadImageToImgBB = (file, callback) => {
    const apiKey = "071dba246e9cfff043b604ae182ffaf8";
    const formData = new FormData();
    formData.append("image", file.buffer.toString("base64"));

    axios
        .post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            callback(null, response.data.data.url);
        })
        .catch((error) => {
            callback(new Error("Image upload failed"), null);
        });
};

// Get all products
export const getAllProducts = (req, res) => {
    Product.getAll((error, products) => {
        if (error) {
            console.error("Error fetching products:", error);
            return res.status(500).json({
                data: null,
                message: "Failed to retrieve products",
                error: error.message,
            });
        }

        res.status(200).json({
            data: products,
            message: "Products retrieved successfully",
            error: null,
        });
    });
};

// Get a single product by ID
export const getProductById = (req, res) => {
    const { id } = req.params;

    Product.getById(id, (error, product) => {
        if (error) {
            console.error("Error fetching product:", error);
            return res.status(500).json({
                data: null,
                message: "Error fetching product",
                error: error.message,
            });
        }

        if (!product) {
            return res.status(404).json({
                data: null,
                message: "Product not found",
                error: null,
            });
        }

        res.status(200).json({
            data: product,
            message: "Product retrieved successfully",
            error: null,
        });
    });
};

// Add a new product
export const addProduct = (req, res) => {
    const { name, description, price, quantity, color, discount, category_id } = req.body;
    if (!name || !price || !quantity|| !color|| !discount || !category_id) {
        return res.status(400).json({
            data: null,
            message: "All required fields must be provided",
            error: null,
        });
    }

    let imageUrl = null;
    if (req.file) {
        uploadImageToImgBB(req.file, (uploadError, url) => {
            if (uploadError) {
                return res.status(500).json({
                    data: null,
                    message: "Error uploading image",
                    error: uploadError.message,
                });
            }
            imageUrl = url;

            Product.create(name, description, price, quantity, color, discount, category_id, imageUrl, (error, newProduct) => {
                if (error) {
                    console.error("Error adding product:", error);
                    return res.status(500).json({
                        data: null,
                        message: "Error adding product",
                        error: error.message,
                    });
                }

                res.status(201).json({
                    data: newProduct,
                    message: "Product added successfully",
                    error: null,
                });
            });
        });
    } else {
        Product.create(name, description, price, quantity, color, discount, category_id, imageUrl, (error, newProduct) => {
            if (error) {
                console.error("Error adding product:", error);
                return res.status(500).json({
                    data: null,
                    message: "Error adding product",
                    error: error.message,
                });
            }

            res.status(201).json({
                data: newProduct,
                message: "Product added successfully",
                error: null,
            });
        });
    }
};

// Update a product by ID
export const updateProduct = (req, res) => {
    const { name, description, price, quantity, color, discount, category_id } = req.body;
    const { id } = req.params;

    Product.update(id, name, description, price, quantity, color, discount, category_id, (error, success) => {
        if (error) {
            console.error("Error updating product:", error);
            return res.status(500).json({
                data: null,
                message: "Error updating product",
                error: error.message,
            });
        }

        if (!success) {
            return res.status(404).json({
                data: null,
                message: "Product not found or not updated",
                error: null,
            });
        }

        res.status(200).json({
            data: null,
            message: "Product updated successfully",
            error: null,
        });
    });
};

// Delete a product by ID
export const deleteProduct = (req, res) => {
    Product.delete(req.params.id, (error, success) => {
        if (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({
                data: null,
                message: "Error deleting product",
                error: error.message,
            });
        }

        if (!success) {
            return res.status(404).json({
                data: null,
                message: "Product not found",
                error: null,
            });
        }

        res.status(200).json({
            data: null,
            message: "Product deleted successfully",
            error: null,
        });
    });
};
