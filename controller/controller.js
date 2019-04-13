var mongoose  = require ('mongoose');
var Users = mongoose.model('users');

var createUsers = function(req,res){
	
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

    res.send(`You have successfully registered.
	${user}`);
    res.ended;
};

 // find by id

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
var oneUser = function(req, res) {
    var username = req.params.name;
    Users.find({name: username}, function(err,user){
        if (!err) {
            res.send(user);
        }
        else{
            res.sendStatus(404);
        }
    });
};

// db
// hardcode


module.exports.createUsers = createUsers;
//module.exports.getUser = getUser;
module.exports.allUsers = allUsers;
module.exports.oneUser =oneUser;


