/**
 * @module AuthModel
 * Работа с таблицей refresh_tokens
 */

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'db'.
const db = require('../../db');

/**
 * Сохраняет refresh-токен в базу
 * @param {number} userId - ID пользователя
 * @param {string} token - сам токен
 * @param {string|number} ttl - срок жизни (например, '7d')
 */
  async function refreshToken(userId: any, token: any, ttl: any) {
  // Проверяем, есть ли уже запись для userId
  const selectQuery = 'SELECT 1 FROM refresh_tokens WHERE user_id = $1';
  const result = await db.query(selectQuery, [userId]);

  if (result.rowCount > 0) {
    // Запись есть — обновляем
    const updateQuery = `
      UPDATE refresh_tokens
      SET token = $2, expires_at = $3
      WHERE user_id = $1
    `;
    await db.query(updateQuery, [userId, token, ttl]);
  } else {
    // Записи нет — вставляем новую
    const insertQuery = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id) DO UPDATE
      SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at;
    `;
    // @ts-expect-error TS(2304): Cannot find name 'query'.
    await db.query(query, [userId, token, ttl]);
  };
};

/**
 * Возвращает refresh-токен по его строке
 * @param {string} token
 */

  // Проверяем, существует ли токен и не истёк ли
  /**
   *
   * @param token
   */
  async function getRefreshToken(token: any) {
    const query = `SELECT * FROM refresh_tokens WHERE token = $1`;
    const result = await db.query(query, [token]);
    return result.rows[0];
  };

/**
 * Удаляет refresh-токен из базы (например, при logout)
 * @param {string} token
 */

  async function deleteRefreshToken(token: any) {
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
async function replaceRefreshToken(userId: any, oldToken: any, newToken: any, ttl: any) {
  await deleteRefreshToken(oldToken);
  await refreshToken(userId, newToken, ttl);
}



// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { refreshToken, getRefreshToken, deleteRefreshToken, replaceRefreshToken }