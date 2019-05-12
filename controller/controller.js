const mongoose  = require ('mongoose');

const util = require('util');
const Users = mongoose.model('users');
const Posts = mongoose.model('posts');
const Reply = mongoose.model('reply');

const genderArray = ["female", "male", "hidden", "other"];

// register user
function createUser(req,res){

    console.log(req);
    req.on('data', function (data) {
        var obj = JSON.parse(data);
        Users.findOne({email: obj.email}, function (err, usr) {
            if (usr) {
                return res.sendStatus(422);
            } else {
                return varified(obj, usr, res);
            }
        });
    });
}

function varified(obj, usr, res) {

    var user = new Users({
        "firstname": obj.firstname ? obj.firstname : "",
        "lastname": obj.lastname ? obj.lastname: "",
        "name": obj.name,
        "gender": obj.gender ? obj.gender : genderArray[2],
        "email": obj.email,
        "password": obj.password,
    });

    Users.create(user, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });
    res.cookie('username',user._id.toString(), {maxAge: 900000, httpOnly: true});
    // res.redirect('/');
    res.end();
}

function login (req, res) {
    req.on('data', function (data) {
        var obj = JSON.parse(data);
        Users.findOne({email: obj.email}, function (err, usr) {
            // TODO encrypt password
            console.log(usr);
            if (err || (obj.password !== usr.password)) {
                // console.log("no");
                return res.sendStatus(401);
            } else {
                // console.log("yes");
                res.cookie("username", usr._id.toString(), {maxAge: 900000, httpOnly: true});
                var redir = req.query.orig ? req.query.orig : "/";
                res.redirect(redir);
                res.end();
                return true;
            }
        });

    });

}

function createPost(req,res){

    // set cookie command in browser document.cookie="username=123456"
    // console.log(req);
    // var usr = Users.findOne({_id: req.headers.cookies.username}, function (err, usr) {return usr});
    var post = new Posts({
        "author":req.cookies.username,
        "title":req.body.title,
        "content":req.body.post_edit,
        "tag":[],
        "rating":0,
        "reply":[],
        "type": req.body.type,

    });

    Posts.create(post, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });

    var redir = util.format('/forum/post?postid=%s', post._id);
    res.redirect(redir);
    res.end();

}
// find all user
// var allUsers = function(req,res){
//     Users.find(function(err, users) {
//     	return err? res.sendStatus(404) : res.send(users);
//     });
// };

// find by name
function searching(req, res) {
    // search for user
    if (req.query.type === 'user') {
        // console.log('1');
        Users.find({name: { $regex : req.query.key, $options : 'i' }}, function(err, result){
        	return err ? res.sendStatus(404) : res.send(result);
        });

    }
    // search for posts
    else if (req.query.type === 'post') {
        // console.log('2');

        // TODO req.query.method -> array, search by multiple method
        Posts.find({[req.query.method]: { '$regex' : req.query.key, '$options' : 'i' }}, function(err,result){
            return err ? res.sendStatus(404) : res.send(result);
        });
    }
}
function addreply(req, res) {

    var reply = new Reply({
        "author":req.cookies.username,
        "parentPost":req.query.postid,
        "content":req.body.content,
    });

    Posts.findOne({_id: req.query.postid}), function (err, user) {
        if (err) {
            return res.sendStatus(404);
        }
        user.reply.append(reply._id);
    };
    Reply.create(reply, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });
}

function userprofile(req,res){
    // console.log('hi');
    // var user = new Users();
    Users.findOne({_id: req.cookies.username}, function(err, result){
            res.render('otheruser',{result: result });
    });
}

