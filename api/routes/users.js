const express = require('express');

const UsersController = require('../controllers/users');

const router = express.Router();

router.get('/', UsersController.get_all_users);

router.post('/signup', UsersController.users_signup);
router.post('/login', UsersController.users_login);

module.exports = router;
