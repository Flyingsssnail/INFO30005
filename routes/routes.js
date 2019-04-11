var express = require ('express');
var router  = express.Router();
var controller  = require ('../controller/controller.js');

//new Users
router.post ('/api',controller.createUser);

//find Users
router.get ('/api/all',controller.getUsers);


//There are more need to be installed


module.exports = router;


