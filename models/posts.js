var mongoose  = require ('mongoose');

var PostSchema = mongoose.Schema({
    "author":{type: String, ref: "users"},
    "postDate":{type:Date, default: Date.now},
    "editDate":{type:Date, default: Date.now},
    "title":String,
    "content":String,
    "reply":[String],
    "tag":[String],
    "rating":Number,
    "type": String,
    }
);

module.exports = mongoose.model('posts',PostSchema);

