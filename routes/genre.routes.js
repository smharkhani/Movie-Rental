const express = require('express');
const router = express.Router();
const genreGet = require('../controller/genre/genre.get');
// const movieUpdate = require('../controller/movie.put');
const genreCreate = require('../controller/genre/genre.post');
const { admin } = require('../middleware/admin.mdl');
const { auth } = require('../middleware/auth.mdl');
// const movieDelete = require('../controller/movie.delete');

// Retrieve all movies
router.get('/', genreGet.findAll);

// Create a new movie
router.post('/', [auth,admin], genreCreate.create);

// Retrieve a single movie with id
router.get('/:id', [auth], genreGet.findOne);

// Update a movie with id
// router.put('/:id', movieUpdate.update);

// Delete a movie with id
// router.delete('/:id', [auth, admin], genreDelete.delete);

module.exports = router