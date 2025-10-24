/**
 * @module UserModel
 * Модуль для работы с таблицей `users` в базе данных.
 * 
 * Содержит функции для:
 * - получение всех пользователей,
 * - получение одного пользователя по ID,
 * - получение пользователя по username,
 * - создание нового пользователя,
 * - удаление пользователя по ID,
 * - обновление информации пользователя.
 */

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'pool'.
const pool = require('../../db');


/**
 * Тип данных пользователя
 * @typedef {Object} User
 * @property {number} id - Уникальный идентификатор пользователя.
 * @property {string} username - Имя пользователя.
 * @property {string} email - Электронная почта пользователя.
 * @property {string} password_hash - Хэш пароля пользователя.
 * @property {string} role - Роль пользователя (по умолчанию 'user').
 * @property {Date} created_at - Дата создания записи.
 * @property {Date} updated_at - Дата последнего обновления записи.
 */


/**
 * Получает всех пользователей.
 * 
 * @async
 * @function getAllUsers
 * @returns {Promise<User[]>} Массив всех пользователей.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function getAllUsers() {
  const query = 'SELECT * FROM users';
  const result = await pool.query(query);
  return result.rows;
};


/**
 * Получает пользователя по его ID.
 * 
 * @async
 * @function getUser
 * @param {number} userId - Уникальный идентификатор пользователя.
 * @returns {Promise<User|null>} Объект пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
async function getUser(userId: any) {
  const query = 'SELECT * FROM users WHERE id = $1;';
  const value = [userId];
  const result = await pool.query(query, value);

  return result.rows[0];
}


/**
 *
 * @param username
 */
async function getUserByName(username: any) {
  if (!username) {
    throw new Error('Username is required');
  }

  const query = 'SELECT * FROM users WHERE username = $1;';
  const values = [username];

  try {
    const result = await pool.query(query, values);
    
    return result.rows[0] || null; // null, если пользователь не найден
  } catch (err) {
    console.error('getUserByName error:', err);
    throw new Error('Database query error');
  }
}



/**
 * Создает нового пользователя.
 * 
 * @async
 * @function createUser
 * @param {string} userName - Имя пользователя.
 * @param {string} userEmail - Электронная почта пользователя.
 * @param {string} password_hash - Хэш пароля.
 * @param {string} [role='user'] - Роль пользователя.
 * @returns {Promise<User>} Объект созданного пользователя.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function createUser(userName: any, userEmail: any, password_hash: any, role = 'user') {
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

/**
 * Удаляет пользователя по ID.
 * 
 * @async
 * @function deleteUser
 * @param {number} userId - Уникальный идентификатор пользователя.
 * @returns {Promise<User|null>} Объект удаленного пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function deleteUser(userId: any) {
  // RETURNING * - какие данные должны быть возвращены после выполнения операции удаления.
  // благодаря returning *, в логах result будет содержаться объект с удаленной записью
  const query = 'DELETE FROM users WHERE id = $1  RETURNING *';
  const values = [userId];
  const result = await pool.query(query, values);

  return result;
}


/**
 * Обновляет поля пользователя.
 * 
 * @async
 * @function updateUser
 * @param {number} userId - ID пользователя.
 * @param {Object} fieldsToUpdate - Объект с полями для обновления. Пример: { username: 'newName', email: 'newEmail' }.
 * @returns {Promise<User|null>} Объект обновленного пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function updateUser(userId: any, fieldsToUpdate: any) {
  // Проверяем, что есть что обновлять
  const keys = Object.keys(fieldsToUpdate);

  if (keys.length === 0) {
    return null;
  };

  // Генерируем SET часть запроса: "name = $1, email = $2"
  const setQuery = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');

  // Формируем массив значений в том же порядке
  const values = keys.map(key => fieldsToUpdate[key]);

  values.push(userId); // добавляем userId для WHERE

  const query = `UPDATE users SET ${setQuery}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`;

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    };
    
    return result.rows[0];
  } catch (err) {
    console.error('Error updating user:', err);
  }
};


/**
 * Обновляет эл. почту пользователя.
 * 
 * @async
 * @function updateUserMail
 * @param {string} newMail - новая почта пользователя.
 * @param {number} userId - ID пользователя.
 * @returns {Promise<User|null>} Объект обновленного пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function updateUserMail(newMail: any, userId: any) {
  const query = 'UPDATE users SET mail = $1 WHERE id = $2 RETURNING *';
  const values = [newMail, userId];
  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
};







// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { updateUserMail, updateUser, deleteUser, getAllUsers, createUser, getUser, getUserByName };
