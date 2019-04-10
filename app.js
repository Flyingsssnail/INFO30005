const express = require('express');
const bodyParser = require("body-parser");
const users = require('./models/users');
const app = express();

// 404 返回 样本
/*
app.get('/people/:id', function(req, res){
	if (req.params.id >= array.length) {
		return res.status(404).send('Not found');
	}
	return res.send(users[req.params.id]);a
});
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/people', function (req, res){
	users.allUsersFile(req, res);
});

// post 命令
app.get('/register', function(req, response) {
	response.sendFile(__dirname+'/sample.html');
});

app.post('/register', function(request, response) {
	console.log('1\n');
	users.addUser(request.body.firstname, request.body.lastname);
	response.end();
})

// port listen to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){ console.log(`Express listening on port ${PORT}`);
});