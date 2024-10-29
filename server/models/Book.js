const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductType',
    default: null,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    default: null,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    default: null,
  },
  pubDate: {
    type: Date,
  },
  size: {
    type: String
  },
  weight: {
    type: Number
  },
  pageNumber: {
    type: Number
  },
  stockQuantity: {
    type: Number,
    default: 1
  },
  quantity: {
    type: Number,
    default: 1,
  },
  cost: {
    type: Number
  },
  price: {
    type: Number
  },
  format: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Format',
    default: null,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String
    }
  ],
  file: {
    type: String
  },
  isEbook: {
    type: Boolean,
  },
  translator: {
    type: String
  }
});

module.exports = mongoose.model('Book', BookSchema);
