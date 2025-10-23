const express = require('express');
const authService = require('../../services/auth-service/auth-service');
const { authenticateToken } = require('../../middleware/auth-middleware');

const router = express.Router();

router.post('/register', authService.registerUser);
router.post('/login', authService.loginUser);
router.get('/profile', authenticateToken, authService.getProfile);
router.post('/refresh', authService.refreshAccessToken)

module.exports = router; 