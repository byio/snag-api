// import dependencies
const express = require('express');

// start app
const app = express();

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
