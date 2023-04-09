const { Book } = require('../../models');
const debug = process.env.NODE_ENV === 'dev';
const path = require('path');
const multer  = require('multer')

//with Fileupload
async function _uploadBook (req, res, next) {
  if (debug) console.log('_uploadBook');

  try {
    const upload = multer({ dest: '../../../public/uploads/' })
    app.post('/stats', upload.single('uploaded_file'), function (req, res) {
      // req.file is the name of your file in the form above, here 'uploaded_file'
      // req.body will hold the text fields, if there were any
      console.log(req.file, req.body)
    });

  } catch (err) {
    console.log(err)
    res.send('Error uploading file')
  }
}

module.exports = _uploadBook;
