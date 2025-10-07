
const express = require('express');
const usersService = require('../services/user/auth/auth-service');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth-middleware');

console.log(authenticateToken);

router.post('/register', usersService.registerUser);
router.post('/login', usersService.loginUser);
router.get('/profile', authenticateToken, usersService.getProfile);


module.exports = router;
