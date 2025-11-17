import {pool} from '../../db';

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

type Author = {
  id: number;
  name: string;
  bio: string;
};


/**
 * Получает всех авторов из базы данных.
 *
 * @async
 * @function getAllAuthors
 * @returns {Promise<Object[]>} Массив объектов авторов.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */

async function getAll() {
  const query: string = 'SELECT * FROM authors';
  const result = await pool.query(query);

  return result.rows as Author [];
};


/**
 * Получает одного автора по ID.
 *
 * @async
 * @function getOneAuthor
 * @param {number} authorId - Уникальный идентификатор автора.
 * @returns {Promise<Object>} Объект автора.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
async function getOneById(authorId: number) {
  const query: string = 'SELECT * FROM authors WHERE id = $1;';
  const value = [authorId];
  const result = await pool.query(query, value);

  return result.rows[0] as Author;
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

async function create (authorName: string, authorBio: string) {
  const query: string = 'INSERT INTO authors (name, bio) values ($1, $2) RETURNING * ;';
  const values = [authorName, authorBio];
  const result = await pool.query(query, values);

  return result.rows[0] as Author;
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

async function remove (authorId: number) {
  const query: string = 'DELETE FROM authors WHERE id = $1  RETURNING *';
  const values = [authorId];
  const result = await pool.query(query, values);

  return result.rows[0] as Number;
}

export { getAll, getOneById, create, remove };
