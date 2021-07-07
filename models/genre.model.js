const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
}, {
    timestamps: true
});

const Genre = mongoose.model('Genre', genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;
