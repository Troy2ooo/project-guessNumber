"use strict";
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
var express = require('express');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loansServi... Remove this comment to see the full error message
var loansService = require('../../services/books-service/books-loans-service');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
var router = express.Router();
router.get('/', loansService.getAllLoans);
router.get('/:id', loansService.getLoan);
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'authentica... Remove this comment to see the full error message
var authenticateToken = require('../../middleware/auth-middleware').authenticateToken;
router.post('/checkout/:id', authenticateToken, loansService.checkoutBook);
router.post('/return/:id', authenticateToken, loansService.returnBook);
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
