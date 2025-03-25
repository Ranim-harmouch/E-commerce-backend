import express from "express";
import upload from  "../middlewares/multer.js"; // Import multer configuration
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import db from "../config/db.js"; // Database connection

const router = express.Router();

// Image Upload Route
router.post("/upload/:productId", upload.single("image"), async (req, res) => {
  try {
    const { productId } = req.params;

    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    // Read the uploaded file
    const filePath = req.file.path;
    const formData = new FormData();
    formData.append("image", fs.createReadStream(filePath));

    // Upload to ImgBB
    const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
      headers: {
        ...formData.getHeaders(),
      },
      params: {
        key: process.env.IMGBB_API_KEY, // API Key from .env
      },
    });

    // Delete the temporary file after upload
    fs.unlinkSync(filePath);

    if (!response.data.success) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    // Get Image URL from ImgBB
    const imageUrl = response.data.data.url;

    // Save Image URL to MySQL Database
    await db.execute(
      "INSERT INTO images (url, product_id) VALUES (?, ?)",
      [imageUrl, productId]
    );

    res.status(201).json({
      message: "Image uploaded successfully",
      image: imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;