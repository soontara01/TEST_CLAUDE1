const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  const { key } = req.query;
  if (!key) {
    return res.status(400).json({ success: false, message: 'Query param "key" is required' });
  }
  try {
    const product = await Product.findOne({ key }).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: `Product with key "${key}" not found` });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Database error', error: err.message });
  }
});

module.exports = router;
