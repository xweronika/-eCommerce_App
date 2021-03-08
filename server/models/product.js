const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    stand: {            // stanowisko
        type: String,
        required: true
    },
    watering: {         // podlewanie
        type: String,
        required: true
    },
    temperature: {     // temperatura min
        type: String,
        required: true
    },
    vegetation: {      // okres wegetacji
        type: Number,
        required: true
    },
    cultivation: {     // uprawa
        type: String,
        required: true
    },
    quantity: {        // ilosc
        type: String,
        required: true,
        default: 'large'
    },

    // _______________________Kategorie___________________________________

    categories: [],


});




module.exports = mongoose.model('product', productSchema, 'products');