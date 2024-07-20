const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  deleteUser,
} = require('../Controllers/AuthController');

router.post('/register', register);

router.post('/login', login);
router.post('/logout', logout);
router.post('/deleteUser', deleteUser);

module.exports = router;
