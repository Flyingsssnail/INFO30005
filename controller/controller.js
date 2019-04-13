import * as params from "mongoose";

var mongoose  = require ('mongoose');
var Users = mongoose.model('users');
var Posts = mongoose.model('posts');


function createUser(req,res){
	
	var genderArray = ["female", "male", "hidden", "other"];
	
	// only specified string in genderArray are allowed to be entered;
	
	if (genderArray.indexOf(req.body.gender) == -1) {
		res.send("Sorry, your gender cannot be recognized by the website.");
		res.sendStatus(406);
	}
	
    var user = new Users({
        "name":req.body.name,
        "gender":req.body.gender,
        "exp":0
    });
    
    Users.create(user, function(err){
        if (err) {
            res.sendStatus(400);
            res.ended;
        }
    });

    res.send('You have successfully registered.${user}');
    res.ended;
};


function createPost(req,res){

    var post = new Posts({
        "id":0,
        "author":Users.findOne({id : req.param.userid}, function (err, usr) { return usr }),
        "postDate":Date.now,
        "editDate":Date.now,
        "title":req.param.title,
        "content":req.param.content,
        // TODO param array to array
        "tag":[],
        "rating":Number.NaN,
    });

    Posts.create(post, function(err){
        if (err) {
            res.sendStatus(400);
            res.ended;
        }
    });

    res.send(post);
    res.ended;
};

 // find by id
function getUser(req,res){
    res.send(Users.find({id : req.body.id}));
    res.ended;
};

// find all user
var allUsers = function(req,res){
    Users.find(function(err, users) {
    	if (!err) {
    		res.send(users);
    	}
    	else {
    		res.sendStatus(404);
    	}
    });
};

//find by name
function searching(req, res) {
    if (req.params.type === 'user') {
        Posts.find({name: { '$regex' : req.params.key, '$options' : 'i' }}, function(err,result){
            if(!err) {
                res.send(result);
            }else{
                res.sendStatus(404);
            }
        });

    } else if (req.params.type === 'post') {

        // TODO req.params.method -> array, search by multiple method
        Posts.find({[req.params.method]: { '$regex' : req.params.key, '$options' : 'i' }}, function(err,result){
            if(!err) {
                res.send(result);
            }else{
                res.sendStatus(404);
            }
        });
    }
    res.ended;
};


module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.allUsers = allUsers;

module.exports.searching = searching;

module.exports.createPost = createPost;

