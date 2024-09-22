const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true
  },
  donateBooks: [
    {
      donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        required: true
      },
      donationDate: {
        type: Date,
        default: Date.now
      },
      isSuccess: {
        type: Boolean,
        default: false,
        require: true
      }
    }
  ]
});

module.exports = mongoose.model('Event', EventSchema);
