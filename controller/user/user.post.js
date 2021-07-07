const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const { User } = require('../../models/user.model');
const _ = require('lodash');

// Create and Save a new Movie
exports.create =  async(req, res) => {

  // Validate request
  if(!req.body) {
      return res.status(400).send({
          message: "Please fill all required field"
      });
  }

  const user = await User.findOne({email: req.body.email});
  if(user) {
    return res.status(400).send('email already exist');
  }

  // Create a new Movie
  // const users = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });
    
  // Create a new User using lodash
  const users = new User(_.pick(req.body, ['name', 'email', 'password']));


  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(users.password, salt);

  // Save movie in the database
  users.save()
  .then( data => {  

    // genrate the token
    const token = users.generateAuthToken();
    // send header
    res.header('x-auth-token', token).send(_.pick(data, ['name', 'email', 'password']));

  }).catch(err => {
      res.status(500).send({
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: err.message || "Something went wrong while creating new user."
      });
  });

};