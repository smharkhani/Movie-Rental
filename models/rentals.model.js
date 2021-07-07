const mongoose = require('mongoose');
const movieSchema = require('./movie.model');

const rentalsSchema = mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: String,
        isGold: Boolean,
        phone: Number
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: String,
        dailyRentalRate: Number
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturned: Date,
    rentalFee: {
      type: Number,
      min: 0
    },
}, {
    timestamps: true
});

const Rental = mongoose.model('Rental', rentalsSchema);

exports.Rental = Rental;