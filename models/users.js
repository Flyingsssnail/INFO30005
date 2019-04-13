/**
 * http://usejsdoc.org/
 */


const mongoose  = require ('mongoose');


const UserSchema = mongoose.Schema({
    "id":Number,
    "name":String,
    "gender":String,
    "exp":Number
    }
);

module.exports = mongoose.model('users',UserSchema);

