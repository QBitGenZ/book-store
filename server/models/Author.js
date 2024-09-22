const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  birthday: {
    type: Date
  },
  nationality: {
    type: String
  },
  biography: {
    type: String
  },
  avatar: {
    type: String
  },
});

module.exports = mongoose.model('Author', AuthorSchema);
