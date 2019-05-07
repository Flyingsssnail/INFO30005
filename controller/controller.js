var mongoose  = require ('mongoose');
var Users = mongoose.model('users');
var Posts = mongoose.model('posts');

// welcome page
function init(req, res) {
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
        "exp":0
    });
    
    Users.create(user, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });

    return res.send(`You have successfully registered.${user}`);
};

function loggedin (req, res) {
    // var cookie = req.cookies.cookieName;
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

    var post = new Posts({
        // Users.findOne({_id: req.query.id}, function (err, usr) { return usr
		// })
        "author":req.query.author,
        "title":req.query.title,
        "content":req.query.content,
        // TODO param array to array
        "tag":[],
        "rating":0,
    });

    Posts.create(post, function(err){
        if (err) {
            return res.sendStatus(400);
        }
    });

    return res.send(post);
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

module.exports.init = init;

module.exports.createUser = createUser;
module.exports.allUsers = allUsers;

module.exports.searching = searching;

module.exports.createPost = createPost;


