const pool = require('../../db');


  async function getAllBooks () {
  const query = 'SELECT * FROM books';

  const result = await pool.query(query);
  console.log({ result });

  return result.rows;
};


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
  };


  async function getBook (bookId) {
  const query = 'SELECT * FROM books WHERE id = $1;';
  const value = [bookId];

  const result = await pool.query(query, value);
  console.log({ result });

  return result.rows[0];
};



async function getBookWithAuthorById(bookId) {
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




  async function createBook (bookTitle, bookDescription, bookAvailable = true) {
  console.log({ bookTitle, bookDescription, bookAvailable });
  const query = 'INSERT INTO books (title, description, available) values ($1, $2, $3) RETURNING * ;';
  const values = [bookTitle, bookDescription, bookAvailable];

  const result = await pool.query(query, values);
  console.log({ result });

  return result.rows[0];
};


  async function deleteBook (bookId) {
  const query = 'DELETE FROM books WHERE id = $1  RETURNING *';
  const values = [bookId];
  const result = await pool.query(query, values);

  console.log({ result });
  return result;
};



async function updateBookStatus (book_id, isAvailable) {
  const query = `
  UPDATE books
    SET available = $2,
        updated_at = NOW()
    WHERE id = $1
    RETURNING *;
    `;
    const values = [book_id, isAvailable];

    try {
      const result = await pool.query(query,values);
      if (result.rows.length === 0) {
        console.warn(`Book with ID ${book_id} nit found`);
        return null
      }
      return result.rows[0];
    } catch (err) {
      console.error('Error updating book status:', err);
      throw err;
    }
};




module.exports = { getAllBooks, getAllBooksWithAuthors, getBook, getBookWithAuthorById, createBook, deleteBook, updateBookStatus };
