const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String
  },
  address: {
    type: String
  },
  website: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  establishedDate: {
    type: Date
  }
});

module.exports = mongoose.model('Publisher', PublisherSchema);
