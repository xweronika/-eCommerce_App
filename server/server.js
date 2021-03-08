const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');

const PORT = config.get("http.port");
const api = require('./routes/api');
const authentication = require('./routes/authentication');
const user = require('./routes/user');
const cart = require('./routes/cart');
const product = require('./routes/product');
const special = require('./routes/special');
const adminOrder = require('./routes/admin/admin-order');
const adminShipping = require('./routes/admin/admin-shipping');
const adminProduct = require('./routes/admin/admin-product');
const adminUser = require('./routes/admin/admin-user');


const  mongoose = require('mongoose');
const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/api', api);
app.use('/api/auth', authentication);
app.use('/api/special', special);
app.use('/api/product', product);
app.use('/api/cart', cart);
app.use('/api/user', user);
app.use('/api/admin-order', adminOrder);
app.use('/api/admin-shipping', adminShipping);
app.use('/api/admin-product', adminProduct);
app.use('/api/admin-user', adminUser);


app.get('/', function (req, res) {
    res.send('Hello from server!')
});
 
const db = config.get("mongodb.connectionString");
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongodb!'))
  .catch(err => {
    console.log(Error, err.message);
  });


app.listen(PORT, function () {
    console.log('Server running on localhost:' + PORT);
});