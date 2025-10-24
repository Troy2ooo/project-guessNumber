// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'loansServi... Remove this comment to see the full error message
const loansService = require('../../services/books-service/books-loans-service');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'authentica... Remove this comment to see the full error message
const { authenticateToken } = require('../../middleware/auth-middleware');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router();

router.get('/', loansService.getAllLoans);
router.get('/:id', loansService.getLoan);
router.post('/:id', authenticateToken, loansService.checkoutBook); //доработать
router.patch('/:id', authenticateToken, loansService.returnBook);

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
