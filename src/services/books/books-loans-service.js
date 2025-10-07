const loansModel = require('../../models/book-loans-model');
const bookModel = require('../../models/book-model')

async function getAllLoans(req, res) {
  try {
    const loans = await loansModel.getAllLoans();

    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error getting loans', error: error.message });
  }
}


async function getLoan(req, res) {
  const loanId = req.params.id;

  try {
    const loan = await loansModel.getLoan(loanId);

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
};




// 📘 Взять книгу
async function checkoutBook(req, res) {
  const bookId = req.params.id;
  const userId = req.body.user_id;

  try {
    // Проверим, доступна ли книга
    const book = await bookModel.getBook(bookId);
    if (!book) 
      return res.status(404).json({ error: 'Book not found' });

    if (!book.available) {
      return res.status(400).json({ error: 'Book is not available' });
    }

    await loansModel.createLoan(bookId, userId);
    await bookModel.updateBookStatus(bookId, false);

    res.status(201).json({
      message: 'Book checked out successfully',
      loan,
    });
  } catch (error) {
    console.error('checkoutBook error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}


// 📗 Вернуть книгу
async function returnBook(req, res) {
  const bookId = req.params.id;
  const userId = req.body.user_id;

  try {
    const book = await bookModel.getBook(bookId);
    if (!book) 
      return res.status(404).json({ error: 'Book not found' });

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




module.exports = { getAllLoans, getLoan, checkoutBook, returnBook };
