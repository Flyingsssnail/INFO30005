/**
 * http://usejsdoc.org/
 */
//********************  4.09
//const gender = {
//    HIDDEN: 0,
//    MALE: 1,
//    FEMALE: 2,
//    OTHER: 3
//};


const mongoose  = require ('mongoose');


const UserSchema = mongoose.Schema({
    "id":Number,
    "name":String,
    "gender":Number,
    "exp":Number
    }
);

module.exports = mongoose.model('users',UserSchema);

