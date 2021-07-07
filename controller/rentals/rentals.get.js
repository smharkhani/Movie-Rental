const {Rental} = require('../../models/rentals.model');
const httpStatus = require('http-status');

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Rental.find()
    .then(users => {
        res.status(200).send({
            status: httpStatus.OK,
            message: 'data fatch success',
            data: users,
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
    Rental.findById(req.params.id)
    .then(user => {
      if(!user) {
          return res.status(404).send({
              status: httpStatus.NOT_FOUND,
              message: "User not found with id " + req.params.id
          });            
      }
      res.send(user);
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