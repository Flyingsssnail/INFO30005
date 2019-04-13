import * as params from "mongoose";

var mongoose  = require ('mongoose');
var Users = mongoose.model('users');
var Posts = mongoose.model('posts');


function createUser(req,res){
	
    var user = new Users({
        "id":0,
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
function allUsers(req,res){
    res.send(Users);
    res.ended;
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

