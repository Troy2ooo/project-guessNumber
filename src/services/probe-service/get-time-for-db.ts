// require - функция для подключения модулей. В данном случае она подключает модуль db.

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'db'.
const db = require('../../../db');

// pool - это объект, который позволяет приложению управлять несколькими соединениями с базой данных

/**
 *
 * @param req  
 * @param res
 */
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getTime'.
function getTime(req: any, res: any) {
  db.query('SELECT NOW()', (err: any, result: any) => {
    if (err) {
      return res.status(500).send(err.toString());
    }
    res.send(result.rows);
  });
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.getTime = getTime;

// `SELECT * FROM users WHERE id = ${userId}`

// {
//   "id": number,
//   "name": text,
//   "create_at": Date
// }
