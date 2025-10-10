const express = require('express');
const userService = require('../../services/user-service/user-service');
const router = express.Router();

router.get('/', userService.getAllUsers);
router.get('/:id', userService.getOneUser);
router.post('/', userService.createUser);
router.put('/:id', userService.updateUser);
router.patch('/', userService.updateUserMail);
router.delete('/:id', userService.deleteUser);

module.exports = router;
