const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  key:         { type: String, required: true, unique: true },
  name:        String,
  description: String,
  price:       Number,
  category:    String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
