const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    checked: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [CartItemSchema],
})

module.exports = mongoose.model('Cart', CartSchema)