/**
 * http://usejsdoc.org/
 */
const gender = {
    HIDDEN: 0,
    MALE: 1,
    FEMALE: 2,
    OTHER: 3
};


var mongoose  = require ('mongoose');

var UserSchema = mongoose.Schema({
    "name":String,
    "gender":Number,
    "exp":Number
    }
);

module.exports = mongoose.model('users',UserSchema);

