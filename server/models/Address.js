const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    addressDetail: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Address', AddressSchema);