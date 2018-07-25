const express = require('express');

const UserController = require('../controllers/users');

const router = express.Router();

router.post('/signup', UserController.users_signup);
router.post('/login', UserController.users_login);

module.exports = router;
