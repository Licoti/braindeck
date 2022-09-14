var express = require('express');
var router = express.Router();
const { Book } = require('../server/database/models');

router.post('/book', function (req, res) {
  const book = new Book();
  const body = req.body;

  console.log(req.body, req.body.bookname);

  book.name = req.body.bookname;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Book',
    })
  }

  book
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        message: 'Book created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Book not created!',
      })
    });
});

router.get('/books', function (req, res) {
  Book.find().exec(function (err, data) {

    res.send(data);
  });
});



module.exports = router;
