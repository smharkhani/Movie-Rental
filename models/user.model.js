const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = mongoose.Schema({
    name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 1025
    },
    isAdmin: Boolean,
}, {
    timestamps: true
});

// pass auth token through the models [encapsulating]
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

exports.userSchema = userSchema;
exports.User = User; 