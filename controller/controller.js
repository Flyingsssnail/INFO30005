var mongoose  = require ('mongoose');
var Users = mongoose.model('users');


var createUser = function(req,res){
    var user = new Users({
        "name":req.body.name,
        "level":req.body.level,
        "gender":req.body.gender,
        "age":req.body.age,
    });
    Users.create(user, function(err,newUser){
        if (err) {
            res.sendStatus(400);   
        }
    });
    
    res.send(`You have successfully registered.
	${user}`);
};

var getUsers = function(req,res){
	res.send(Users);
};

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;