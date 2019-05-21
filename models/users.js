var mongoose  = require ('mongoose');

var UserSchema = mongoose.Schema({
    "name":{type: String, ref: "posts"},
    "firstname":String,
    "lastname":String,
    "gender":String,
    "exp":{type:Number, default: 0},
    "rank":{type:Number, default: 0},
    "email":String,
    "likes": {type:Number, default: 0},
    "post":{type:Number, default: 0},
    "pots":{type:[String], default:[]},
    "reply":{type:Number, default:0},
    "password":String,
    "avatar":{type:String, default: '/images/default.png'},
    "aboutme":{type:String, default: 'This man is lazy, leaving nothing behind..'}
    }
);

module.exports = mongoose.model('users',UserSchema);

