import Review from '../models/Review.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const result = await Review.create(req.body); // Await the promise returned by the create method
    res.status(201).json({ message: 'Review created successfully!', reviewId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const results = await Review.getAll(); // Await the promise returned by the getAll method
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Review.getById(id); // Await the promise returned by the getById method
    if (result.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a review
export const updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    await Review.update(id, req.body); // Await the promise returned by the update method
    res.status(200).json({ message: 'Review updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await Review.delete(id); // Await the promise returned by the delete method
    res.status(200).json({ message: 'Review deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
