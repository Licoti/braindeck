var express = require('express');
var router = express.Router();
const { User } = require('../server/database/models');
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res) {
  const user = new User();
  console.log(req.body, req.body.username, req.body.password);

  user.name = req.body.username;
  user.password = bcrypt.hashSync(req.body.password);

  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'User created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'User not created!',
      })
    });
});

module.exports = router;
