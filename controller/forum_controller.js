const mongoose  = require ('mongoose');
const util = require('util');

const Users = mongoose.model('users');
const Posts = mongoose.model('posts');
const Reply = mongoose.model('reply');

// handle request to post a new post
function createPost(req,res){
    // get current user
    Users.findOne({_id: req.cookies.username}, function (err, user) {
        var post = new Posts({
            "author":req.cookies.username,
            "title":req.body.title,
            "content":req.body.post_edit,
            "type": req.body.type,
        });

        // user gain exp when posting a new post
        gainexp( 5, user);

        Posts.create(post, function(err){
            if (err) {
                return res.sendStatus(400);
            }
            // redirect to the new post
            var redir = util.format('/forum/post?postid=%s', post._id);
            res.redirect(redir);
        });
    });
}

// calculate if user can rank up after gaining exp, every 100 exp = 1 rank
function gainexp(exp, user) {
    user.exp += exp;
    if (user.exp >= 100) {
        user.exp -= 100;
        user.rank ++;
    }
    Users.findOneAndUpdate({_id:user._id}, {$set: {exp:user.exp, rank: user.rank}}, function (err, res) {
        console.log(err);
    });
}

// handle the reply action
function addreply(req, res) {
    var userreply = new Reply({
        "author":req.cookies.username,
        "parentPost":req.query.postid,
        "content":req.body.usrreply,
    });

    Posts.findOne({_id: req.query.postid}, function (err, post) {
        if (err || !post) {
            return res.sendStatus(404);
        }

        // both the post owner and the replier gains small amount of exp
        // note: could add a max exp gain for user in user template to avoid problem, and clear at every midnight
        Users.findOne({_id:req.cookies.username}, function (err, u1) {
            gainexp(1, u1);
            u1.reply++;
        });
        Users.findOne({_id:post.author}, function (err, u1) {
            gainexp(1, u1);
        });

        Reply.create(userreply, function(err){
            if (err) {
                return res.sendStatus(400);
            }
            Posts.findOneAndUpdate({_id:post._id}, {$push: {reply : userreply._id}}, function (err, result) {
                // update the reply to the post
                if (err || !result ) {
                    return res.sendStatus(404);
                }
                // refresh the post page
                res.redirect('back');
            });
        });
    });
}

// open forum homepage
function forum(req, res) {

    var viewer = (req.cookies.username && req.cookies.username !== "")? findViewerInfo(req) : null;
    var artifactsArray = [];
    var storiesArray = [];
    // find post
    Posts.find({}).populate('author').exec(function (err, posts) {
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
    Posts.find({}).populate('author').exec( function (err, posts) {
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
        // only need at most 9 pages
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
    Posts.find({}).populate('author').exec(function (err, posts) {
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
        // only need at most 9 pages
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

// handle the post edit/create new post
function postedit(req, res) {
    if (!req.cookies.username) {
        // if user not logged in, guide to login page, and direct back if logged in
        res.redirect('/login?orig=/post_edit');
    } else {
        res.sendFile(path.join(__dirname + '/../public/post_edit.html'));
    }
}

// open single post page
function postpage(req, res) {

    // find the required post page also the relating information, such as author data, reply data and replies' author
    Posts.findOne({_id: req.query.postid}).populate({path:'reply', populate: {path:'author', model: Users}})
        .populate('author').exec( function(err, post){

        if (err) return res.sendStatus(404);

        // check the if user logged in to render the user navigation bar
        Users.findOne({_id: req.cookies.username},function(err, user) {
            if (err || !user) {
                return res.render('post', {
                    post: post,
                    viewer: false
                });
            } else {
                return res.render('post', {
                    post: post,
                    viewer: true,
                    viewerName: user.name,
                    viewerAvatar: user.avatar
                });
            }
        })
    });
}

async function findViewerInfo(req) {
    return await Users.findOne({_id: req.cookies.username});
}

module.exports.createPost = createPost;
module.exports.postpage = postpage;
module.exports.postedit = postedit;
module.exports.addreply = addreply;
module.exports.forum = forum;
module.exports.artifacts = artifacts;
module.exports.stories = stories;


