/**
 * http://usejsdoc.org/
 */



var mongoose  = require ('mongoose');

const uri = 'mongodb+srv://Cyclone:Cyclone123456@cluster0-dlhws.mongodb.net/test?retryWrites=true';

mongoose.connect(uri, { useNewUrlParser: true }, function(err) {
	if (!err) {
		console.log('Connect to mongo');
	} else {
		console.log('Fail');
		console.log(err);
	}
});

require ('./users.js');