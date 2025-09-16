const pool = require('../../db');

exports.getUsers = async function getAllUsers () {
  const query = 'SELECT * FROM users';

  const result = await pool.query(query);
  console.log({ result });

  return result.rows;
};


exports.getUser = async function (userId) {
  const query = 'SELECT * FROM users WHERE id = $1;';
  const value = [userId];

  const result = await pool.query(query, value);
  console.log({ result });

  return result.rows[0];

};




exports.getUserByName = async function (userName) {
  const query = 'SELECT * FROM users WHERE username = $1;'
  const value = [userName];

  const result = await pool.query(query,value)
  console.log(result.rows);

  return result.rows[0];
}



exports.createUser = async function createUser (userName, userEmail, password_hash, role = 'user') {
  const query = 'INSERT INTO users (username, email, password_hash, role ) values ($1, $2, $3, $4) RETURNING * ';
  const values = [userName, userEmail, password_hash, role];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query', err);
  }
  throw err;
};

exports.deleteUserById = async function deleteUser (userId) {
  // RETURNING * - какие данные должны быть возвращены после выполнения операции удаления.
  const query = 'DELETE FROM users WHERE id = $1  RETURNING *';
  const values = [userId];
  try {
    const result = await pool.query(query, values);
    // благодаря returning *, в логах result будет содержаться объект с удаленной записью
    console.log({ result });
    return result;
  } catch (err) {
    console.error('Error executing query', err);
  }
};

exports.updateUserNamebyId = async function updateUserName (newName, userId) {
  const query = 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *';
  const values = [newName, userId];
  try {
    const result = await pool.query(query, values);
    console.log({ result });
    if (result.rowCount === 0) {
      return null; // Возвращаем null, если ни одна строка не была обновлена
    }

    return result.rows[0]; // Возвращаем обновленную строку
  } catch (err) {
    console.error('Error executing query', err);
    throw err; // Перебрасываем ошибку, чтобы обработать ее в вызывающем коде
  }
};

exports.updateUserMailById = async function updateUserMail (newMail, userId) {
  const query = 'UPDATE users SET mail = $1 WHERE id = $2 RETURNING *';
  const values = [newMail, userId];
  try {
    const result = await pool.query(query, values);
    console.log({ result });
    if (result.rowsCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
};
