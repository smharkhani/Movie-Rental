const express = require('express');
const router = express.Router();

const authGet = require('../controller/auth/auth.get');
// const authUpdate = require('../controller/auth.put');
const authCreate = require('../controller/auth/auth.post');
const { auth } = require('../middleware/auth.mdl');
// const authDelete = require('../controller/auth.delete');

// Retrieve all auth
router.get('/', authGet.findAll);

// Create a new auth
router.post('/', authCreate.create);

// Retrieve a single auth with id
router.get('/:id', authGet.findOne);

// Update a auth with id
// router.put('/:id', authUpdate.update);

// Delete a auth with id
// router.delete('/:id', authDelete.delete);

module.exports = router