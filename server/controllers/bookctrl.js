const { Book } = require('../models');
const json = require('../../dist/manifest.json');
const indexJSFile = json['index.js'];
const appCSSFile = json['app.css'];

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

    res.send(data);
  });
}

indexBook = (req, res) => {
  if (debug) console.log('getBooks');

  res.render('index', {
    title: 'Mes livres',
    appJSFile: indexJSFile,
    appCSSFile: appCSSFile,
  });
}

module.exports = { getBooks, createBook, indexBook };