const express = require('express');

const BookCtrl = require('../controllers/index');

const router = express.Router();

router.post('/book', BookCtrl.createBook);
router.get('/books', BookCtrl.getBooks);
router.delete('/book/:id', BookCtrl.deleteBook);
router.get('/book/:id', BookCtrl.getBookById);
//router.put('/book/:id', BookCtrl.updateBook)

module.exports = router;