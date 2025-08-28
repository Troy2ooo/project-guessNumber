const pool = require('../../db');

exports.getAllBooks = async () => {
  const query = 'SELECT * FROM books';

  const result = await pool.query(query);
  console.log({ result });

  return result.rows[0];
};

exports.getBook = async (bookId) => {
  const query = 'SELECT * FROM books WHERE id = $1;';
  const value = [bookId];

  const result = await pool.query(query, value);
  console.log({ result });

  return result.rows[0];
};

exports.createBook = async (bookTitle, bookDescription, bookAvailable = true) => {
  console.log({ bookTitle, bookDescription, bookAvailable });
  const query = 'INSERT INTO books (title, description, available) values ($1, $2, $3) RETURNING * ;';
  const values = [bookTitle, bookDescription, bookAvailable];

  const result = await pool.query(query, values);
  console.log({ result });

  return result.rows[0];
};

exports.deleteBookById = async (bookId) => {
  const query = 'DELETE FROM books WHERE id = $1  RETURNING *';
  const values = [bookId];
  const result = await pool.query(query, values);

  console.log({ result });
  return result;
};

// TODO преобразовать стрелочные функции в function declaration
