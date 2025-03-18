import Review from '../models/Review.js';

// Create a new review
export const createReview = (req, res) => {
  Review.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Review created successfully!', reviewId: result.insertId });
  });
};

// Get all reviews
export const getAllReviews = (req, res) => {
  Review.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// Get a single review by ID
export const getReviewById = (req, res) => {
  const { id } = req.params;
  Review.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(result[0]);
  });
};

// Update a review
export const updateReview = (req, res) => {
  const { id } = req.params;
  Review.update(id, req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Review updated successfully!' });
  });
};

// Delete a review
export const deleteReview = (req, res) => {
  const { id } = req.params;
  Review.delete(id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Review deleted successfully!' });
  });
};
