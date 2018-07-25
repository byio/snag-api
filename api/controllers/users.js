const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.users_signup = (req, res, next) => {
  const {
    accountType,
    email,
    password,
    countryCode,
    phoneNumber,
    address
  } = req.body;
  User.find({ email })
    .exec()
    .then(userArr => {
      if (userArr.length > 0) {
        if (!!(userArr.filter(user => user.accountType === accountType).length)) {
          return res.status(409).json({
            message: 'Email is already in use.'
          });
        }
      }
    })
  // email checks out; hash password
  bcrypt.hash(password, 10, (error, hash) => {
    if (error) {
      return res.status(500).json({ error });
    } else {
      const newUser = new User({
        _id: mongoose.Types.ObjectId(),
        accountType,
        email,
        password,
        countryCode,
        phoneNumber,
        address
      });
      newUser.save()
        .then(result => {
          res.status(201).json({
            message: 'Registration successful!',
            result
          });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    }
  });
};
