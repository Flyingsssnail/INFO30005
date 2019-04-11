/**
 * http://usejsdoc.org/
 */
//********************  4.09
const gender = {
    HIDDEN:0,
    MALE: 1,
    FEMALE: 2,
    OTHER: 3
};


var mongoose  = require ('mongoose');
var UserSchema = mongoose.Schema({
    "id":Number,
    "name":String,
    "gender":gender,
    "exp":Number
    }
);

module.exports = mongoose.model ('users',UserSchema);

