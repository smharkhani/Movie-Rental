const express = require('express');
const userRoutes = require('../routes/user.routes');
const customerRoutes = require('../routes/customer.routes');
const movieRoutes = require('../routes/movie.routes');
const genreRoutes = require('../routes/genre.routes');
const rentalsRoutes = require('../routes/rentals.routes');
const authRoutes = require('../routes/auth.routes');
const bodyParser = require('body-parser');

module.exports = (app) => {

  // parse requests of content-type - application/x-www-form-urlencoded, application/json
  app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }))

  // define a root/default route
  app.get('/', (req, res) => {
    res.json({"message": "Hello World"});
  });

  app.use(express.json());
  // users
  app.use('/api/user', userRoutes);
  // customer
  app.use('/api/customer', customerRoutes);
  // genres
  app.use('/api/genre', genreRoutes);
  // movies
  app.use('/api/movie', movieRoutes);
  // rentals
  app.use('/api/rentals', rentalsRoutes);
  // auth
  app.use('/api/auth', authRoutes);

}


