const express = require('express');
const usersService = require('../../services/auth-service/auth-service');
const { authenticateToken } = require('../../middleware/auth-middleware');

const router = express.Router();

router.post('/register', usersService.registerUser);
router.post('/login', usersService.loginUser);
router.get('/profile', authenticateToken, usersService.getProfile);

module.exports = router;
