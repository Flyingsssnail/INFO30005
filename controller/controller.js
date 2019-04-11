var mongoose  = require ('mongoose');
var Users = mongoose.model('users');

var createUsers = function(req,res){
	
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

    res.send(`You have successfully registered.
	${user}`);
    res.ended;
};

var getUser = function(req,res){
    res.send(Users.find({"id":req.body.id}));
    res.ended;
};

var allUsers = function(req,res){
    res.send(Users);
    res.ended;
};


// db
// hardcode


module.exports.createUsers = createUsers;
module.exports.getUser = getUser;
module.exports.allUsers = allUsers;


