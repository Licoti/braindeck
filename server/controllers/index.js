const createBook = require('./book/createBook');
const getBooks = require('./book/getBooks');
const getBookById = require('./book/getBookById');
const deleteBook = require('./book/deleteBook');
const uploadBook = require('./book/uploadBook');
//const uploadBookMulter = require('./book/uploadBookMulter');

const multer  = require('multer');
const path = require('path');

const image_storage = multer.diskStorage({
  destination: path.join(__dirname , '../../public/uploads'),
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

// Init Upload
const user_avatar_image_upload = multer({
  storage: image_storage,
  limits:{fileSize: 2000000}, // 1 mb
  fileFilter: function(req, file, cb){
    checkFileTypeForUserAvatar(file, cb);
  }
}).single('uploaded_file'); // this is the fieldName that will be dealt

// Check File Type
function checkFileTypeForUserAvatar(file, cb){
  // Allowed ext
  let filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  let mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: jpeg, jpg, png, gif Images Only!');
  }
}

uploadBookMulter = async (req, res) => {
  console.log('body' , req.body, res.file) // here the req.body will turn out {}

  await user_avatar_image_upload(req, res, (err) => {
    console.log('file : ', req.file)
  })
};

module.exports = { createBook, getBooks, getBookById, deleteBook, uploadBook, uploadBookMulter };
