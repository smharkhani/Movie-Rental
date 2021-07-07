const express = require('express');
const router = express.Router();

const rentalsGet = require('../controller/rentals/rentals.get');
// const movieUpdate = require('../controller/movie.put');
const rentalsCreate = require('../controller/rentals/rentals.post');
// const movieDelete = require('../controller/movie.delete');

// Retrieve all movies
router.get('/', rentalsGet.findAll);

// Create a new movie
router.post('/', rentalsCreate.create);

// Retrieve a single movie with id
router.get('/:id', rentalsGet.findOne);

// Update a movie with id
// router.put('/:id', movieUpdate.update);

// Delete a movie with id
// router.delete('/:id', movieDelete.delete);

module.exports = router