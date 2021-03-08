const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const verifyToken = require("../../helpers/validateToken").verifyToken;

// wyswietlanie zamowien w panelu admina 
router.get('/order', verifyToken, (req, res) => {
  Order.find((error, order) => {
    if (error) {
      res.status(500).send('Błąd serwera!');
    } else {
      res.json(order);
    }
  })
})

// wyslwietlanie konkretnego zamowienia u admina szukajac po id
router.get('/order/:id', verifyToken, (req, res) => {
  Order.findById((req.params.id), (error, order) => {
    if (!order || error) {
      res.status(404).send('Nie znaleziono!');
    } else {
      return res.json(order);
    }
  })
})

// usuwanie zamowien w panelu admina
router.delete('/delete/:id', verifyToken, (req, res) => {
  Order.findOne({ _id: req.params.id }, (error, order) => {
    if (!order || error) {
      res.status(400).send('Usuwanie zamówienia nie powiodło się!');
    }
    else {
      order.remove();
      return res.json(order);
    }
  })
})

// zmiana statusu zamowienia w panelu admina
router.put('/edit/:id', (req, res) => {
  Order.findOne({ _id: req.params.id }, (error, order) => {
    if ((req.body === null || undefined) || !order || error) {
      res.status(401).send('Zmiana statusu nie powiodła się!');
    } else {
      order.status = req.body.status;
      order.save();
      return res.json(order);
    }
  })
})

module.exports = router;