const express = require('express');
const userService = require('../services/user-service');
const router = express.Router();

router.get('/', userService.getAllUsers);
router.get('/:user_id', userService.getOneUser);
router.post('/', userService.createUser);

module.exports = router;
