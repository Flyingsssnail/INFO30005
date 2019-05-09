var express = require('express');
var router = express.Router();
var controller = require('../controller/controller.js');
var mongoose  = require ('mongoose');
var Users = mongoose.model('users');
var Posts = mongoose.model('posts');

// welcome page
router.get('/', controller.init);

// create new Users
router.post('/api/u/register', controller.createUser);

// find all Users
router.get('/api/u/all', controller.allUsers);

// find one user by name
router.get('/api/search', controller.searching);

// There are more need to be installed
router.post('/api/post', controller.createPost);

// router.get('/api/post', controller.getPost);
// router.get('/api/post_edit', controller.editPost);
router.get('/login', controller.finduser);
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
