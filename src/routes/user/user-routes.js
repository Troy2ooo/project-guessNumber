const express = require('express');
const userService = require('../../services/user/user-service');
const router = express.Router();

router.get('/', userService.getAllUsers);
router.get('/:user_id', userService.getOneUser);
router.post('/', userService.createUser);
router.put('/', userService.updateUserName);
router.patch('/', userService.updateUserMail);
router.delete('/users/:id', userService.deleteUser);


module.exports = router;
