/**
 * http://usejsdoc.org/
 */
const gender = {
    HIDDEN:0,
    MALE: 1,
    FEMALE: 2,
    OTHER: 3
};

//********************  4.09
var mongoose  = require ('mongoose');
var UserSchema = mongoose.Schema({
    "id":Number,
    "name":String,
    "gender":gender,
    "exp":Number
    }
);

mongoose.model ('users',UserSchema);

