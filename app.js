const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/items',    require('./routes/items'));
app.use('/api/products', require('./routes/products'));
app.use('/health',       require('./routes/health'));

module.exports = app;
