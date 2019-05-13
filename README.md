# INFO30005


In deliverable 4, the core functionalities that our group has chosen are Forum post and user profile.
For forum post, we can create new post and browse other post. we can also reply other post.
For user profile, we can create new user , view our own profile, and edit it if we need.

 link "/" to our home page
 link "/forum" to forum page
 link "/login" to login page( you can use username:6, password:6)
 link "/post_edit" to post page
 link "/post_edit" to post page

 link "/profile" to post page if you have logged in 


for forum and post functionality:
In views,
forumpage.ejs
forum.ejs
post.ejs
searchPage.ejs


in models:
all js file used
 
in routes,
router.get('/forum', controller.forum);
router.get('/forum/stories', controller.stories);
router.get('/forum/artifacts', controller.artifacts);
router.get('/forum/post', controller.postpage);
router.get('/post_edit', function (req, res))
router.post('/post_edit', controller.createPost);
router.post('/forum/post', controller.addreply);


for users functionality:
In views,
otheruser.ejs
editprofile.ejs


in models:
db.js
users.js

in routes:
router.get('/profile', controller.userprofile);
router.get('/login', function (req, res));
router.post('/register.html', controller.createUser);
router.post('/login', controller.login);








