/**
 * http://usejsdoc.org/
 */

var mongoose  = require ('mongoose');

var UserSchema = mongoose.Schema({
    "name":String,
    "gender":String,
    "exp":Number
    }
);

module.exports = mongoose.model('users',UserSchema);

