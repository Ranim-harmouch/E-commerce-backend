// src/models/Review.js
import db from '../config/db.js';

const Review = {
  // Create a new review
  create: async (reviewData) => {
    const { review_description, rating, user_id, product_id } = reviewData;

    // Check for missing fields
    if (!review_description || !rating || !user_id || !product_id) {
      throw new Error("All fields are required");
    }

    // Check if product_id exists before inserting
    const checkProductQuery = 'SELECT id FROM Products WHERE id = ?';
    try {
      const [productResult] = await db.promise().query(checkProductQuery, [product_id]);

      if (productResult.length === 0) {
        throw new Error("Invalid product_id: Product does not exist");
      }

      // Insert the review into the database
      const query = 'INSERT INTO Review (review_description, rating, user_id, product_id) VALUES (?, ?, ?, ?)';
      const [result] = await db.promise().query(query, [review_description, rating, user_id, product_id]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  // Get all reviews
  getAll: async () => {
    try {
      const [results] = await db.promise().query('SELECT * FROM Review');
      return results;
    } catch (err) {
      throw err;
    }
  },

  // Get a single review by ID
  getById: async (id) => {
    try {
      const [results] = await db.promise().query('SELECT * FROM Review WHERE id = ?', [id]);
      if (results.length === 0) {
        throw new Error("Review not found");
      }
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  // Update a review
  update: async (id, reviewData) => {
    const { review_description, rating } = reviewData;

    if (!review_description || !rating) {
      throw new Error("Review description and rating are required");
    }

    try {
      const [result] = await db.promise().query(
        'UPDATE Review SET review_description = ?, rating = ? WHERE id = ?',
        [review_description, rating, id]
      );
      if (result.affectedRows === 0) {
        throw new Error("Review not found");
      }
      return result;
    } catch (err) {
      throw err;
    }
  },

  // Delete a review
  delete: async (id) => {
    try {
      const [result] = await db.promise().query('DELETE FROM Review WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        throw new Error("Review not found");
      }
      return result;
    } catch (err) {
      throw err;
    }
  }
};

export default Review;
