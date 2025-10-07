const pool = require('../../db');

async function getAllAuthors() {
  const query = 'SELECT * FROM authors';
  const result = await pool.query(query);

  return result.rows;
}

async function getOneAuthor(authorId) {
  const query = 'SELECT * FROM authors WHERE id = $1;';
  const value = [authorId];
  const result = await pool.query(query, value);

  return result.rows[0];
}

async function createAuthor(authorName, authorBio) {
  const query = 'INSERT INTO authors (name, bio) values ($1, $2) RETURNING * ;';
  const values = [authorName, authorBio];
  const result = await pool.query(query, values);

  return result.rows[0];
}

async function deleteAuthor(authorId) {
  const query = 'DELETE FROM authors WHERE id = $1  RETURNING *';
  const values = [authorId];
  const result = await pool.query(query, values);
}

module.exports = { getAllAuthors, getOneAuthor, createAuthor, deleteAuthor };
