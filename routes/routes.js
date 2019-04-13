var express = require ('express');
var router  = express.Router();
var controller  = require ('../controller/controller.js');

//create new Users
router.post ('/api/u/register',controller.createUser);

//find all Users
router.get ('/api/u/all',controller.allUsers);

//find one user by id
router.get ('/api/u/:id',controller.getUser);

//find one user by name
router.get ('/api/search', controller.searching);

//There are more need to be installed
router.post ('/api/p/post',controller.createPost);

module.exports = router;


