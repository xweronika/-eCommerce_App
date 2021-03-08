const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const encryption = require("../helpers/encryption").encryption;

router.post('/register', (req, res) => { // rejestracja
  const userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      res.status(401).send('Proszę wpisać poprawne informacje!');
    }
    // zabezpieczenie przed pustym polem i wartoscia niezidefiniowana
    else if ((userData.email && userData.firstname &&
      userData.surname && userData.password && userData.confirm_password) === null) {
      res.status(401).send('Proszę uzupełnić wszystkie pola!');
    } else if ((userData.email && userData.firstname &&
      userData.surname && userData.password && userData.confirm_password) === undefined) {
      res.status(401).send('Proszę uzupełnić wszystkie pola!');
    }
    // zabezpieczenie przed pustym polem
    else if ((userData.email.length && userData.firstname.length &&
      userData.surname.length && userData.password.length && userData.confirm_password.length) === 0) {
      res.status(401).send('Proszę uzupełnić wszystkie pola!');
    } else {
      if (user) { // spr czy konto o takim mailu juz istnieje 
        res.status(401).send('Konto o podanym adresie email już istnieje!');
      } else if (userData.firstname.length < 3 && userData.surname.length < 3) {
        res.status(401).send('Imię i nazwisko musi zawierac co najmniej 3 znaki!');
      }
      // spr czy haslo i jego potwierdzenie sie zgadzaja
      else if (userData.password !== userData.confirm_password) {
        res.status(401).send('Podane hasła nie są takie same!');
      } else if (userData.password.length < 6) {
        res.status(401).send('Hasło musi zawierac co najmniej 6 znaków!');
      }
      else {
        // szyfrowanie hasla przez funkcje z helepers
        const encrypted = encryption(userData);

        const user = new User({
          firstname: userData.firstname,
          email: userData.email,
          surname: userData.surname,
          address: userData.address,
          postcode: userData.postcode,
          city: userData.city,
          country: userData.country,
          phone: userData.phone,
          password: encrypted
        });
        user.save((error, registeredUser) => {
          if (error) {
            res.status(401).send('Proszę wpisać poprawne informacje!')
          } else {
            const firstname = user.firstname;
            _id = user._id;
            surname = user.surname;
            email = user.email;
            address = user.address;
            postcode = user.postcode;
            city = user.city;
            country = user.country;
            phone = user.phone;
            payload = { subject: registeredUser._id };
            token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token, firstname, surname, email, _id, address, postcode, city, country, phone });
          }
        })
      }
    }
  })
})

router.post('/login', (req, res) => { // logowanie
  const userData = req.body;

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      res.status(401).send('Błąd logowania!');
    }
    // zabezpieczenie przed pustym polem i wartoscia niezidefiniowana
    else if ((userData.email && userData.password) === null) {
      res.status(401).send('Proszę uzupełnić wszystkie pola!');
    }
    else if ((userData.email && userData.password) === undefined) {
      res.status(401).send('Proszę uzupełnić wszystkie pola!');
    }
    // zabezpieczenie przed pustym polem
    else if ((userData.email.length && userData.password.length) === 0) {
      res.status(401).send('Proszę uzupełnić wszystkie pola!');
    }
    else {
      if (!user) {
        res.status(401).send('Nieprawidłowy email lub hasło!');
      } else {
        // szyfrowanie hasla zeby zaalogowac przez funkcje z helepers
        const encrypted = encryption(userData);

        if (user.password !== encrypted) {
          res.status(401).send('Nieprawidłowy email lub hasło!');
        } else {
          const admin = user.isAdmin ? true : false;
          _id = user._id;
          firstname = user.firstname;
          email = user.email;
          surname = user.surname;
          address = user.address;
          postcode = user.postcode;
          city = user.city;
          country = user.country;
          phone = user.phone;
          payload = { subject: user._id };
          token = jwt.sign(payload, 'secretKey');
          res.status(200).send({ token, admin, firstname, surname, email, _id, address, postcode, city, country, phone });
        }
      }
    }
  })
})
module.exports = router;