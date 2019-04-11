var mongoose  = require ('mongoose');
var Users = mongoose.model('users');

var createUsers = function(req,res){
    var user = new Users({
        "id":newID(),
        "name":req.body.name,
        "gender":req.body.gender,
        "exp":0
    });
    
    Users.create(user, function(err,newUser){
        if (err) {
            res.sendStatus(400);
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

function newID() {
    return Users.count({}, function (err, count) {
        console.log('User count: %d', count);
    });
};


module.exports.createUsers = createUsers;
module.exports.getUser = getUser;
module.exports.allUsers = allUsers;


