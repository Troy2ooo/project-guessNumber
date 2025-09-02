const pool = require('../../db');

  async function getAllBooks () {
  const query = 'SELECT * FROM books';

  const result = await pool.query(query);
  console.log({ result });

  return result.rows;
};


  async function getBook (bookId) {
  const query = 'SELECT * FROM books WHERE id = $1;';
  const value = [bookId];

  const result = await pool.query(query, value);
  console.log({ result });

  return result.rows[0];
};

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

module.exports = { getAllBooks, getBook, createBook, deleteBook };
