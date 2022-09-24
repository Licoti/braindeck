const json = require('../../../dist/manifest.json');
const indexJSFile = json['index.js'];
const appCSSFile = json['app.css'];

const debug = process.env.NODE_ENV === 'dev';

indexBook = (req, res) => {
  if (debug) console.log('getBooks');

  res.render('index', {
    title: 'Mes livres',
    appJSFile: indexJSFile,
    appCSSFile: appCSSFile,
  });
}

module.exports = { indexBook };