var mongoose  = require ('mongoose');

var UserSchema = mongoose.Schema({
    "name":String,
    "firstname":String,
    "lastname":String,
    "gender":String,
    "exp":{type:Number, default: 0},
    "phone":{type:Number, default: 0},
    "rank":{type:Number, default: 0},
    "email":String,
    "collect": {type:Number, default: 0},
    "following":{type:Number, default: 0},
    "liked":{type:Number, default: 0},
    "likes":{type:Number, default: 0},
    "followers":{type:Number, default: 0},
    "password":String,
    "avatar":{type:String, default: '/images/default.png'},

    }
);

module.exports = mongoose.model('users',UserSchema);

