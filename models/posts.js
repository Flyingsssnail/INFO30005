const mongoose  = require ('mongoose');

const PostSchema = mongoose.Schema({
        "id":Number,
        "author":String,
        "postDate":Date,
        "editDate":Date,
        "title":String,
        "content":String,
        // TODO
        // "content":HTMLCollection,
        // "comments":[HTMLCollection],
        "tag":[String],
        "rating":Number,
    }
);


module.exports = model('search',PostSchema);

