const { Book } = require('../models');
const debug = process.env.NODE_ENV === 'dev';

createBook = (req, res) => {
  if (debug) console.log('createBook');

  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Book',
    })
  }

  const book = new Book();
  book.bookid = req.body.bookid;
  book.name = req.body.bookname;
  book.category = req.body.categories;


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
}

getBooks = (req, res) => {
  if (debug) console.log('getBooks');

  Book.find().exec(function (err, data) {
    if (err) console.log('err : ', err);

    res.send(data);
  });
}

getBookById = (req, res) => {
  if (debug) console.log('getBookById', req.params.id);

  Book.findOne({ bookid: req.params.id }).exec(function(err, data) {
    if (err) console.log('err : ', err);

    res.send(data);
  });
}

deleteBook = (req, res) => {
  if (debug) console.log('getBookById', req.params.id);

  Book.deleteOne({ bookid: req.params.id }).exec(function(err, data) {
    if (err) console.log('err : ', err);

    res.send(data);
  });
}

module.exports = { createBook, getBooks, getBookById, deleteBook };