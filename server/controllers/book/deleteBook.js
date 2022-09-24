const { Book } = require('../../models');
const debug = process.env.NODE_ENV === 'dev';

async function _deleteBook (req, res) {
  if (debug) console.log('_deleteBook');

  try {
    await Book.findOneAndDelete({ bookid: req.params.id }).exec(function(err, data) {
      if (err) {
        return res.status(400).json({ success: false, error: err })
      }

      if (!Book) {
        return res
          .status(404)
          .json({ success: false, error: `Book not found` })
      }

      return res.status(200).json({ success: true, data: Book })

      res.send(data);
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = _deleteBook;