const express = require('express');
const { getHello } = require('../../services/probe-service/get-hello');
const { getTime } = require('../../services/probe-service/get-time-for-db');

const router = express.Router();

router.get('/', getHello);
router.get('/db', getTime);


module.exports = router;