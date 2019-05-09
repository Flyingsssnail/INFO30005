const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file.mimetype);
        cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
});

const upload = multer({storage : storage});

router.post('/upload', upload.single('image'), (req, res) => {
    // console.log(res.mimetype);

    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

// welcome page
router.get('/', controller.init);

// create new Users
router.post('/api/u/register', controller.createUser);

// find all Users
router.get('/api/u/all', controller.allUsers);

// find one user by name
router.get('/api/search', controller.searching);

// There are more need to be installed
router.post('/post_edit.html', controller.createPost);

// router.get('/api/post', controller.getPost);
// router.get('/api/post_edit', controller.editPost);

// router.get('/api/login', controller.login);

// router.post('/api/login', controller.loggedin);

// router.get('/api/login', controller.login);

module.exports = router;
