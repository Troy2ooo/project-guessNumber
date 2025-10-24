"use strict";
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'express'.
var express = require('express');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var userService = require('../../services/user-service/user-service');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
var router = express.Router();
router.get('/', userService.getAllUsers);
router.get('/:id', userService.getOneUser);
router.post('/', userService.createUser);
router.put('/:id', userService.updateUser);
router.patch('/', userService.updateUserMail);
router.delete('/:id', userService.deleteUser);
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = router;
