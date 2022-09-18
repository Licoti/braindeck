const { Book } = require('../models');
const debug = process.env.NODE_ENV === 'dev';

async function _createBook (req, res) {
  if (debug) console.log('Initialisation de la Home Page', page);

  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Book',
    })
  }

  const book = new Book();

  book.name = req.body.bookname;

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

module.exports = _createBook;
