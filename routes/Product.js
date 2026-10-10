const router = require('express').Router();
const Product = require('../models/Product');

// Add a Product (Create)
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category
    });
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Products (Read)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;