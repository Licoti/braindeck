const { Book } = require('../../models');
const debug = process.env.NODE_ENV === 'dev';

async function _deleteBook(req, res) {
  if (debug) console.log('_deleteBook');

  try {
    const book = await Book.findOneAndDelete({ bookid: req.params.id }).exec();

    if (!book) {
      return res.status(404).json({ success: false, error: `Book not found` });
    }

    return res.status(200).json({ success: true, data: book });
  } catch (err) {
    console.error('Une erreur s\'est produite lors de la suppression du livre : ', err);
    return res.status(400).json({ success: false, error: err.message });
  }
}

module.exports = _deleteBook;