const { request } = require('express');
const httpStatus = require('http-status');
const { Movie } = require('../../models/movie.model');
const { Rental } = require('../../models/rentals.model');
const { Customer } = require('../../models/customer.model');
const Fawn = require('fawn');
const Mongoose  = require('mongoose');

Fawn.init(Mongoose);

// Create and Save a new Movie
exports.create = async (req, res) => {

  // Validate request
  if(!req.body) {
      console.log(req.body);
      return res.status(400).send("Please fill all required field");
  }
  console.log("movieId" + req.body.movieId);

  const movie = await Movie.findById(req.body.movieId);
  console.log("movie" + movie);
  if(!movie) return res.status(400).send('Invalid movie');

  const customer = await Customer.findById(req.body.customerId);
  console.log("customer" + customer);
  if(!customer) return res.status(400).send('Invalid movie');

  console.log( "numberInStock" + movie.numberInStock);
  if(movie.numberInStock === 0) return res.status(400).send('Stock is not available...') 


  // Create a new rentals
  const rentals = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
    dateOut: req.body.dateOut,
    dateReturned: req.body.dateReturned,
    rentalFee: req.body.rentalFee,
  });

  console.log("rentals" + rentals);

  // Save rentals in the database
  try {
    new Fawn.Task()
      .save('rentals', rentals)
      .update('movies', { _id: movie._id } , {
        $inc: { numberInStock: -1 }
      })
      .run();

    res.send(rentals);
  }
  catch(err) {
    res.status(500).send({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong while creating new user."
    });
  };

  // await rentals.save()
  //   .then(data => {
  //       res.send(data);
  //   }).catch(err => {
  //       res.status(500).send({
  //           status: httpStatus.INTERNAL_SERVER_ERROR,
  //           message: err.message || "Something went wrong while creating new user."
  //       });
  //   });
  // movie.numberInStock--;
  // movie.save();
};