const express = require('express');

const BookCtrl = require('../controllers/bookctrl');

const router = express.Router();

router.post('/book', BookCtrl.createBook);
router.get('/books', BookCtrl.getBooks);
router.get('/', BookCtrl.indexBook);

module.exports = router;