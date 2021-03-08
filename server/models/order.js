const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userData: {
        _id: String,
        firstname: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        postcode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    items: {
        type: Object,
        // required: true
    },
    shipping: {
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true,
        },
    },
    sum: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: 'order_placed'
    }
});

module.exports = mongoose.model('order', orderSchema, 'orders');