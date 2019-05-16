var express = require('express');
var router = express.Router();
var controller = require('../controller/controller.js');

const multer = require('multer');
var path = require('path');


// get section
router.get('/', function (req, res) { res.sendFile(path.join(__dirname + '/../public/main.html')) });
router.get('/profile', controller.userprofile);
router.get('/login', function (req, res) { res.sendFile(path.join(__dirname + '/../public/login.html')) });
router.get('/forum', controller.forum);
router.get('/forum/stories', controller.stories);
router.get('/forum/artifacts', controller.artifacts);
router.get('/forum/post', controller.postpage);
router.get('/profile/edit', controller.editprofile);
// find user or posts
//router.get('/search', controller.searching);
//router.get('/search', controller.searchPage);
// get post page
router.get('/post_edit', function (req, res) {
    if (!req.cookies.username) {
        res.redirect('/login');
    } else {
        res.sendFile(path.join(__dirname + '/../public/post_edit.html'));
    }
});

// post section
router.post('/register.html', controller.createUser);
router.post('/post_edit', controller.createPost);
router.post('/forum/post', controller.addreply);
router.post('/login', controller.login);
// router.post('/forum', controller.search);
// router.post('/', controller.search);
// router.post('/forum/stories', controller.search);
// router.post('/forum/artifacts', controller.search);
// router.post('/forum/post', controller.search);
// upload images
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

router.get('/logout', function (req,res) {
    console.log(req.query);
    res.cookie('username', '');
    res.redirect(req.query.orig);
    res.end();
});

router.post('/upload', upload.single('image'), (req, res) => {
    // console.log(res.mimetype);

    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

// export
module.exports = router;
