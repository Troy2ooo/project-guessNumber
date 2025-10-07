const pool = require('../../db');

async function getAllLoans() {
  const query = 'SELECT * FROM book_loans';
  const result = await pool.query(query);

  return result.rows;
}

async function getLoan(loanId) {
  const query = 'SELECT * FROM book_loans WHERE id = $1;';
  const value = [loanId];
  const result = await pool.query(query, value);

  return result.rows[0];
}

async function checkoutBook(bookId, userId) {
  const query = `
    INSERT INTO book_loans (book_id, user_id, taken_at)
    VALUES ($1, $2, NOW())
    RETURNING *;
  `;
  const values = [bookId, userId];
  const result = await pool.query(query, values);

  return result.rows[0];
}

async function returnBook(bookId, userId) {
  const query = `
    UPDATE book_loans
    SET returned_at = NOW()
    WHERE book_id = $1 AND user_id = $2 AND returned_at IS NULL
    RETURNING *;
  `;
  const values = [bookId, userId];
  const result = await pool.query(query, values);

  return result.rows[0];
}

module.exports = { getAllLoans, getLoan, checkoutBook, returnBook };
