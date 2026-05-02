const express = require('express');
const router = express.Router();
const items = require('../data/items');

router.get('/', (req, res) => {
  res.json({ success: true, data: items });
});

router.get('/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.json({ success: true, data: item });
});

module.exports = router;
