var mongoose  = require ('mongoose');

var TipSchema = mongoose.Schema({
        "title":String,
        "paragraph1":String,
        "paragraph2":String,
        "type": String,
        "author":String,
        "id":Number

    }
);

module.exports = mongoose.model('tips',TipSchema);