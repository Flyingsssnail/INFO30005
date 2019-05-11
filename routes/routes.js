var express = require('express');
var router = express.Router();
var controller = require('../controller/controller.js');
var mongoose  = require ('mongoose');
var Users = mongoose.model('users');
var Posts = mongoose.model('posts');

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
router.post('/register.html', controller.createUser);

// find all Users
router.get('/api/u/all', controller.allUsers);

// find one user by name
router.get('/api/search', controller.searching);

// There are more need to be installed
router.post('/post_edit.html', controller.createPost);

router.post('/forum/post', controller.addreply);
// router.get('/api/post', controller.getPost);
// router.get('/api/post_edit', controller.editPost);
router.get('/profile', controller.userprofile);

router.get('/login', function (req, res) {
    res.sendfile(path.join(__dirname + '/../public/login.html'))
});
router.post('/login', controller.login);

   /* function(req, res) {
    console.log('hi');
    var user = new Users();
    Users.find({name: req.query.name}, function(err, result){
        return err ? res.sendStatus(404) :
        res.render('login', { message: 'Hello world!', names: [ { name: "steven"}, { name: "Daniel"}],result: result });
    });*/

    // Make DB request
    // User.findById(req.params.id, function(err, user) {
    //    res.render('profile', user)
    // });
    // var user = ...



  // res.render('login', { message: 'Hello world!', names: [ { name: "steven"}, { name: "Daniel"} ] });
//});

// router.get('/api/login', controller.login);

// router.post('/api/login', controller.loggedin);

// router.get('/api/login', controller.login);

module.exports = router;
