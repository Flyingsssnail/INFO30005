var express = require('express');
var router = express.Router();
var controller = require('../controller/controller.js');

// get section
router.get('/viewProfile', controller.viewProfile);
router.get('/', controller.main);
router.get('/profile', controller.userprofile);
router.get('/login', controller.getlogin);
router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.get('/forum', controller.forum);
router.get('/forum/stories', controller.stories);
router.get('/forum/artifacts', controller.artifacts);
router.get('/forum/post', controller.postpage);
router.get('/profile/edit', controller.editprofile);
router.get('/library',controller.library);
router.get('/library/tippages',controller.tipspage);

router.get('/post_edit', controller.postedit);

// post section
router.post('/register.html', controller.createUser);
router.post('/post_edit', controller.createPost);
router.post('/forum/post', controller.addreply);

router.post('/upload', controller.uploadimg);

// export
module.exports = router;
