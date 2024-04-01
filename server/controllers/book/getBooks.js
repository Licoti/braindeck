const { Book } = require('../../models');
const debug = process.env.NODE_ENV === 'dev';

async function _getBooks (req, res) {
  if (debug) console.log('_getBooks');

  try {
    const data = await Book.find().exec();
    res.send(data);
  } catch (err) {
    console.error('Erreur lors de la récupération des livres : ', err);
    res.status(500).send('Une erreur est survenue lors de la récupération des livres');
  }
}

module.exports = _getBooks;