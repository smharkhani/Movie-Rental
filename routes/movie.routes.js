const express = require('express');
const router = express.Router();

const movieGet = require('../controller/movie/movie.get');
// const movieUpdate = require('../controller/movie.put');
const movieCreate = require('../controller/movie/movie.post');
// const movieDelete = require('../controller/movie.delete');

// Retrieve all movies
router.get('/', movieGet.findAll);

// Create a new movie
router.post('/', movieCreate.create);

// Retrieve a single movie with id
router.get('/:id', movieGet.findOne);

// Update a movie with id
// router.put('/:id', movieUpdate.update);

// Delete a movie with id
// router.delete('/:id', movieDelete.delete);

module.exports = router