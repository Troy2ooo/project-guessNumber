const express = require('express');
const userService = require('../services/user-service');
const router = express.Router();

router.get('/', userService.getUsers);
router.get('/', userService.getUser)

module.exports = router;


// const pool = require('./db');

// // Пример использования
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Ошибка выполнения запроса', err);
//     return;
//   }
//   console.log('Результат запроса:', res.rows);
// });