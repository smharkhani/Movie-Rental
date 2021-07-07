const httpStatus = require('http-status');
const { Customer } = require('../../models/customer.model');
// Create and Save a new Movie
exports.create = (req, res) => {
  // Validate request
  if(!req.body) {
      return res.status(400).send({
          message: "Please fill all required field"
      });
  }

  // Create a new Movie
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });

  // Save movie in the database
  customer.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: err.message || "Something went wrong while creating new user."
      });
  });
};