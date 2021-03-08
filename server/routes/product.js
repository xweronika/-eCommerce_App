const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// wyswietlanie produktow z bazy
router.get('/product', (req, res) => {
  Product.find((error, product) => {
    if (error) {
      res.status(500).send('Błąd serwera!');
    } else {
      res.json(product);
    }
  })
})

// wyslwietlanie konkretnego produktu szukajac po id
router.get('/product/:id', (req, res) => {
  Product.findById((req.params.id), (error, product) => {
    if (!product || error) {
      res.status(404).send('Nie znaleziono!');
    } else {
      return res.json(product);
    }
  })
})

// wyslwietlanie konkretnego produktu szukajac po kategorii
router.get('/product/find/:category', (req, res) => { // szukanie zamowien po id usera
  Product.find({ categories: req.params.category }, (error, product) => {
    if (!product || error) {
      res.status(404).send('Nie znaleziono!');
    } else {
      return res.json(product);
    }
  })
})

module.exports = router;