// open forum homepage
function forum(req, res) {

    // add logged in information
    var viewer = 0;
    if (verifyLogin(req)) {
        User.find({_id: req.cookies.username}, function(err, user) {
            if (err) return res.sendStatus(404);
            viewer = user;
        });
    }

    var artifactsArray = [];
    var storiesArray = [];

    Posts.find(function (err, posts) {
        if (err) {
            return res.sendStatus(404);
        }
        posts.forEach(function (element) {
            var artifacts = 0;
            var stories = 0;
            if (artifacts <= 4 && element.type === "artifacts") {
                artifactsArray.push(element);
            }
            if (stories <= 4 && element.type === "stories") {
                storiesArray.push(element);
            }
        });
    });

    return res.render('forumpage', {
        artifactsArray: artifactsArray,
        storiesArray: storiesArray,
        viewer: viewer,
    });
}
// open stories section
function stories(req, res) {

    // add logged in information
    var viewer = false;
    if (verifyLogin(req)) {
        User.find({_id: req.cookies.username}, function(err, user) {
            if (err) return res.sendStatus(404);
            viewer = user;
        });
    }

    var page = req.query.page;
    var total = 0;
    var array = [];
    var storiesArray = [];
    Posts.find(function (err, posts) {
        if (err) {
            return res.sendStatus(404);
        }
        posts.forEach(function(element) {
            // record the total number of stories posts
            if (element.type === "stories") {
                total++;
            }
            if (element.type === "stories" && array.length <= req.query.page * 9) {
                storiesArray.push(element);
            }
        });
        // only need atmost 9 pages
        for (var i = (req.query.page - 1)  * 9; i < req.query.page * 9 && i < array.length; i++) {
            storiesArray.push(array[i]);
        }
    });


    res.render('forum', {
        section: "stories",
        array: storiesArray,
        total: total,
        currentpage: page,
        viewer: viewer
    });
}
// open artifacts section
function artifacts(req, res) {
    // add logged in information
    var viewer = false;
    if (verifyLogin(req)) {
        User.find({_id: req.cookies.username}, function(err, user) {
            if (err) return res.sendStatus(404);
            viewer = user;
        });
    }


    var page = req.query.page;
    var total = 0;
    var array = [];
    var artifactsArray = [];
    Posts.find(function (err, posts) {
        if (err) {
            return res.sendStatus(404);
        }

        posts.forEach(function(element) {
            // record the total number of artifacts posts
            if (element.type === "artifacts") {
                total++;
            }
            if (element.type === "artifacts" && array.length <= req.query.page * 9) {
                array.push(element);
            }
        });
        // only need atmost 9 pages
        for (var i = (req.query.page - 1)  * 9; i < req.query.page * 9 && i < array.length; i++) {
            artifactsArray.push(array[i]);
        }
    });

    res.render('forum', {
        section: "artifacts",
        array: artifactsArray,
        total: total,
        currentpage: page,
        viewer: viewer
    });
}
// open single post page
function postpage(req, res) {
    Posts.findOne({_id: req.query.postid}, function(err, post){
        if (err) return res.sendStatus(404);

        var currentpage = req.query.page;
        var total = 0;
        var commentsArray = [];
        var author_info;
        var array_info = [];

        console.log(post);

        // get all the replies
        Reply.find(function(err, comments) {
           // find the post's comments and record the nummber
           comments.forEach(function(comment) {
               if (comment.parentPost === post._id) {
                   total++;
                   commentsArray.push(comment);
               }
           });
        });

        // get the author information
        Users.find({_id: post.author}, function(err, user) {
            if (err) return res.sendStatus(404);

            author_info = user;
            // get the information of poeple who comment
            commentsArray.forEach(function(comment) {
                Users.find({_id: comment.author}, function(err, user) {
                    if (err) return res.sendStatus(404);

                    array_info.push(user);
                })
            });

            return res.render('post',{
                author_info: author_info,
                array_info: array_info,
                post: post,
                commentsArray: commentsArray,
                currentpage: currentpage,
                total: total
            });
        });
    });
}
module.exports.login = login;
module.exports.createUser = createUser;
module.exports.userprofile = userprofile;

module.exports.searchPage = searchPage;
module.exports.search = search;
module.exports.createPost = createPost;
module.exports.postpage = postpage;

module.exports.addreply = addreply;

module.exports.forum = forum;
module.exports.artifacts = artifacts;
module.exports.stories = stories;
