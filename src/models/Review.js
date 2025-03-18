// src/models/Review.js
import db from '../config/db.js';

const Review = {
  // Create a new review
  create: (reviewData, callback) => {
    const { review_description, rating, user_id, product_id } = reviewData;

    // Check for missing fields
    if (!review_description || !rating || !user_id || !product_id) {
      return callback(new Error("All fields are required"));
    }

    // Check if product_id exists before inserting
    const checkProductQuery = 'SELECT id FROM Products WHERE id = ?';
    db.query(checkProductQuery, [product_id], (err, productResult) => {
      if (err) return callback(err);

      if (productResult.length === 0) {
        return callback(new Error("Invalid product_id: Product does not exist"));
      }

      // Insert the review into the database
      const query = 'INSERT INTO Review (review_description, rating, user_id, product_id) VALUES (?, ?, ?, ?)';
      db.query(query, [review_description, rating, user_id, product_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      });
    });
  },

  // Get all reviews
  getAll: (callback) => {
    db.query('SELECT * FROM Review', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // Get a single review by ID
  getById: (id, callback) => {
    db.query('SELECT * FROM Review WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(new Error("Review not found"));
      callback(null, results[0]);
    });
  },

  // Update a review
  update: (id, reviewData, callback) => {
    const { review_description, rating } = reviewData;

    if (!review_description || !rating) {
      return callback(new Error("Review description and rating are required"));
    }

    db.query(
      'UPDATE Review SET review_description = ?, rating = ? WHERE id = ?',
      [review_description, rating, id],
      (err, result) => {
        if (err) return callback(err);
        if (result.affectedRows === 0) return callback(new Error("Review not found"));
        callback(null, result);
      }
    );
  },

  // Delete a review
  delete: (id, callback) => {
    db.query('DELETE FROM Review WHERE id = ?', [id], (err, result) => {
      if (err) return callback(err);
      if (result.affectedRows === 0) return callback(new Error("Review not found"));
      callback(null, result);
    });
  }
};

export default Review;
