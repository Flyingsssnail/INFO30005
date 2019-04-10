var mongoose  = require ('mongoose');
var Users = mongoose.model('users');

var createUsers = function(req,res){
    var users = new Users({
        "name":req.body.name,
        "level":req.body.level,
        "rating":req.body.rating,
    });

    users.save(function(err,newUser){
        if (!err) {
            res.send(newUsers);
        }
        else{
            res.sendStatus(400);
        }
    });
};


var rateUsers = function(req,res){

};

var findUsers = function(req,res){

};

module.exports.createUsers = createUsers;
module.exports.rateUsers = rateUsers;
module.exports.findUsers = findUsers;