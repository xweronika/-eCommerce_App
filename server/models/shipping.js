const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shippingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    time: {
        type: String
    },
    adress: {
        type: String
    },
    eco: {
        type: Boolean
    },

});

module.exports = mongoose.model('shipping', shippingSchema, 'shippings');