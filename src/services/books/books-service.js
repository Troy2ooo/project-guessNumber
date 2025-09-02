const bookModel = require('../../models/book-model');


async function getAllBooks(req, res) {
  try {
    const books = await bookModel.getAllBooks();

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error getting books', error: error.message });
  }
}


async function getBook(req, res) {
  const bookId = req.params.id;

  try {
    const book = await bookModel.getBook(bookId);

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
}


async function createBook(req, res) {
  const book = {
    title: req.body.title,
    description: req.body.description,
    available: req.body.available ? req.body.available : true,
  };

  try {
    const newBook = await bookModel.createBook(book.title, book.description, book.available);

    res.json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
}


async function deleteBook (req, res) {
  const bookId = req.params.id;

  const deletedBook = await bookModel.deleteBook (bookId);

  if (deletedBook) {
    res.json({ message: 'Book deleted successfully', book: deletedBook });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
}

module.exports = { getAllBooks, getBook, createBook, deleteBook };
