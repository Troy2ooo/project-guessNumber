const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/userController');

router.get('/', userController.getUsers);

module.exports = router;


const pool = require('./db');

// Пример использования
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Ошибка выполнения запроса', err);
    return;
  }
  console.log('Результат запроса:', res.rows);
});