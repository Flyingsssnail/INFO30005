var mongoose  = require ('mongoose');

var ReplySchema = mongoose.Schema({
    "author":{ type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    "parentPost":String,
    "postDate":{type:Date, default: Date.now},
    "content":String,
    }
);

module.exports = mongoose.model('reply',ReplySchema);

