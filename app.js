
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const db = require('./models/db');
var serveStatic = require('serve-static');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/uploads', serveStatic(__dirname + '/uploads'));
app.use(serveStatic(__dirname + '/public'));

app.set('view engine', 'ejs');

//set up our route
var routes  = require ('./routes/routes.js');
app.use('/',routes);

// port listen to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){ console.log(`Express listening on port ${PORT}`);
});