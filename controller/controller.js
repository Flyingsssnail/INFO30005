var mongoose  = require ('mongoose');
var ejs = require('ejs');
var Users = mongoose.model('users');
var Posts = mongoose.model('posts');
var Reply = mongoose.model('reply');

// welcome page
function init(req, res) {;
    return res.sendfile('public/main.html');
}

// register user
function createUser(req,res){
	
	var genderArray = ["female", "male", "hidden", "other"];
	
	// only specified string in genderArray are allowed to be entered;
	
	if (genderArray.indexOf(req.body.gender) === -1) {
		return res.sendStatus(406);
	}
	
    var user = new Users({
        "name":req.body.name,
        "gender":req.body.gender,
        "exp":0,
        "phone":0,
        "rank":0,
        "email":req.body.email,
        "BY":0,
        "post":0,
        "collect": 0,
        "following":0,
        "liked":0,
        "likes":0,
        "followers":0,
    });
    
    Users.create(user, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });

    return res.send(`You have successfully registered.${user}`);
};

function loggedin (req, res) {
    // var cookie = req.headers.cookies.username;
    // dehash(cookie);
    // if (cookie === undefined)
    // {
    //     return undefined;
    // }
    // else
    // {
    //     res.cookie('username', username, { maxAge: 900000, httpOnly: true });
    //     // console.log('user name: %s', username);
    // }
}

function createPost(req,res){

    console.log(req);
    // var usr = Users.findOne({_id: req.headers.cookies.username}, function (err, usr) {return usr});
    var post = new Posts({


        // "author":usr.name,
        "title":req.body.title,
        "type": String,
        "content":req.body.post_edit,
        "tag":[],
        "rating":0,
        "reply":[],
    });
    Posts.create(post, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });

    return res.send(post);
    // return $resource('alls/:issuename', {issuename: '@issuename'},
    //     {
    //
    //         get:{ method: 'GET',
    //             query: {
    //                 Model: '',
    //                 Color: ''
    //             }, isArray:true }
    //
    //     });
};

// find all user
var allUsers = function(req,res){
    Users.find(function(err, users) {
    	return err? res.sendStatus(404) : res.send(users);
    });
};

// find by name
function searching(req, res) {
    if (req.query.type === 'user') {
        console.log('1');
        Users.find({name: { $regex : req.query.key, $options : 'i' }}, function(err, result){
        	return err ? res.sendStatus(404) : res.send(result);
        });

    } else if (req.query.type === 'post') {
        console.log('2');

        // TODO req.query.method -> array, search by multiple method
        Posts.find({[req.query.method]: { '$regex' : req.query.key, '$options' : 'i' }}, function(err,result){
            return err ? res.sendStatus(404) : res.send(result);
        });
    }
};


function finduser(req,res){
    console.log('hi');
    var user = new Users();
    Users.find({name: req.query.name}, function(err, result){
        return err ? res.sendStatus(404) :
            res.render('otheruser',{result: result });
    });
}

function forum(req, res) {

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
    });
}

function stories(req, res) {

    var total = 0;
    var array = [];
    var storiesArray = [];
    Posts.find(function (err, posts) {
        if (err) {
            return res.sendStatus(404);
        }
        posts.forEach(function(element) {
            if (element.type === "stories") {
                total++;
            }
            if (element.type === "stories" && array.length <= req.query.page * 12) {
                storiesArray.push(element);
            }
        });

        for (var i = (req.query.page - 1)  * 12; i < req.query.page * 12; i++) {
            storiesArray.push(array[i]);
        }
    });


    res.render('forum', {
        section: "stories",
        array: storiesArray,
        total: total,
    });
};

function artifacts(req, res) {

    var total = 0;
    var array = [];
    var artifactsArray = [];
    Posts.find(function (err, posts) {
        if (err) {
            return res.sendStatus(404);
        }

        posts.forEach(function(element) {
            if (element.type === "artifacts") {
                total++;
            }
            if (element.type === "artifacts" && array.length <= req.query.page * 12) {
                array.push(element);
            }
        });

        for (var i = (req.query.page - 1)  * 12; i < req.query.page * 12; i++) {
            artifactsArray.push(array[i]);
        }
    });

    res.render('forum', {
        section: "artifacts",
        array: artifactsArray,
        total: total,
    });
};

function postpage(req, res) {
    Posts.find({_id: req.query.postId}, function(err, result){
        return err ? res.sendStatus(404) :
            res.render('post',{result: result });
    });
};

module.exports.init = init;

module.exports.createUser = createUser;
module.exports.allUsers = allUsers;

module.exports.searching = searching;

module.exports.createPost = createPost;
module.exports.finduser = finduser;

module.exports.forum = forum;
module.exports.postpage = postpage;
module.exports.artifacts = artifacts;
module.exports.stories = stories;
