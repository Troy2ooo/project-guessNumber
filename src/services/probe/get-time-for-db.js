// require - функция для подключения модулей. В данном случае она подключает модуль db.

const db = require('../../../db');

// pool - это объект, который позволяет приложению управлять несколькими соединениями с базой данных

function getTime(req, res) {
  db.query('SELECT NOW()', (err, result) => {
    if (err) {
      return res.status(500).send(err.toString());
    }
    res.send(result.rows);
  });
}

exports.getTime = getTime;

// `SELECT * FROM users WHERE id = ${userId}`

// {
//   "id": number,
//   "name": text,
//   "create_at": Date
// }
