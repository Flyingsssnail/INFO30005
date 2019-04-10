/**
 * http://usejsdoc.org/
 */



var mongoose  = require ('mongoose');

mongoose.connect('mongodb+srv://Cyclone:ZF_qBFT4\\d.yFnxm@cluster0-dlhws.mongodb.net/test?retryWrites=true',function(err) {
	if (!err) {
		console.log('Connect to mongo');
	} else {
		console.log('Fail');
	}
});

require ('./users.js');