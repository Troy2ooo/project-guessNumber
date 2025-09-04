const express = require('express');
const authorsService = require('../../services/authors/authors-service');
const router = express.Router();

router.get('/', authorsService.getAllAuthors);
router.get('/:id', authorsService.getAuthor);
router.post('/', authorsService.createAuthor);
router.delete('/:id', authorsService.deleteAuthor);

module.exports = router;
