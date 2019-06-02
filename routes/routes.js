var express = require('express');
var router = express.Router();
var controller = require('../controller/controller.js');
var fourmcontrol = require('../controller/forum_controller.js');
var usercontrol = require('../controller/user_controller.js');

// get section
router.get('/', controller.main);
router.post('/upload', controller.uploadimg);

// users
router.post('/register.html', usercontrol.createUser);
router.get('/login', usercontrol.getlogin);
router.post('/login', usercontrol.login);
router.get('/logout', usercontrol.logout);
router.get('/profile/edit', usercontrol.editprofile);
router.get('/viewProfile', usercontrol.viewProfile);
router.get('/profile', usercontrol.userprofile);

// forum
router.get('/forum', fourmcontrol.forum);
router.get('/forum/stories', fourmcontrol.stories);
router.get('/forum/artifacts', fourmcontrol.artifacts);

// library and tips
router.get('/library',controller.library);
router.get('/library/tippages',controller.tipspage);

// post section
router.get('/forum/post', fourmcontrol.postpage);
router.get('/post_edit', fourmcontrol.postedit);
router.post('/post_edit', fourmcontrol.createPost);
router.post('/forum/post', fourmcontrol.addreply);

// export
module.exports = router;
