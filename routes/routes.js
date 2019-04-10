var express = require ('express');
var router  = express.Router();
var controller  = require ('../controller/controller.js');

//new Users
router.post ('/api',controller.createUsers);

//rate Users
router.get ('/api',controller.rateUsers);

//find Users
router.get ('/api',controller.findUsers);


//There is more need to be installed


module.exports = router;


