const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const verifyToken = require("../../helpers/validateToken").verifyToken;

// wyswietlanie uzytkownikow z bazy w panelu admina 
router.get('/user', verifyToken, (req, res) => {
  User.find((error, user) => {
    if (error) {
      res.status(500).send('Błąd serwera!');
    } else {
      let returnedUser = user;
      for (var i = 0; i < user.length; i++) {
        returnedUser[i].password = undefined;
        // usuwanie hasla na kopi tablicy userow
      }
      res.json(returnedUser);
    }
  })
})

module.exports = router;