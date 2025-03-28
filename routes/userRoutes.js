const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');

router.get('/', userController.getUsers);

module.exports = router;
