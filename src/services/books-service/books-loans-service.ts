/**
 * @module BookLoansService
 * Сервисный модуль для работы с займами книг.
 * 
 * Содержит функции для:
 * - получения всех займов,
 * - получения одного займа по ID,
 * - выдачи книги пользователю (checkout),
 * - возврата книги пользователем.
 */
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const loansModel = require('../../models/book-loans-model');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bookModel'... Remove this comment to see the full error message
const bookModel = require('../../models/book-model')


/**
 * Получает все займы книг.
 *
 * @async
 * @function getAllLoans
 * @param {import('express').Request} req - Объект запроса.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с массивом всех займов.
 * @throws {Error} Если произошла ошибка при получении займов.
 */
async function getAllLoans(req: any, res: any) {
  try {
    const loans = await loansModel.getAllLoans();

    res.json(loans);
  } catch (error) {
    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
    res.status(500).json({ message: 'Error getting loans', error: error.message });
  }
}


/**
 * Получает один заем книги по ID.
 *
 * @async
 * @function getLoan
 * @param {import('express').Request} req - req.params.id содержит ID займа.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Отправляет JSON с объектом займа.
 * @throws {Error} Если произошла ошибка при получении займа.
 */
async function getLoan(req: any, res: any) {
  const loanId = req.params.id;

  try {
    const loan = await loansModel.getLoan(loanId);

    res.json(loan);
  } catch (error) {
    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
};


/**
 * Выдает книгу пользователю (checkout).
 *
 * @async
 * @function checkoutBook
 * @param {import('express').Request} req - req.params.id содержит ID книги.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом займа.
 * @throws {Error} Если книга недоступна или произошла ошибка сервера.
 */

// доработать
/**
 *
 * @param req
 * @param res
 */
async function checkoutBook(req: any, res: any) {
  const bookId = req.params.id;
  
  try {
    // Проверим, доступна ли книга
    const book = await bookModel.getBook(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    };
    if (!book.available) {
      
      return res.status(400).json({ error: 'Book is not available' });
    };
    // Обновляем статус книги
    await bookModel.updateBookStatus(bookId, false);
    res.status(201).json({
      message: 'Book checked out successfully'});
  } catch (error) {
    console.error('checkoutBook error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


/**
 * Возвращает книгу пользователем.
 *
 * @async
 * @function returnBook
 * @param {import('express').Request} req - req.params.id содержит ID книги, req.body.user_id содержит ID пользователя.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом возврата займа.
 * @throws {Error} Если не найден активный заем или произошла ошибка сервера.
 */
async function returnBook(req: any, res: any) {
  const bookId = req.params.id;
  const userId = req.body.user_id;

  try {
    const book = await bookModel.getBook(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    };
    // Проверим, есть ли незакрытый loan
    const loan = await loansModel.returnBook(bookId, userId);
    if (!loan) {
      return res.status(400).json({ error: 'No active loan found for this user/book' });
    }

    // Обновляем статус книги
    await bookModel.updateBookStatus(bookId, true);

    res.json({
      message: 'Book returned successfully',
      loan,
    });
  } catch (error) {
    console.error('returnBook error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}




// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllLoans, getLoan, checkoutBook, returnBook };
