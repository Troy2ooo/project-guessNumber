const express = require('express');
const loansService = require('../../services/books-service/books-loans-service');
const router = express.Router();

router.get('/', loansService.getAllLoans);
router.get('/:id', loansService.getLoan);


const { authenticateToken } = require('../../middleware/auth-middleware');


router.post('/checkout/:id', authenticateToken, loansService.checkoutBook);
router.post('/return/:id', authenticateToken, loansService.returnBook);




module.exports = router;
