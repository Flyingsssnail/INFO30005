
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const db = require('./models/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.cookieParser());
app.use(express.static(__dirname + '/public'));

//set up our route
var routes  = require ('./routes/routes.js');
app.use('/',routes);

// port listen to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){ console.log(`Express listening on port ${PORT}`);
});