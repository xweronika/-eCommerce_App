const express = require('express');
const router = express.Router();
const Shipping = require('../../models/shipping');
const verifyToken = require("../../helpers/validateToken").verifyToken;

// dodawanie wysylki  w panelu admina 
router.post('/shipping', verifyToken, (req, res) => {
  const shippingData = req.body;
  const shipping = new Shipping(shippingData);
  shipping.save((error, registeredShipping) => {
    if ((req.body === null || undefined) || shippingData.eco === undefined || !shipping || error) {
      res.status(400).send('Dodawanie wysyłki nie powiodło się!');
    } else {
      return res.json(shipping);
    }
  })
})

// usuwanie wysylki z panelu admina
router.delete('/delete/:id', verifyToken, (req, res) => {
  Shipping.findOne({ _id: req.params.id }, (error, shipping) => {
    if (!req.params.id || !shipping || error) {
      res.status(400).send('Usuwanie wysyłki nie powiodło się!');
    } else {
      shipping.remove();
      return res.json(shipping);
    }
  })
})

// wyslwietlanie konkretnej wysylki szukajac po id w panelu admina
router.get('/shipping/:id', verifyToken, (req, res) => {
  Shipping.findById((req.params.id), (error, shipping) => {
    if (!shipping || error) {
      res.status(404).send('Nie znaleziono!');
    } else {
      return res.json(shipping);
    }
  })
})

// edycja wysylki przez admina
router.put('/edit/:id', verifyToken, (req, res) => {
  Shipping.findOne({ _id: req.params.id }, (error, shipping) => {
    if ( !req.body || !req.body.name || !req.body.price || req.body.eco === undefined || !shipping || error) {
      res.status(400).send('Edycja wysyłki nie powiodła się!');
    } else {
      shipping.name = req.body.name;
      shipping.price = req.body.price;
      shipping.time = req.body.time;
      shipping.adress = req.body.adress;
      shipping.eco = req.body.eco;
      shipping.save();
      return res.json(shipping);
    }
  })
})


module.exports = router;