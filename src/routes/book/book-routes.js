const express = require('express');
const bookService = require('../../services/books/books-service');
const router = express.Router();

router.get('/with-authors', bookService.getAllBooksWithAuthors);
router.get('/with-author/:id', bookService.getBookWithAuthor);

router.get('/', bookService.getAllBooks);
router.get('/:id', bookService.getBook);
router.post('/', bookService.createBook);
router.delete('/:id', bookService.deleteBook);



module.exports = router;
