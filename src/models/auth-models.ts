import {pool} from '../../db';

/**
 * @module AuthModel
 * Работа с таблицей refresh_tokens
 */
type Token = {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
}

/**
 * Сохраняет refresh-токен в базу
 * @param {number} userId - ID пользователя
 * @param {string} token - сам токен
 * @param {string|number} ttl - срок жизни (например, '7d')
 */
  async function refreshToken(userId: number, token: string, ttl: string | number):Promise<void> {
  // Проверяем, есть ли уже запись для userId
  const selectQuery: string = 'SELECT 1 FROM refresh_tokens WHERE user_id = $1';
  const result = await pool.query(selectQuery, [userId]);

  if (result.rowCount! > 0) { // result.rowCount! тояно не null, испльзуем ! иначе ошибка
    // Запись есть — обновляем
    const updateQuery: string = `
      UPDATE refresh_tokens
      SET token = $2, expires_at = $3
      WHERE user_id = $1
    `;
    await pool.query(updateQuery, [userId, token, ttl]);
  } else {
    // Записи нет — вставляем новую
    const insertQuery:string = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id) DO UPDATE
      SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at;
    `;
    await pool.query(insertQuery, [userId, token, ttl]);
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
  async function getRefreshToken(token: string): Promise<Token> {
    const query:string = `SELECT * FROM refresh_tokens WHERE token = $1`;
    const result = await pool.query(query, [token]);
    return result.rows[0] as Token;
  };

/**
 * Удаляет refresh-токен из базы (например, при logout)
 * @param {string} token
 */

  async function deleteRefreshToken(token: string): Promise<Token> {
    const query:string = `DELETE FROM refresh_tokens WHERE token = $1`;
    const result = await pool.query(query, [token]);
    return result.rows[0] as Token;
  };


  /**
 * Обновляет refresh-токен (удаляет старый и сохраняет новый)
 * @param {number} userId
 * @param {string} oldToken
 * @param {string} newToken
 * @param {string|number} ttl
 */
async function replaceRefreshToken(userId: number, oldToken: string, newToken: string, ttl: number | string): Promise<void> {
  await deleteRefreshToken(oldToken);
  await refreshToken(userId, newToken, ttl);
}


export { refreshToken, getRefreshToken, deleteRefreshToken, replaceRefreshToken }