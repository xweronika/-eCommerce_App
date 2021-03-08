const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        // walidajca emaila
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
    },
    password: {
        type: Object,
       // required: true,
      //  maxlength: 50,
        // walidajca hasla
      //  match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/
        // Hasło musi zawierac co najmniej jedną literę mala, 
        // jedna duza, jedna cyfre i być dłuższe niż sześć znakow
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    postcode: String,
    city: String,
    address: String,
    country: String,
    phone: String,
});

module.exports = mongoose.model('user', userSchema, 'users');