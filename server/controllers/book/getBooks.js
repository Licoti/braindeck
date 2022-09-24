const { Book } = require('../../models');
const debug = process.env.NODE_ENV === 'dev';

async function _getBooks (req, res) {
  if (debug) console.log('_getBooks');

  try {
    await Book.find().exec(function (err, data) {
      if (err) console.log('err : ', err);

      res.send(data);
    });
  } catch {
    console.log(err)
  }
}

module.exports = _getBooks;