var express = require('express');
var router = express.Router();

const json = require('../dist/manifest.json');

const indexJSFile = json['index.js'];
const appCSSFile = json['app.css'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'SandBox !',
    appJSFile: indexJSFile,
    appCSSFile: appCSSFile,
  });
});

module.exports = router;
