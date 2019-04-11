/**
 * http://usejsdoc.org/
 */



//********************  4.09
var mongoose  = require ('mongoose');
var UserSchema = mongoose.Schema({
    "name":String,
    "level":String,
    "gender":String,
    "age":Number,
    }
);

mongoose.model ('users',UserSchema);

