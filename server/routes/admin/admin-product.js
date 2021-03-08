const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const verifyToken = require("../../helpers/validateToken").verifyToken;

// dodawanie produktow  w panelu admina 
router.post('/product', verifyToken, (req, res) => {
  const productData = req.body;
  const product = new Product(productData);
  product.save((error, registeredProduct) => {
    if ((req.body === null || undefined) || !product || error) {
      res.status(400).send('Dodawanie produktu nie powiodło się!');
    }
    else {
      res.json(product);
    }
  })
})

// usuwanie produktu z panelu admina
router.delete('/delete/:id', verifyToken, (req, res) => {
  Product.findOne({ _id: req.params.id }, (error, product) => {
    if (!req.params.id || !product || error) {
      res.status(400).send('Usuwanie produktu nie powiodło się!');
    } else {
      product.remove();
      res.json(product);
    }
  })
})


// edycja produktu przez admina
router.put('/edit/:id', verifyToken, (req, res) => {
  Product.findOne({ _id: req.params.id }, (error, product) => {
    if (
       !req.body.name
      || !req.body.price
      || !req.body.description
      || !req.body.size
      || !req.body.stand
      || !req.body.watering
      || !req.body.temperature
      || !req.body.vegetation
      || !req.body.cultivation
      || !req.body.categories
      || !req.body.quantity
      || !req.body.image
      || !req.body.image2
      || !req.body.image3
      || !product || error) {
      res.status(400).send('Edycja produktu nie powiodła się!');
    } else {
      product.name = req.body.name;
      product.price = req.body.price;
      product.description = req.body.description;
      product.size = req.body.size;
      product.stand = req.body.stand;
      product.watering = req.body.watering;
      product.temperature = req.body.temperature;
      product.vegetation = req.body.vegetation;
      product.cultivation = req.body.cultivation;
      product.categories = req.body.categories;
      product.quantity = req.body.quantity;
      product.image = req.body.image;
      product.image2 = req.body.image2;
      product.image3 = req.body.image3;
      product.save();
      return res.json(product);
    }
  })
})


module.exports = router;