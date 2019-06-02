# INFO30005


In deliverable 4, the core functionalities that our group has chosen are Forum post and user profile.
For forum post, we can create new post and browse other post. we can also reply other post.
For user profile, we can create new user , view our own profile, and edit it if we need.

 link "/" to our home page
 link "/forum" to forum page
 link "/login" to login page( you can use username:12@gmail.com, password:1)
 link "/post_edit" to post page if you have logged in, other wise to "/login" page


for forum and post functionality:
In views,
forumpage.ejs
forum.ejs
post.ejs
searchPage.ejs


in models:
all js file used
 
for posts, in routes,
router.get('/post_edit', fourmcontrol.postedit);		// return post editing page
router.post('/post_edit', fourmcontrol.createPost);		// create post
router.get('/forum/post', fourmcontrol.postpage);		// get post page
router.post('/forum/post', fourmcontrol.addreply);		// add reply to the post

for forum, in routes,
router.get('/forum', fourmcontrol.forum);				// get forum with top posts of each section
router.get('/forum/stories', fourmcontrol.stories);		// get all posts of stories
router.get('/forum/artifacts', fourmcontrol.artifacts);	// get all posts of artifacts


for users functionality:
In views,
otheruser.ejs
editprofile.ejs


in models:
db.js
users.js

in routes:
router.post('/register.html', usercontrol.createUser);	// register
router.get('/login', usercontrol.getlogin);				// get login page
router.post('/login', usercontrol.login);				// handle login request
router.get('/logout', usercontrol.logout);				// handle logout request
router.get('/profile', usercontrol.userprofile);		// view others profile
router.get('/profile/edit', usercontrol.editprofile);	// edit own profile
router.get('/viewProfile', usercontrol.viewProfile);	// view own profile


for library and tips functionality:
In views,
tippages.ejs
library.ejs

in routes:
router.get('/library',controller.library);				// get library page
router.get('/library/tippages',controller.tipspage);	// get tips page





