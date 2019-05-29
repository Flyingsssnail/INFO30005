var mongoose  = require ('mongoose');

var TipSchema = mongoose.Schema({
        "title":String,
        "paragraph1":String,
        "paragraph2":String,
        "type": String,
        "author":{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        "id":Number

    }
);

module.exports = mongoose.model('tips',TipSchema);