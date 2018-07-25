const mongoose = require('mongoose');

const isSeller = (role) => role === 'seller';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  accountType: { // seller, buyer, admin
    type: String,
    required: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: isSeller(role)
  },
});

module.exports = mongoose.model('User', userSchema);
