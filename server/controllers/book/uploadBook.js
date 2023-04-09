const { Book } = require('../../models');
const debug = process.env.NODE_ENV === 'dev';
const path = require('path');

//with Fileupload
async function _uploadBook (req, res, next) {
  if (debug) console.log('_uploadBook');

  try {
    const file = req.files.mFile;
    console.log('file : ' , file);

    const savePath = path.join(__dirname, '../../../public', 'uploads', file.name);
    await file.mv(savePath)
    res.redirect('/');
  } catch (err) {
    console.log(err)
    res.send('Error uploading file')
  }
}

module.exports = _uploadBook;
