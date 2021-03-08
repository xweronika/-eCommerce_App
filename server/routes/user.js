const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require("../helpers/validateToken").verifyToken;


// usuwanie uzytkownikow z panelu admina
// i usuwanie swojego konta przez usera
router.delete('/delete/:id', verifyToken, (req, res) => {
  User.findOne({ _id: req.params.id }, (error, user) => {
    if ((req.body === null || undefined) || !user || error) {
      res.status(400).send('Usuwanie nie powiodło się!');
    } else {
      user.remove();
      let userCopy = user;
      userCopy.password = undefined;
      return res.json(userCopy);
    }
  })
})
// wyslwietlanie konkretnego uzytkownika u admina szukajac po id
// i u usera w zakladce moje konto
router.get('/user/:id', verifyToken, (req, res) => {
  User.findById((req.params.id), (error, user) => {
    if (!user || error) {
      res.status(404).send('Nie znaleziono!');
    }
    else {
      let userCopy = user;
      userCopy.password = undefined;
      return res.json(userCopy);
    }
  })
})

// edycja uzykownika przez admina
// i edycja swojego konta przez usera
router.put('/edit/:id', verifyToken, (req, res) => {
  User.findOne({ _id: req.params.id }, (error, user) => {
    if ((req.body === null || undefined)
      || !req.body.firstname
      || req.body.firstname.length < 3
      || !req.body.surname
      || req.body.surname.length < 3
      || !req.body.email
      || !user || error) {
      res.status(400).send('Edycja konta nie powiodła się!');
    } else {
      user.firstname = req.body.firstname;
      user.surname = req.body.surname;
      user.email = req.body.email;
      user.address = req.body.address;
      user.postcode = req.body.postcode;
      user.city = req.body.city;
      user.country = req.body.country;
      user.phone = req.body.phone;
      user.save();
      let userCopy = user;
      userCopy.password = undefined;
      return res.json(userCopy);
    }
  })
})

module.exports = router;