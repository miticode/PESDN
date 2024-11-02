import express from 'express';
import Product from '../models/Product.js';


const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;