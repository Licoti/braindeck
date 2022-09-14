const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
