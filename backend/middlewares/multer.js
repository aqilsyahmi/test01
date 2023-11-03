/*handle file upload locally*/
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads'); //destination folder
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}.jpg`); //unique filename
    },
});

var upload = multer({storage});

module.exports = upload;