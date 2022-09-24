const express = require('express');

const IndexCtrl = require('../controllers/front/indexctrl');

const router = express.Router();

router.get('/', IndexCtrl.indexBook);

module.exports = router;