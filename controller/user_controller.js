const mongoose  = require ('mongoose');
const Users = mongoose.model('users');

const genderArray = ["female", "male", "hidden", "other"];

// return login page
function getlogin(req, res) { res.sendFile(path.join(__dirname + '/../public/login.html')) }

// register user
function createUser(req,res){

    req.on('data', function (data) {
        var obj = JSON.parse(data);
        Users.findOne({email: obj.email}, function (err, usr) {
            var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

            if (usr) {
                // user already exists
                return res.sendStatus(422);
            } else if(!regex.test(obj.email)){
                // invalid email format
                return res.sendStatus(401);
            } else {
                // create user
                return varified(obj, usr, res);
            }
        });
    });
}

// register user to database
function varified(obj, usr, res) {

    var user = new Users({
        "firstname": obj.firstname ? obj.firstname : "",
        "lastname": obj.lastname ? obj.lastname: "",
        "name": obj.name,
        "gender": obj.gender ? obj.gender : genderArray[2],
        "email": obj.email,
        "password": obj.password,
    });

    Users.create(user, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });
    res.cookie('username',user._id.toString(), {httpOnly: true});
    res.end();
}

// handle login request
function login (req, res) {
    req.on('data', function (data) {
        var obj = JSON.parse(data);
        Users.findOne({email: obj.email}, function (err, usr) {

            if (err || !usr || (obj.password !== usr.password)) {
                // password or email not match
                return res.sendStatus(401);
            } else {
                // cookie are created to keep user logged in
                res.cookie("username", usr._id.toString(), {httpOnly: true});

                // redirect to previous page that user stayed
                var redir = req.query.orig ? req.query.orig : "/";
                res.redirect(redir);
                res.end();
                return true;
            }
        });
    });
}

// handle logout request, remove cookie and redirect to previous page
function logout(req,res) {
    res.cookie('username', '');
    res.redirect(req.query.orig);
    res.end();
}

// get current user's profile, editable
function userprofile(req,res){
    Users.find({_id: req.cookies.username}, function(err, result){
        res.render('otheruser',{result: result, myself: true  });
    });
}

// get a user's profile, non-editable
function viewProfile(req, res) {
    Users.find({_id: req.query.id}, function (err, result) {
        res.render('otheruser', {result: result, myself: false });
    })
}

// handle edit profile request
function editprofile(req, res) {
    Users.findOne({_id: req.cookies.username}, function(err, result) {
        res.render('editprofile', {result: result});
    })
}

module.exports.getlogin = getlogin;
module.exports.login = login;
module.exports.logout = logout;
module.exports.createUser = createUser;
module.exports.userprofile = userprofile;

module.exports.editprofile = editprofile;
module.exports.viewProfile = viewProfile;



