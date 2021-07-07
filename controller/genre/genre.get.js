const {Genre} = require('../../models/genre.model');
const httpStatus = require('http-status');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  Genre.find()
    .then(genres => {
        res.status(200).send({
            status: httpStatus.OK,
            message: 'data fatch success',
            data: genres,
        });
    }).catch(err => {
        res.status(500).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message || "Something went wrong while getting list of users."
        });
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {
  Genre.findById(req.params.id)
    .then(genres => {
      if(!genres) {
          return res.status(404).send({
              status: httpStatus.NOT_FOUND,
              message: "User not found with id " + req.params.id
          });            
      }
      res.send(genres);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              status: httpStatus.NOT_FOUND,
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Error getting user with id " + req.params.id
      });
  });
};