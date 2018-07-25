const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
      if (userArr.filter(user => user.accountType === accountType).length > 0) {
        return res.status(409).json({
          message: 'Email is already in use.'
        });
      } else {
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({ error });
          } else {
            const newUser = new User({
              _id: mongoose.Types.ObjectId(),
              accountType,
              email,
              password: hash,
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
      }
    });
};

exports.users_login = (req, res, next) => {
  const { accountType, email } = req.body;
  User.findOne({
    email,
    accountType
  })
    .exec()
    .then(user => {
      console.log(`user: ${req.body.password}`);
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed. stage 1'
        })
      }
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: 'Authentication failed. stage 2'
          })
        }
        if (result) {
          const jwtPayload = {
            email,
            userId: user._id
          };
          const jwtSecret = process.env.JWT_SECRET;
          const jwtOptions = { expiresIn: '12h' };
          const token = jwt.sign(jwtPayload, jwtSecret, jwtOptions);
          return res.status(200).json({
            message: 'Authentication successful.',
            token
          });
        }
        res.status(401).json({
          message: 'Authentication failed. stage 3'
        });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
    })
};
