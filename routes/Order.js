const router = require('express').Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const verifyToken = require('../middleware/auth');

// Create Order (Checkout)
router.post('/add', verifyToken, async (req, res) => {
  const { address } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total or map products (simplified version)
    let products = cart.items;
    
    // For simplicity, let's assume totalAmount is passed or calculated
    const { totalAmount } = req.body;

    const newOrder = new Order({
      userId: req.user._id,
      products,
      totalAmount: totalAmount || 0,
      address
    });

    const savedOrder = await newOrder.save();
    
    // Clear cart after order
    await Cart.findOneAndDelete({ userId: req.user._id });

    res.status(201).json({ message: 'Order placed successfully!', savedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User Orders
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;