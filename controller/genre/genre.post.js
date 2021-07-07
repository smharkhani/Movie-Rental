const {Genre} = require('../../models/genre.model');
const httpStatus = require('http-status');
// Create and Save a new Movie
exports.create = (req, res) => {
  // Validate request
  if(!req.body) {
      return res.status(400).send({
          message: "Please fill all required field"
      });
  }

  // Create a new Movie
  const genres = new Genre({
    name: req.body.name
  });

  // Save movie in the database
  genres.save()
  .then(data => {
      res.send({
        status: httpStatus.OK,  
        datas: data});
  }).catch(err => {
      res.status(500).send({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: err.message || "Something went wrong while creating new user."
      });
  });
};