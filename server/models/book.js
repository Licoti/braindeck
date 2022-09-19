const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookid: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: Array
  },
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
