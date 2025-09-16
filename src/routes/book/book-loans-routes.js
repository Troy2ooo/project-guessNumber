const express = require('express');
const loansService = require('../../services/books/books-loans-service');
const router = express.Router();

router.get('/', loansService.getAllLoans);
router.get('/:id', loansService.getLoan);


module.exports = router;
