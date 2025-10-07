const pool = require('../../db');

async function getAllUsers() {
  const query = 'SELECT * FROM users';
  const result = await pool.query(query);

  return result.rows;
}

async function getUser(userId) {
  const query = 'SELECT * FROM users WHERE id = $1;';
  const value = [userId];
  const result = await pool.query(query, value);

  return result.rows[0];
}

async function getUserByName(userName) {
  const query = 'SELECT * FROM users WHERE username = $1;';
  const value = [userName];
  const result = await pool.query(query, value);

  return result.rows[0];
}

async function createUser(userName, userEmail, password_hash, role = 'user') {
  const query = 'INSERT INTO users (username, email, password_hash, role ) values ($1, $2, $3, $4) RETURNING * ';
  const values = [userName, userEmail, password_hash, role];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Error executing query', err);
    throw err;
  }
}

async function deleteUser(userId) {
  // RETURNING * - какие данные должны быть возвращены после выполнения операции удаления.
  // благодаря returning *, в логах result будет содержаться объект с удаленной записью
  const query = 'DELETE FROM users WHERE id = $1  RETURNING *';
  const values = [userId];
  const result = await pool.query(query, values);

  return result;
}

// todo проверку на то какие поля пришли для обновления
async function updateUserName(userId, userName, email) {
  const query = 'UPDATE users SET name = $1 WHERE id = $2 RETURNING *';
  const values = [userId, userName, email];
  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    return null; // Возвращаем null, если ни одна строка не была обновлена
  }

  return result.rows[0]; // Возвращаем обновленную строку
}

async function updateUserMail(newMail, userId) {
  const query = 'UPDATE users SET mail = $1 WHERE id = $2 RETURNING *';
  const values = [newMail, userId];
  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}
module.exports = { updateUserMail, updateUserName, deleteUser, getAllUsers, createUser, getUserByName, getUser };
