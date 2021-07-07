const express = require('express');
const router = express.Router();

const userGet = require('../controller/user/user.get');
// const userUpdate = require('../controller/user.put');
const userCreate = require('../controller/user/user.post');
// const userDelete = require('../controller/user.delete');

// Retrieve all user
router.get('/', (req, res) => {
  User.find()
    .then(datas => {
        res.status(200).send({
            status: httpStatus.OK,
            message: 'data fatch success',
            data: datas,
        });
    }).catch(err => {
        res.status(500).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message || "Something went wrong while getting list of users."
        });
    });
});

// Create a new user
router.post('/', async(req, res) => {

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

});

// Retrieve a single user with id
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(datas => {
      if(!datas) {
          return res.status(404).send({
              status: httpStatus.NOT_FOUND,
              message: "User not found with id " + req.params.id
          });            
      }
      res.send(datas);
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
});

// Update a user with id
// router.put('/:id', userUpdate.update);

// Delete a user with id
// router.delete('/:id', userDelete.delete);

module.exports = router