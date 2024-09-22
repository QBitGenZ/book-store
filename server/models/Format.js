const mongoose = require('mongoose')

const FormatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
})

module.exports = mongoose.model('Format', FormatSchema)