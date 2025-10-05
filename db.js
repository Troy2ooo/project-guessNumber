require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Ошибка подключения к базе данных', err);
  } else {
    console.log('Успешное подключение к базе данных');
    release(); // Освобождаем клиента после использования
  }
});

console.log('Подключение к базе данных:', process.env.DB_NAME);


module.exports = pool;
