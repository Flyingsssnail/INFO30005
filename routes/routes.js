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
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/main.html'))
});
// create new Users
router.post('/register.html', controller.createUser);

// find one user by name
router.get('/search', controller.searching);

// There are more need to be installed
router.get('/post_edit', function (req, res) {
    if (!req.cookies.username) {
        res.redirect('/login');
    } else {
        res.sendFile(path.join(__dirname + '/../public/post_edit.html'));
    }
});
router.post('/post_edit', controller.createPost);

router.post('/forum/post', controller.addreply);
router.get('/profile', controller.userprofile);

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/login.html'))
});
router.post('/login', controller.login);

router.get('/forum', controller.forum);
router.get('/forum/stories', controller.stories);
router.get('/forum/artifacts', controller.artifacts);
router.get('/forum/post', controller.postpage);

module.exports = router;
