const express = require('express');

const UserController = require('../controllers/users');

const router = express.Router();

router.post('/signup', UserController.users_signup);

module.exports = router;
