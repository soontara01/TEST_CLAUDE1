const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Example data
const items = [
  { id: 1, name: 'Item One', description: 'First item' },
  { id: 2, name: 'Item Two', description: 'Second item' },
  { id: 3, name: 'Item Three', description: 'Third item' },
];

// GET /api/items - return all items
app.get('/api/items', (req, res) => {
  res.json({ success: true, data: items });
});

// GET /api/items/:id - return single item by id
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  res.json({ success: true, data: item });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
