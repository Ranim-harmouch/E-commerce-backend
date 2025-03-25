import Review from '../models/Review.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const result = await Review.create(req.body); // Await the promise returned by the create method
    res.status(201).json({
      data: { reviewId: result.insertId },
      message: 'Review created successfully!',
      error: null
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: 'Error creating review',
      error: err.message || 'Unknown error'
    });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const results = await Review.getAll(); // Await the promise returned by the getAll method
    res.status(200).json({
      data: results,
      message: 'Reviews retrieved successfully',
      error: null
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: 'Error fetching reviews',
      error: err.message || 'Unknown error'
    });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Review.getById(id); // Await the promise returned by the getById method
    if (result.length === 0) {
      return res.status(404).json({
        data: null,
        message: 'Review not found',
        error: 'No review with that ID exists'
      });
    }
    res.status(200).json({
      data: result[0],
      message: 'Review retrieved successfully',
      error: null
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: 'Error fetching review',
      error: err.message || 'Unknown error'
    });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Review.update(id, req.body); // Await the promise returned by the update method
    if (result.affectedRows === 0) {
      return res.status(404).json({
        data: null,
        message: 'Review not found',
        error: 'No review with that ID exists'
      });
    }
    res.status(200).json({
      data: null,
      message: 'Review updated successfully!',
      error: null
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: 'Error updating review',
      error: err.message || 'Unknown error'
    });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Review.delete(id); // Await the promise returned by the delete method
    if (result.affectedRows === 0) {
      return res.status(404).json({
        data: null,
        message: 'Review not found',
        error: 'No review with that ID exists'
      });
    }
    res.status(200).json({
      data: null,
      message: 'Review deleted successfully!',
      error: null
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: 'Error deleting review',
      error: err.message || 'Unknown error'
    });
  }
};
