/**
 * Created by ManaliJain on 10/5/17.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname)
    }
});

var upload = multer({storage:storage});

router.post('/upload', upload.single('document'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    res.status(204).end();
});

module.exports = router;
