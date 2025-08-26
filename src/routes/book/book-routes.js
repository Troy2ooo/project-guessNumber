const express = require('express');
const bookService = require('../../services/books/books-service');
const router = express.Router();

router.get('/', bookService.getAllBooks); //дорабоать
router.get('/:book_id', bookService.getOneBook);
router.post('/../', bookService.createBook);
router.delete('/books/:id', bookService.deleteBook);


module.exports = router;