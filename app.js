const express = require('express');
const pool = require('./src/db'); // Импортируем файл конфигурации базы данных

const app = express();
const port = process.env.PORT || 3000;

// Пример маршрута
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Пример использования базы данных
app.get('/db', (req, res) => {
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      return res.status(500).send(err.toString());
    }
    res.send(result.rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
