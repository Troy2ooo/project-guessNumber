const bookModel = require('../../models/book-model')



// function getAllBooks(req, res) {
//     const books = bookModel.getBooks();
//     res.json(books);
//   }

// доработать
  

  function getOneBook(req, res) {
    const bookId = req.params.user_id;
    console.log(userId);
    const book = bookModel.getBook(bookId);
    res.json(book);
  }


async function createBook(req, res) {

  const book = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    available: req.body.available,
  } 
  try {
    const newBook = await bookModel.createBook(book.id, book.title, book.description, book.available);
    res.json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  } 
}


function deleteBook(req,res) {
    const bookId = req.params.id;
 
    bookModel.deleteBookById(bookId)
    .then(deletedBook => {
      if (deletedBook) {
        res.json({ message: 'Book deleted successfully', book: deletedBook });
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    })
 }





 module.exports = {getAllBooks, getOneBook, createBook, deleteBook}