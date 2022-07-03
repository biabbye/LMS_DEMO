const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       const {assignmentId} = req.body;
       const dir = `../assignmentCodes/${assignmentId}`
       if(!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
    }
    },
    filename: function (req, file, cb) {
        cb(null, `Tests.py`);
    },
});

var upload = multer({ storage });

module.exports = upload;