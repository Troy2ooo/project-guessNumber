/**
 * @module AuthorsModel
 * Модуль для работы с таблицей `authors` в базе данных.
 * 
 * Содержит функции для:
 * - получения всех авторов,
 * - получения одного автора по ID,
 * - создания нового автора,
 * - удаления автора по ID.
 */
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'pool'.
const pool = require('../../db');


/**
 * Получает всех авторов из базы данных.
 *
 * @async
 * @function getAllAuthors
 * @returns {Promise<Object[]>} Массив объектов авторов.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function getAllAuthors() {
  const query = 'SELECT * FROM authors';
  const result = await pool.query(query);

  return result.rows;
}


/**
 * Получает одного автора по ID.
 *
 * @async
 * @function getOneAuthor
 * @param {number} authorId - Уникальный идентификатор автора.
 * @returns {Promise<Object>} Объект автора.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
async function getOneAuthor(authorId: any) {
  const query = 'SELECT * FROM authors WHERE id = $1;';
  const value = [authorId];
  const result = await pool.query(query, value);

  return result.rows[0];
}


/**
 * Создает нового автора.
 *
 * @async
 * @function createAuthor
 * @param {string} authorName - Имя автора.
 * @param {string} authorBio - Биография автора.
 * @returns {Promise<Object>} Объект созданного автора.
 * @throws {Error} Если произошла ошибка при создании автора.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function createAuthor(authorName: any, authorBio: any) {
  const query = 'INSERT INTO authors (name, bio) values ($1, $2) RETURNING * ;';
  const values = [authorName, authorBio];
  const result = await pool.query(query, values);

  return result.rows[0];
}


/**
 * Удаляет автора по ID.
 *
 * @async
 * @function deleteAuthor
 * @param {number} authorId - Уникальный идентификатор автора.
 * @returns {Promise<Object>} Объект удаленного автора.
 * @throws {Error} Если произошла ошибка при удалении автора.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function deleteAuthor(authorId: any) {
  const query = 'DELETE FROM authors WHERE id = $1  RETURNING *';
  const values = [authorId];
  const result = await pool.query(query, values);

  return result.rows[0];
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllAuthors, getOneAuthor, createAuthor, deleteAuthor };
