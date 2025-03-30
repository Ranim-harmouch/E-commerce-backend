

import axios from "axios";
import multer from "multer";
import Product from "../models/Product.js";
import dotenv from "dotenv";
import FormData from "form-data";

dotenv.config();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single("image");

// Upload image to ImgBB
const uploadImageToImgBB = (file, callback) => {
    const apiKey = process.env.IMGBB_API_KEY; // Secure API key
    const formData = new FormData();
    formData.append("image", file.buffer.toString("base64"));

    axios
        .post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            console.log("ImgBB Response:", response.data); // Debugging
            callback(null, response.data.data.url);
        })
        .catch((error) => {
            console.error("ImgBB Upload Error:", error.response?.data || error.message);
            callback(new Error("Image upload failed"), null);
        });
};

// Get all products
export const getAllProducts = (req, res) => {
    Product.getAll((error, products) => {
        if (error) {
            return res.status(500).json({ data: null, message: "Failed to retrieve products", error: error.message });
        }
        res.status(200).json({ data: products, message: "Products retrieved successfully", error: null });
    });
};

// Get a single product by ID
export const getProductById = (req, res) => {
    const productId = parseInt(req.params.id, 10);
    Product.getById(productId, (error, product) => {
        if (error) {
            return res.status(500).json({ data: null, message: "Error fetching product", error: error.message });
        }
        if (!product) {
            return res.status(404).json({ data: null, message: "Product not found", error: null });
        }
        res.status(200).json({ data: product, message: "Product retrieved successfully", error: null });
    });
};

// Add a new product
export const addProduct = (req, res) => {
    const { name, brandId, description, quantity, price, color, discount, isNew, category } = req.body;

    if (!name || !brandId || !price || !quantity || !color || discount === undefined || isNew === undefined || !category) {
        return res.status(400).json({ data: null, message: "All required fields must be provided", error: null });
    }

    Product.create(name, brandId, description, quantity, price, color, discount, isNew, category, (error, newProduct) => {
        if (error) {
            return res.status(500).json({ data: null, message: "Error adding product", error: error.message });
        }

        if (req.file) {
            uploadImageToImgBB(req.file, (uploadError, imageUrl) => {
                if (uploadError) {
                    return res.status(500).json({ data: null, message: "Error uploading image", error: uploadError.message });
                }

                Product.saveImage(newProduct.id, imageUrl, (imgError) => {
                    if (imgError) {
                        return res.status(500).json({ data: null, message: "Error saving image", error: imgError.message });
                    }
                    res.status(201).json({ data: newProduct, message: "Product added successfully", error: null });
                });
            });
        } else {
            res.status(201).json({ data: newProduct, message: "Product added successfully", error: null });
        }
    });
};
  // delete
export const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id, 10);

    Product.delete(productId, (error, success) => {
        if (error) {
            return res.status(500).json({ data: null, message: "Error deleting product", error: error.message });
        }
        if (!success) {
            return res.status(404).json({ data: null, message: "Product not found", error: null });
        }
        res.status(200).json({ data: null, message: "Product deleted successfully", error: null });
    });
};


//update
export const updateProduct = (req, res) => {
    const { name, brandId, description, quantity, price, color, discount, isNew, category } = req.body;
    const productId = parseInt(req.params.id, 10);

    Product.update(productId, name, brandId, description, quantity, price, color, discount, isNew, category, (error, success) => {
        if (error) {
            return res.status(500).json({ data: null, message: "Error updating product", error: error.message });
        }
        if (!success) {
            return res.status(404).json({ data: null, message: "Product not found or not updated", error: null });
        }

        // If an image is uploaded, update the image as well
        if (req.file) {
            uploadImageToImgBB(req.file, (uploadError, imageUrl) => {
                if (uploadError) {
                    return res.status(500).json({ data: null, message: "Error uploading image", error: uploadError.message });
                }

                Product.saveImage(productId, imageUrl, (imgError) => {
                    if (imgError) {
                        return res.status(500).json({ data: null, message: "Error updating image", error: imgError.message });
                    }
                    res.status(200).json({ data: null, message: "Product and image updated successfully", error: null });
                });
            });
        } else {
            res.status(200).json({ data: null, message: "Product updated successfully", error: null });
        }
    });
};



