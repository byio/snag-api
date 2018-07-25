// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// start app
const app = express();

// import routes
const usersRoutes = require('./api/routes/users');

// dotenv
require('dotenv').config();

// connect to mlab
const uri = `mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds137687.mlab.com:37687/snag`;
mongoose.connect(uri, { useNewUrlParser: true })
  .then(console.log(`Connected to mLab.`));

// morgan logging middleware
app.use(morgan('dev'));

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// use routes
app.use('/users', usersRoutes);

// general error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500)
    .json({
      error: {
        message: error.message
      }
    })
});

// export app
module.exports = app;
