const express = require('express');
const loansService = require('../../services/books-service/books-loans-service');
const { authenticateToken } = require('../../middleware/auth-middleware');

const router = express.Router();

router.get('/', loansService.getAllLoans);
router.get('/:id', loansService.getLoan);
router.post('/:id', authenticateToken, loansService.checkoutBook); //доработать
router.patch('/:id', authenticateToken, loansService.returnBook);

module.exports = router;
