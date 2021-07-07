const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');
module.exports = function() {
// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        console.log("info: Successfully connected to the database");    
    }).catch(err => {
        console.log('info: Could not connect to the database.', err);
        process.exit();
    });}