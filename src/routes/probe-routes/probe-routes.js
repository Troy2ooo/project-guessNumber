"use strict";
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
var express = require('express');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getHello'.
var getHello = require('../../services/probe-service/get-hello').getHello;
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getTime'.
var getTime = require('../../services/probe-service/get-time-for-db').getTime;
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
var router = express.Router();
router.get('/', getHello);
router.get('/db', getTime);
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
