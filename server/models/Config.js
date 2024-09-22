const mongoose = require('mongoose');

const ConFigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10,15}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  facebook: {
    type: String
  },
  zalo: {
    type: String
  },
  primaryColor: {
    type: String,
    default: '#ffffff'  
  },
  secondaryColor: {
    type: String,
    default: '#000000'  
  },
  accentColor: {
    type: String,
    default: '#000000'  
  },
  neutralColor: {
    type: String,
    default: '#000000'  
  },
  primaryBackground: {
    type: String,
    default: '#ffffff'  
  },
  secondaryBackground: {
    type: String,
    default: '#000000'  
  },
  accentBackground: {
    type: String,
    default: '#000000'  
  },
  neutralBackground: {
    type: String,
    default: '#000000'  
  },
  poster: {
    type: String,
  },
  slogan: {
    type: String,
  },
  images: [
    {
      type: String
    }
  ],
  description: {
    type: String,
  },
  address: {
    type: String,
  }
});

module.exports = mongoose.model('Config', ConFigSchema);
