const express = require('express');

const BookCtrl = require('../controllers/index');

const router = express.Router();

const multer  = require('multer');
const upload = multer({ dest: '../../public/uploads/' });

router.post('/book', BookCtrl.createBook);
router.post('/single', BookCtrl.uploadBook);
//router.post('/stats', upload.single('uploaded_file'), BookCtrl.uploadBookMulter);
router.post('/stats', BookCtrl.uploadBookMulter);
router.get('/books', BookCtrl.getBooks);
router.delete('/book/:id', BookCtrl.deleteBook);
router.get('/book/:id', BookCtrl.getBookById);
//router.put('/book/:id', BookCtrl.updateBook)

module.exports = router;