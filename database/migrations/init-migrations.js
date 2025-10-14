/**
 * Инициализирует таблицы в базе данных, если они отсутствуют.
 * @module database/initMigrations
 */
const db = require('../../db');

/**
 *
 */
async function createTables() {
  try {
    await db.query(`
        CREATE TABLE IF NOT EXISTS books (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          available BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
  
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );


        CREATE TABLE IF NOT EXISTS authors (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          bio TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );


        CREATE TABLE IF NOT EXISTS books_authors (
          book_id INT NOT NULL,
          author_id INT NOT NULL,
          PRIMARY KEY (book_id, author_id),
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
          FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
        );


        CREATE TABLE IF NOT EXISTS book_loans (
          id SERIAL PRIMARY KEY,
          book_id INT NOT NULL,
          user_id INT NOT NULL,
          taken_at TIMESTAMP NOT NULL,
          returned_at TIMESTAMP,
          FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );


        CREATE TABLE IF NOT EXISTS refresh_tokens (
          id SERIAL PRIMARY KEY,
          user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          token TEXT NOT NULL UNIQUE,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT now()
        );

      `);
    console.log("Таблицы созданы");
  } catch (error) {
    console.error("Ошибка создания таблиц:", error);
  }
}

createTables();
