/**
 * @module AuthModel
 * Работа с таблицей refresh_tokens
 */

const db = require('../../db');

/**
 * Сохраняет refresh-токен в базу
 * @param {number} userId - ID пользователя
 * @param {string} token - сам токен
 * @param {string|number} ttl - срок жизни (например, '7d')
 */
  async function refreshToken(userId, token, ttl) {
    const query = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id) DO UPDATE
      SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at;
    `;
    await db.query(query, [userId, token, ttl]);
  };

/**
 * Возвращает refresh-токен по его строке
 * @param {string} token
 */

  // Проверяем, существует ли токен и не истёк ли
  async function getRefreshToken(token) {
    const query = `SELECT * FROM refresh_tokens WHERE token = $1`;
    const result = await db.query(query, [token]);
    return result.rows[0];
  };

/**
 * Удаляет refresh-токен из базы (например, при logout)
 * @param {string} token
 */

  async function deleteRefreshToken(token) {
    const query = `DELETE FROM refresh_tokens WHERE token = $1`;
    await db.query(query, [token]);
  };


  /**
 * Обновляет refresh-токен (удаляет старый и сохраняет новый)
 * @param {number} userId
 * @param {string} oldToken
 * @param {string} newToken
 * @param {string|number} ttl
 */
async function replaceRefreshToken(userId, oldToken, newToken, ttl) {
  await deleteRefreshToken(oldToken);
  await refreshToken(userId, newToken, ttl);
}



module.exports = { refreshToken, getRefreshToken, deleteRefreshToken, replaceRefreshToken  }