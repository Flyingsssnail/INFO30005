var express = require('express');
var router = express.Router();
var controller = require('../controller/controller.js');

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
router.post('/register', controller.createUser);

// find one user by name
router.get('/search', controller.searching);

// There are more need to be installed
router.post('/edit_post', controller.createPost);

router.post('/forum/post', controller.addreply);
router.get('/profile', controller.userprofile);

router.get('/login', controller.signin);
router.get('/register', controller.register);
router.post('/login', controller.login);

router.get('/forum', controller.forum);
router.get('/forum/stories', controller.stories);
router.get('/forum/artifacts', controller.artifacts);
router.get('/forum/post', controller.postpage);

module.exports = router;
