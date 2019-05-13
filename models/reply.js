var mongoose  = require ('mongoose');

var ReplySchema = mongoose.Schema({
    "author":{type: String, ref: "users"},
    "parentPost":String,
    "postDate":{type:Date, default: Date.now},
    "content":{type: String, ref: "posts"},
    }
);

module.exports = mongoose.model('reply',ReplySchema);

