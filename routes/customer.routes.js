const express = require('express');
const router = express.Router();

const customerGet = require('../controller/customer/customer.get');
// const movieUpdate = require('../controller/movie.put');
const customerCreate = require('../controller/customer/customer.post');
// const movieDelete = require('../controller/movie.delete');

// Retrieve all movies
router.get('/', customerGet.findAll);

// Create a new movie
router.post('/', customerCreate.create);

// Retrieve a single movie with id
router.get('/:id', customerGet.findOne);

// Update a movie with id
// router.put('/:id', movieUpdate.update);

// Delete a movie with id
// router.delete('/:id', movieDelete.delete);

module.exports = router