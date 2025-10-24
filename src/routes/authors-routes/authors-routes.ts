// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
const express = require('express');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const authorsService = require('../../services/authors-service/authors-service');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = express.Router();

router.get('/', authorsService.getAllAuthors);
router.get('/:id', authorsService.getAuthor);
router.post('/', authorsService.createAuthor);
router.delete('/:id', authorsService.deleteAuthor);

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
