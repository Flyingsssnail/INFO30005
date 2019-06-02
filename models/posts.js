var mongoose  = require ('mongoose');

var PostSchema = mongoose.Schema({
    "author":{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    "reply":[{ type: mongoose.Schema.Types.ObjectId, ref: 'reply' }],
    "postDate":{type:Date, default: Date.now},
    "editDate":{type:Date, default: Date.now},
    "title":String,
    "content":String,
    "tag":{type:[String], default:[]},
    "likes":{type:Number, default:0},
    "type": String,
    }
);

module.exports = mongoose.model('posts',PostSchema);

