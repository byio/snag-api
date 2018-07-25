const mongoose = require('mongoose');

const isSeller = (accountType) => accountType === 'seller';

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
    type: String
  },
  sellerRatings: {
    type: Number,
    default: 0
  },
  buyerRatings: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', userSchema);
