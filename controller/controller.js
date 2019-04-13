var mongoose  = require ('mongoose');
var Users = mongoose.model('users');

var createUsers = function(req,res){
	
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

    res.send(`You have successfully registered.
	${user}`);
    res.ended;
};

 // find by id
var getUser = function(req,res){
    res.send(Users.find({":id":req.body.id}));
    res.ended;
};

// find all user
var allUsers = function(req,res){
    res.send(Users);
    res.ended;
};

//find by name
var oneUser = function(req, res) {
    var username = req.params.name;
    Users.find({name: username}, function(err,username){
        if(!err) {
            res.send(username);
        }else{
            res.sendStatus(404);
        }
    });
};

// db
// hardcode


module.exports.createUsers = createUsers;
module.exports.getUser = getUser;
module.exports.allUsers = allUsers;
module.exports.oneUser =oneUser;


