var mongoose  = require ('mongoose');

var ReplySchema = mongoose.Schema({
    "author":String,
    "parentPost":String,
    "postDate":{type:Date, default: Date.now},
    "content":String,
    }
);

module.exports = mongoose.model('reply',ReplySchema);

