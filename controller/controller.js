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
            console.log('find1');
            var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if(!regex.test(obj.email)){
                return res.sendStatus(401);
            }
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
    res.cookie('username',user._id.toString(), {httpOnly: true});
    // res.redirect('/');
    res.end();
}

function login (req, res) {
    req.on('data', function (data) {
        var obj = JSON.parse(data);
        Users.findOne({email: obj.email}, function (err, usr) {
            console.log('find2');

            // TODO encrypt password
            console.log(usr);

            if (err || (obj.password !== usr.password)) {
                // console.log("no");
                return res.sendStatus(401);
            } else {
                // console.log("yes");
                res.cookie("username", usr._id.toString(), {httpOnly: true});
                var redir = req.query.orig ? req.query.orig : "/";
                res.redirect(redir);

                res.end();
                return true;
            }
        });
    });
}

function createPost(req,res){
    var a = findViewerInfo(req).then(function (result) {
        return result.name;
    });
    console.log(a);
    // set cookie command in browser document.cookie="username=123456"
    // console.log(req);
    // var usr = Users.findOne({_id: req.headers.cookies.username}, function (err, usr) {return usr});
    var post = new Posts({
        "author":req.cookies.username,
        "name" : "temp author",
        "title":req.body.title,
        "content":req.body.post_edit,
        "type": req.body.type,
    });

    Posts.create(post, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });

    findPostInfo(post);
    console.log(post);
    var redir = util.format('/forum/post?postid=%s', post._id);
    res.redirect(redir);
    res.end();

}

// find by name
function searching(req, res) {
    if (req.query.type === 'user') {
        // console.log('1');
        Users.find({name: { $regex : req.query.key, $options : 'i' }}, function(err, result){
            console.log('find3');

            return err ? res.sendStatus(404) : res.send(result);
        });

    } else if (req.query.type === 'post') {
        // console.log('2');

        // TODO req.query.method -> array, search by multiple method
        Posts.find({[req.query.method]: { '$regex' : req.query.key, '$options' : 'i' }}, function(err,result){
            console.log('find4');

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
        console.log('find5');

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
    Users.find({_id: req.cookies.username}, function(err, result){
        //console.log(result);
        console.log('find6');
        res.render('otheruser',{result: result });
    });
}

function editprofile(req, res) {
    Users.findOne({_id: req.cookies.username}, function(err, result) {
        console.log('find7');
        res.render('editprofile', {result: result});
    })
}

// open forum homepage
function forum(req, res) {

    var viewer = (req.cookies.username && req.cookies.username !== "")? findViewerInfo(req) : null;
    var artifactsArray = [];
    var storiesArray = [];
    // find post
    Posts.find(function (err, posts) {
        console.log('find8');

        if (err) {
            return res.sendStatus(404);
        }
        posts.forEach(function (element) {

            if (artifactsArray.length <= 4 && element.type === "artifacts") {
                artifactsArray.push(element);
            }
            if (storiesArray.length <= 4 && element.type === "stories") {
                storiesArray.push(element);
            }
        });
        if (viewer) {
            console.log(viewer);
            viewer.then(
                function(result) {
                    return res.render('forumpage', {
                        artifactsArray: artifactsArray,
                        storiesArray: storiesArray,
                        viewer: true,
                        viewerName: result.name,
                        viewerAvatar: result.avatar
                    });
                }
            );
        } else {
            return res.render('forumpage', {
                artifactsArray: artifactsArray,
                storiesArray: storiesArray,
                viewer: false
            });
        }
    });
}
// open stories section
function stories(req, res) {
    // add logged in information
    var viewer = (req.cookies.username && req.cookies.username !== "")? findViewerInfo(req) : null;
    var page = req.query.page;
    var total = 0;
    var array = [];
    var storiesArray = [];
    Posts.find(function (err, posts) {
        console.log('find9');

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

        if (viewer) {
            viewer.then(
                function(result) {
                    return res.render('forum', {
                        section: "stories",
                        array: storiesArray,
                        total: total,
                        currentpage: page,
                        viewer: true,
                        viewerName: result.name,
                        viewerAvatar: result.avatar
                    });
                }
            );
        } else {
            return res.render('forum', {
                section: "stories",
                array: storiesArray,
                total: total,
                currentpage: page,
                viewer: false
            });
        }
    });
}
// open artifacts section
function artifacts(req, res) {
    // add logged in information
    var viewer = (req.cookies.username && req.cookies.username !== "")? findViewerInfo(req) : null;
    var page = req.query.page;
    var total = 0;
    var array = [];
    var artifactsArray = [];
    Posts.find(function (err, posts) {
        console.log('find10');

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
        if (viewer) {
            viewer.then(
                function(result) {
                    return res.render('forum', {
                        section: "artifacts",
                        array: artifactsArray,
                        total: total,
                        currentpage: page,
                        viewer: true,
                        viewerName: result.name,
                        viewerAvatar: result.avatar
                    });
                }
            );
        } else {
            return res.render('forum', {
                section: "artifacts",
                array: artifactsArray,
                total: total,
                currentpage: page,
                viewer: false
            });
        }
    });
}
// open single post page
function postpage(req, res) {
    // add logged in information
    var viewer = (req.cookies.username && req.cookies.username !== "")? findViewerInfo(req) : null;
    console.log(req.query.postid);
    Posts.findOne({_id: req.query.postid}, function(err, post){
        console.log('find11');

        if (err) return res.sendStatus(404);

        var currentpage = req.query.page;
        var total = 0;
        var commentsArray = [];
        var array_info = [];
        var author_info;

        // get the author information
        Users.findOne({_id: post.author}, function(err, user) {
            console.log('find12');

            if (err) return res.sendStatus(404);

            author_info = user;

            // get all the replies
            Reply.find(function(err, comments) {
                console.log('find13');

                // find the post's comments and record the number
                comments.forEach(function(comment) {
                    if (comment.parentPost === post._id) {
                        total++;
                        commentsArray.push(comment);
                    }
                    Users.find({_id: comment.author}, function(err, user) {
                        console.log('find14');

                        array_info.push(user);
                    })
                });

                if (viewer) {
                    viewer.then(
                        function(result) {
                            return res.render('post', {
                                author_info: author_info,
                                array_info: array_info,
                                post: post,
                                commentsArray: commentsArray,
                                currentpage: currentpage,
                                total: total,
                                viewer: true,
                                viewerName: result.name,
                                viewerAvatar: result.avatar
                            });
                        }
                    );
                } else {
                    return res.render('post', {
                        author_info: author_info,
                        array_info: array_info,
                        post: post,
                        commentsArray: commentsArray,
                        currentpage: currentpage,
                        total: total,
                        viewer: false
                    });
                }
            });

        });
    });
}

async function findViewerInfo(req) {
    return await Users.findOne({_id: req.cookies.username});
}

async function findPostInfo(post) {
    return await Posts.findOne({_id: post._id});
}

module.exports.login = login;
module.exports.createUser = createUser;
module.exports.userprofile = userprofile;

module.exports.searching = searching;

module.exports.createPost = createPost;
module.exports.postpage = postpage;

module.exports.addreply = addreply;

module.exports.forum = forum;
module.exports.artifacts = artifacts;
module.exports.stories = stories;
module.exports.editprofile = editprofile;


function test(req, res) {
    Posts.find({ _id: "5cdd65a83370f5312807bdab" }).remove( );
}
module.exports.test = test;
