/**
 * @module AuthorsService
 * Сервисный модуль для работы с авторами.
 * 
 * Содержит функции для:
 * - получения всех авторов,
 * - получения одного автора по ID,
 * - создания нового автора,
 * - удаления автора по ID.
 */
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const authorsModel = require('../../models/authors-model');


/**
 * Получает всех авторов и отправляет их в ответе.
 *
 * @async
 * @function getAllAuthors
 * @param {Object} req - HTTP-запрос.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при получении авторов.
 */
async function getAllAuthors(req: any, res: any) {
  try {
    const authors = await authorsModel.getAllAuthors();

    res.json(authors);
  } catch (error) {
    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
    res.status(500).json({ message: 'Error getting authors', error: error.message });
  }
}


/**
 * Получает одного автора по ID и отправляет его в ответе.
 *
 * @async
 * @function getAuthor
 * @param {Object} req - HTTP-запрос.
 * @param {Object} req.params - Параметры запроса.
 * @param {number} req.params.id - ID автора.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при получении автора.
 */
async function getAuthor(req: any, res: any) {
  const authorId = req.params.id;

  try {
    const author = await authorsModel.getOneAuthor(authorId);

    res.json(author);
  } catch (error) {
    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
    res.status(500).json({ message: 'Error getting author', error: error.message });
  }
};



/**
 * Создает нового автора и отправляет объект созданного автора в ответе.
 *
 * @async
 * @function createAuthor
 * @param {Object} req - HTTP-запрос.
 * @param {Object} req.body - Тело запроса.
 * @param {string} req.body.name - Имя автора.
 * @param {string} req.body.bio - Биография автора.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при создании автора.
 */
async function createAuthor(req: any, res: any) {
  const author = {
    name: req.body.name,
    bio: req.body.bio,
  };

  try {
    const newAuthor = await authorsModel.createAuthor(author.name, author.bio);

    res.json({ message: 'Author created successfully', author: newAuthor });
  } catch (error) {
    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
    res.status(500).json({ message: 'Error creating author', error: error.message });
  }
}


/**
 * Удаляет автора по ID и отправляет объект удаленного автора в ответе.
 *
 * @async
 * @function deleteAuthor
 * @param {Object} req - HTTP-запрос.
 * @param {Object} req.params - Параметры запроса.
 * @param {number} req.params.id - ID автора.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при удалении автора.
 */
async function deleteAuthor (req: any, res: any) {
  const authorId = req.params.id;

  const deletedAuthor = await authorsModel.deleteAuthor (authorId);

  if (deletedAuthor) {
    res.json({ message: 'Author deleted successfully', author: deleteAuthor });
  } else {
    res.status(404).json({ message: 'Author not found' });
  }
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllAuthors, getAuthor, createAuthor, deleteAuthor };
