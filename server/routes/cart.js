const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Shipping = require('../models/shipping');
const verifyToken = require("../helpers/validateToken").verifyToken;


// wyswietlanie wysylki z bazy
router.get('/shipping', (req, res) => {
  Shipping.find((error, shipping) => {
    if (error) {
      res.status(500).send('Błąd serwera!');
    } else {
      res.json(shipping);
    }
  })
});

// dodawanie zamowien z koszyka przez userow 
router.post('/user-data', (req, res) => {
  const orderData = req.body;
  const order = new Order(orderData);
  order.save((error, registeredOrder) => {
    if ((req.body === null || undefined) || error) {
      res.status(400).send('Składanie zamówieia nie powiodło się!');
    } else {
      // return res.json({ msg: "Order has been submited.", order: order, success: true  });
      return res.json(order);
    }
  })
})

router.get('/user-orders/:id', verifyToken, (req, res) => { // szukanie zamowien po id usera
  Order.find({ "userData._id": req.params.id }, (error, order) => {
    if (!order || error) {
      res.status(404).send('Nie znaleziono!');
    } else {
      return res.json({ order });
    }
  })
})

module.exports = router;