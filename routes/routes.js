var express = require('express');
var router = express.Router();
var controller = require('../controller/controller.js');
var fourmcontrol = require('../controller/forum_controller.js');
var usercontrol = require('../controller/user_controller.js');

// get section
router.get('/', controller.main);
router.post('/upload', controller.uploadimg);

// users
router.get('/login', usercontrol.getlogin);
router.post('/login', usercontrol.login);
router.get('/logout', usercontrol.logout);
router.get('/viewProfile', usercontrol.viewProfile);
router.get('/profile', usercontrol.userprofile);

// forum
router.get('/forum', fourmcontrol.forum);
router.get('/forum/stories', fourmcontrol.stories);
router.get('/forum/artifacts', fourmcontrol.artifacts);
router.get('/forum/post', fourmcontrol.postpage);
router.get('/profile/edit', usercontrol.editprofile);

// library and tips
router.get('/library',controller.library);
router.get('/library/tippages',controller.tipspage);

// post section
router.post('/register.html', usercontrol.createUser);
router.post('/post_edit', fourmcontrol.createPost);
router.post('/forum/post', fourmcontrol.addreply);
router.get('/post_edit', fourmcontrol.postedit);

// export
module.exports = router;
