/**
 * http://usejsdoc.org/
 */



//********************  4.09
var mongoose  = require ('mongoose');
var UserSchema = mongoose.Schema({
    "name":String,
    "level":String,
    "rating":String,
    }
);

mongoose.model ('users',UserSchema);

