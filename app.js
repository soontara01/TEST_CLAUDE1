const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// API routes
app.use('/api/items',    require('./routes/items'));
app.use('/api/products', require('./routes/products'));
app.use('/health',       require('./routes/health'));

// Serve Angular static files
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Catch-all: let Angular handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

module.exports = app;
