/**
 * @module BookModel
 * Модуль для работы с таблицей `book` в базе данных.
 * 
 * Содержит функции для:
 * - получение всех книг,
 * - получение одной книги по ID,
 * - получение всех книг с авторами,
 * - получение одной книги с автором по ID,
 * - создание книг,
 * - удаление книги по ID,
 * - обновление статуса доступности книги по ID
 */


// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'pool'.
const pool = require('../../db');


/**
 * пользовательский тип, описывающий свойства объекта, который содержит данные о книгах.
 * 
 * @typedef {Object} Book
 * @property {number} id - Уникальный идентификатор книги.
 * @property {string} title - наименование книги.
 * @property {string} description - описание книги.
 * @property {boolean} available - Статус доступности книги.
 * @property {Date} created_at - дата и время создания книги.
 * @property {Date} updated_at - дата и время последнего обновления.
 */


/**
 * Получает все книги из базы данных.
 * 
 * @async
 * @function getAllBooks
 * @returns {Promise<Book[]>} Массив всех книг.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function getAllBooks() {
  const query = 'SELECT * FROM books';
  const result = await pool.query(query);

  return result.rows;
}


/**
 * Получает все книги с их авторами из базы данных.
 *
 * @async
 * @function getAllBooksWithAuthors
 * @returns {Promise<Book[]>} Массив всех книг с их авторами.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function getAllBooksWithAuthors() {
  const query = `
      SELECT 
        b.id AS book_id,
        b.title,
        b.description,
        json_agg(
          DISTINCT jsonb_build_object(
            'id', a.id,
            'name', a.name,
            'bio', a.bio
          )
        ) FILTER (WHERE a.id IS NOT NULL) AS authors
      FROM books b
      LEFT JOIN books_authors ba ON b.id = ba.book_id
      LEFT JOIN authors a ON ba.author_id = a.id
      GROUP BY b.id;
    `;
  const result = await pool.query(query);

  return result.rows;
}


/**
 * Получает одну запись о займе книги по её ID.
 *
 * @async
 * @function getBook
 * @param {number} bookId - Уникальный идентификатор книги.
 * @returns {Promise<Book[]>} Объект с информацией о названии книги.
 * @throws {Error} Если запись с таким ID не найдена или произошла ошибка в запросе.
 */
async function getBook(bookId: any) {
  const query = 'SELECT * FROM books WHERE id = $1;';
  const value = [bookId];

  const result = await pool.query(query, value);
  console.log({ result });

  return result.rows[0];
}


/**
 * Получает одну книгу с ее автором по ID книги.
 *
 * @async
 * @function getBookWithAuthorById
 * @param {number} bookId - Уникальный идентификатор книги.
 * @returns  {Promise<Book|null>} - Возвращает объект книги или null, если не найден.
 * @throws {Error} Если запись с таким ID не найдена или произошла ошибка в запросе.
 */
async function getBookWithAuthorById(bookId: any) {
  const query = `
    SELECT 
      b.id AS book_id,
      b.title,
      b.description,
      json_agg(
        json_build_object(
          'id', a.id,
          'name', a.name,
          'bio', a.bio
        )
      ) AS authors
    FROM books b
    JOIN books_authors ba ON b.id = ba.book_id
    JOIN authors a ON ba.author_id = a.id
    WHERE b.id = $1
    GROUP BY b.id;
  `;
  const result = await pool.query(query, [bookId]);
  return result.rows[0];
}


/**
 * Создает одну книгу.
 *
 * @async
 * @function createBook
 * @param {text} bookTitle - название книги.
 * @param {text} bookDescription - описание книги
 * @param {boolean} bookAvailable - наличие книги по умоляания true.
 * @returns {Promise<Book|null>} - Возвращает объект книги или null, если не найден.
 * @throws {Error} Если произошла ошибка при создании книги.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function createBook(bookTitle: any, bookDescription: any, bookAvailable = true) {
  console.log({ bookTitle, bookDescription, bookAvailable });
  const query = 'INSERT INTO books (title, description, available) values ($1, $2, $3) RETURNING * ;';
  const values = [bookTitle, bookDescription, bookAvailable];

  const result = await pool.query(query, values);
  console.log({ result });

  return result.rows[0];
}


/**
 * Удаляет одну книгу по ID.
 *
 * @async
 * @function deleteBook
 * @param {number} bookId - ID книги.
 * @returns {Promise<Book|null>} Объект удалённой книги или null, если не найдена.
 * @throws {Error} Если произошла ошибка при создании книги.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function deleteBook(bookId: any) {
  const query = 'DELETE FROM books WHERE id = $1  RETURNING *';
  const values = [bookId];
  const result = await pool.query(query, values);

  return result.rows[0];
}


/**
 * Обнавляет статус наличия книги по ID.
 *
 * @async
 * @function updateBookStatus
 * @param {number} book_id - ID книги.
 * @param {boolean} isAvailable - статус наличия книги.
 * @returns {Promise<Book|null>} Обновлённая книга или null, если книга не найдена.
 * @throws {Error} Если произошла ошибка при создании книги.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
async function updateBookStatus(book_id: any, isAvailable: any) {
  const query = `
  UPDATE books
    SET available = $2,
        updated_at = NOW()
    WHERE id = $1
    RETURNING *;
    `;
  const values = [book_id, isAvailable];
  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      console.warn(`Book with ID ${book_id} not found`);
      return null;
    }
    
    return result.rows[0];
  } catch (err) {
    console.error('Error updating book status:', err);
    throw err;
  }
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  getAllBooks,
  getAllBooksWithAuthors,
  getBook,
  getBookWithAuthorById,
  createBook,
  deleteBook,
  updateBookStatus,
};
