const mongoose = require('mongoose');
const { genreSchema } = require('./genre.model');

const movieSchema = mongoose.Schema({
    title: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 255
    },
    genre: {
      type: genreSchema,
      require: true,
    },
    numberInStock: Number,
    dailyRentalRate: Number
}, {
    timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

exports.movieSchema = movieSchema ;
exports.Movie = Movie;