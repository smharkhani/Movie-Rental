const httpStatus = require('http-status');
const { Genre } = require('../../models/genre.model');
const { Movie } = require('../../models/movie.model');

// Create and Save a new Movie
exports.create = async(req, res) => {

  // Validate request
  if(!req.body) {
      console.log(req.body);
      return res.status(400).send("Please fill all required field");
  }

  console.log("Gener Id: " + req.body.genreId);
  const genre = await Genre.findById(req.body.genreId);
  console.log("genre: " + genre);
  if(!genre) return res.status(400).send('Invalid Genre');

  // Create a new Movie
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  console.log("movie" + movie);

  // Save movie in the database
  await movie.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: err.message || "Something went wrong while creating new user."
      });
  });
};