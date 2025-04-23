const express = require('express');
const { getHello } = require('../../services/probe/get-hello');
const { getTime } = require('../../services/probe/get-time-for-db');

const router = express.Router();

router.get('/', getHello);
router.get('/db', getTime);


module.exports = router;