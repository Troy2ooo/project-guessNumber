// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const authService = require('../../services/auth-service/auth-service');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'authentica... Remove this comment to see the full error message
const { authenticateToken } = require('../../middleware/auth-middleware');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router();

router.post('/register', authService.registerUser);
router.post('/login', authService.loginUser);
router.get('/profile', authenticateToken, authService.getProfile);
router.post('/refresh', authService.refreshAccessToken)

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router; 