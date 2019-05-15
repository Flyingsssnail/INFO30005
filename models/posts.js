var mongoose  = require ('mongoose');

var PostSchema = mongoose.Schema({
    "author":{type: String, ref: "users"},
    "postDate":{type:Date, default: Date.now},
    "editDate":{type:Date, default: Date.now},
    "title":String,
    "content":String,
    "reply":{type:[String], default:[]},
    "tag":{type:[String], default:[]},
    "likes":{type:Number, default:0},
    "type": String,
    }
);

module.exports = mongoose.model('posts',PostSchema);

