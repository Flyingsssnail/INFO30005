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
    }
);

module.exports = mongoose.model('users',UserSchema);

