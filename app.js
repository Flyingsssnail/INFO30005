const express = require('express');
const bodyParser = require("body-parser");
const users = require('./models/users');
const app = express();

// 404 返回 样本
/*

*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up our route
var routes  = require ('./routes/routes.js');
app.use('/',routes);

//***********************4.2

// port listen to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){ console.log(`Express listening on port ${PORT}`);
});