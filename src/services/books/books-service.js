const bookModel = require('../../models/book-model');


async function getAllBooks(req, res) {
  try {
    const books = await bookModel.getAllBooks();

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error getting books', error: error.message });
  }
}


async function getAllBooksWithAuthors(req, res) {
  try {
    const books = await bookModel.getAllBooksWithAuthors();

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



async function getBookWithAuthor(req, res) {
  try {
    const bookId = req.params.id;
    const book = await bookModel.getBookWithAuthorById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Книга не найдена" });
    }

    res.json(book);
  } catch (err) {
    console.error("Ошибка при получении книги:", err);
    res.status(500).json({ error: "Ошибка при получении книги" });
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



async function updateBookStatus(req, res) {
  try {
    const bookId = req.params.id;
    const { available } = req.body;

    if (typeof available !== 'boolean') {
      return res.status(400).json({ error: 'available must be a boolean (true/false)' });
    }

    const updatedBook = await bookModel.updateBookStatus(bookId, available);

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      message: `Book ${bookId} status updated successfully`,
      book: updatedBook,
    });
    
  } catch (error) {
    console.error('updateBookStatus error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}




module.exports = { getAllBooks, getAllBooksWithAuthors, getBook, getBookWithAuthor, createBook, deleteBook, updateBookStatus };
