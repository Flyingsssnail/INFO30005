var express = require ('express');
var router  = express.Router();
var controller  = require ('../controller/controller.js');

//new Users
router.post ('/api/u/register',controller.createUsers);

//find Users
router.get ('/api/u/',controller.getUser);
router.get ('/api/u/all',controller.allUsers);


//There are more need to be installed


module.exports = router;


