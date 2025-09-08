const pool = require('../../db');

  async function getAllLoans () {
  const query = 'SELECT * FROM book_loans';

  const result = await pool.query(query);
  console.log({ result });

  return result.rows;
};


  async function getLoan (loanId) {
  const query = 'SELECT * FROM book_loans WHERE id = $1;';
  const value = [loanId];

  const result = await pool.query(query, value);
  console.log({ result });

  return result.rows[0];
};





module.exports = { getAllLoans, getLoan };
