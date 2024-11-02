import express from 'express';
import Category from '../models/Category.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a new category
router.post('/', auth, async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName) {
      return res.status(400).send({ error: 'Category name is required' });
    }
    const category = new Category({ categoryName, categoryDescription });
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all categories
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a category by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a category by ID
router.put('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['categoryName', 'categoryDescription'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }

    updates.forEach((update) => (category[update] = req.body[update]));
    await category.save();
    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a category by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ error: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;