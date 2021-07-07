const express = require('express');
const { clear } = require('winston');
require('express-async-errors');
// create express app
const app = express();

// colling startup files
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/dbconfig')();
require('./startup/config')();

// Setup server port
const port = (8080);
// listen for requests
app.listen(port);

console.log(`info: ON PORT ${port}`);
