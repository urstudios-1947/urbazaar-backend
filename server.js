const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/Product');
const cartRoute = require('./routes/Cart');
const orderRoute = require('./routes/Order');

// Use Routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);

// Database Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
    app.listen(5000, () => console.log("Server is running on port 5000"));
  })
  .catch((err) => console.log("DB Connection Error:", err));