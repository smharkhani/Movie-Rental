const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      minlength: 5,
      maxlength: 25,
      required: true
    },
    phone: {
      type: Number,
      required: true
    }
}, {
    timestamps: true
});

const Customer = mongoose.model('Customer', customerSchema);

exports.customerSchema = customerSchema;
exports.Customer = Customer;