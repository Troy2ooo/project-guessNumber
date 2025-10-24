"use strict";
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
var express = require('express');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var bookService = require('../../services/books-service/books-service');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
var router = express.Router();
router.get('/with-authors', bookService.getAllBooksWithAuthors);
router.get('/with-authors/:id', bookService.getBookWithAuthor);
router.get('/', bookService.getAllBooks);
router.get('/:id', bookService.getBookById);
router.post('/', bookService.createBook);
router.delete('/:id', bookService.deleteBook);
router.put('/:id/status', bookService.updateBookStatus);
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
