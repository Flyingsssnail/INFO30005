var mongoose  = require ('mongoose');

var UserSchema = mongoose.Schema({
    "name":{type: String, ref: "posts"},
    "firstname":String,
    "lastname":String,
    "gender":String,
    "exp":{type:Number, default: 0},
    "rank":{type:Number, default: 0},
    "email":String,
    "collect": {type:Number, default: 0},
    "favorites":{type:Number, default: 0},
    "pots":{type:[String], default:[]},
    "reply":{type:Number, default:0},
    "password":String,
    "avatar":{type:String, default: '/images/default.png'},
    }
);

module.exports = mongoose.model('users',UserSchema);

