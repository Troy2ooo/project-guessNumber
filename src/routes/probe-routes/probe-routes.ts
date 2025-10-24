"use strict";
import express  from "express";

import {getHello} from '../../services/probe-service/get-hello';
var getTime = require('../../services/probe-service/get-time-for-db').getTime;
var router = express.Router();
router.get('/', getHello);
router.get('/db', getTime);

export default router;
