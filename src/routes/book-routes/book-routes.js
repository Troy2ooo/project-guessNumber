const express = require('express');
const bookService = require('../../services/books-service/books-service');
const router = express.Router();

router.get('/with-authors', bookService.getAllBooksWithAuthors);
router.get('/with-authors/:id', bookService.getBookWithAuthor);

router.get('/', bookService.getAllBooks);
router.get('/:id', bookService.getBookById);
router.post('/', bookService.createBook);
router.delete('/:id', bookService.deleteBook);
router.put('/:id/status', bookService.updateBookStatus);

module.exports = router;
