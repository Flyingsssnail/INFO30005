var mongoose  = require ('mongoose');

var PostSchema = mongoose.Schema({
    "author":String,
    "postDate":{type:Date, default: Date.now},
    "editDate":{type:Date, default: Date.now},
    "title":String,
    "content":String,
    // TODO
    // "content":HTMLCollection,
    // "comments":[HTMLCollection],
    "tag":[String],
    "rating":Number
    }
);

module.exports = mongoose.model('posts',PostSchema);

