var mongoose  = require ('mongoose');

var UserSchema = mongoose.Schema({
    "name":String,
    "firstname":String,
    "lastname":String,
    "gender":String,
    "exp":Number,
    "phone":Number,
    "rank":Number,
    "email":String,
    "BD":Number,
    "post":Number,
    "collect": Number,
    "following":Number,
    "liked":Number,
    "likes":Number,
    "followers":Number,
    "password":String,
    "avatar":{type:String, default: 'images/default.png'},

    }
);

module.exports = mongoose.model('users',UserSchema);

