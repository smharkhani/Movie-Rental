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
  if(!user) {
    return res.status(400).send('Invalid email or password');
  }
  var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const valid = emailRegex.test(req.body.email);
  if(!valid) {
    return res.status(400).send('Enter valid email');
  }
  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword){
    return res.status(400).send('Invalid email or password ');
  } 
  

  const token = user.generateAuthToken();
  res.json({token, user})

};