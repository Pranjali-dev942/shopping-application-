const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  deleteUser,generateToken
} = require('../Controllers/AuthController');

router.post('/register', register);

router.get('/generateToken', generateToken);

router.post('/login', login);
router.post('/logout', logout);
router.post('/deleteUser', deleteUser);

module.exports = router;
