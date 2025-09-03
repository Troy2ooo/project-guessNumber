const express = require('express');
const bookService = require('../../services/books/books-service');
const router = express.Router();

router.get('/', bookService.getAllBooks);
router.get('/:id', bookService.getBook);
router.post('/', bookService.createBook);
router.delete('/:id', bookService.deleteBook);

module.exports = router;
