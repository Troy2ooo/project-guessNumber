const express = require('express');
const loansService = require('../../services/books/books-loans-service');
const router = express.Router();

router.get('/', loansService.getAllLoans);
router.get('/:id', loansService.getLoan);
router.get('/', loansService.getAllLoans);
router.get('/:id', loansService.getLoan);


router.post('/checkout/:id', authenticateToken, loansService.checkoutBook);
router.post('/return/:id', authenticateToken, loansService.returnBook);




module.exports = router;
