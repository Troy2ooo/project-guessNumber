/**
 * @module AuthService
 * Сервисный модуль для аутентификации пользователей.
 * 
 * Содержит функции для:
 * - регистрации пользователя,
 * - логина пользователя с выдачей JWT,
 * - получения профиля текущего пользователя.
 */

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bcrypt'.
const bcrypt = require('bcryptjs');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'jwt'.
const jwt = require('jsonwebtoken');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'userModel'... Remove this comment to see the full error message
const userModel = require('../../models/user-model');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const authModel = require('../../models/auth-models')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const ms = require('ms');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'JWT_SECRET... Remove this comment to see the full error message
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '2h'; // 15 минут
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d';

/**
 * Создаёт access token
 * @param {Object} user - объект пользователя ({ id, username, role })
 * @returns {string} access token
 */
function generateAccessToken(user: any) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL }
  );
};

/**
 * Создаёт refresh token
 * @param {Object} user - объект пользователя ({ id, username })
 * @returns {string} refresh token
 */
function generateRefreshToken(user: any) {
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_TTL }
  );
};

/**
 * Проверяет правильность пароля при входе
 * @param plainPassword
 * @param hashedPassword
 */
async function verifyPassword(plainPassword: any, hashedPassword: any) {
  return bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Обновляет токены при истечении access-токена
 * @param req
 * @param res
 */
async function refreshAccessToken(req: any, res: any) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'refreshToken is required' });
    }

    // Проверяем наличие токена в базе
    const storedToken = await authModel.getRefreshToken(refreshToken);

    if (!storedToken) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    // Проверяем срок жизни
    if (new Date(storedToken.expires_at) < new Date()) {
      await authModel.deleteRefreshToken(refreshToken);

      return res.status(403).json({ error: 'Refresh token expired' });
    }

    // Проверяем подпись токена
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // Генерируем новые токены
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Меняем старый refresh на новый
    await authModel.replaceRefreshToken(payload.id, refreshToken, newRefreshToken, REFRESH_TOKEN_TTL);

    return res.status(200).json({
      message: 'Tokens refreshed successfully',
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: ACCESS_TOKEN_TTL,
    });

  } catch (err) {
    console.error('refreshAccessToken error:', err);
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
}

// async function refreshAccessToken(refreshToken) {
//   try {
//     const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
//     const storedToken = await authModel.getRefreshToken(refreshToken);
//   if (!storedToken) 
//     throw new Error('Invalid refresh token');

//   if (new Date(storedToken.expires_at) < new Date()) {
//     await authModel.deleteRefreshToken(refreshToken);
//     throw new Error('Refresh token expired');
//   };
//     const newAccessToken = generateAccessToken(payload);
//     const newRefreshToken = generateRefreshToken(payload); 
//     await authModel.replaceRefreshToken(payload.id, refreshToken, newRefreshToken, REFRESH_TOKEN_TTL);

//     return { accessToken: newAccessToken, refreshToken: newRefreshToken };
//   } catch (err) {
//     throw new Error('Invalid or expired refresh token');
//   }
// };

/**
 * Проверяет access-токен
 * @param token
 */
function verifyAccessToken(token: any) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
    throw new Error('Invalid or expired access token', err.message);
  }
};


/**
 * Регистрирует нового пользователя.
 *
 * @async
 * @function registerUser
 * @param {import('express').Request} req - Объект запроса, содержит body: { username, email, password, role }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными нового пользователя.
 * @throws {Error} Если произошла ошибка при регистрации или пользователь уже существует.
 */
async function registerUser(req: any, res: any) {
  try {
    const { username, email, password, role } = req.body;

    // Проверка обязательных полей
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email and password are required' });
    }

    // Проверяем, есть ли уже пользователь с таким username
    const existsByName = await userModel.getUserByName(username);

    if (existsByName) {
      return res.status(400).json({ error: 'username already taken' });
    }

    // Генерируем безопасный хэш пароля
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Создаём пользователя, role по умолчанию 'user'
    const newUser = await userModel.createUser(username, email, password_hash, role || 'user');

    return res.status(201).json({
      message: 'Регистрация успешна',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('registerUser error', err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Авторизует пользователя и выдает JWT-токен.
 *
 * @async
 * @function loginUser
 * @param {import('express').Request} req - Объект запроса, содержит body: { username, password }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с JWT-токеном.
 * @throws {Error} Если произошла ошибка при логине или введены неверные данные.
 */

/**
 *
 * @param req
 * @param res
 */
async function loginUser(req: any, res: any) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const user = await userModel.getUserByName(username);

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
     // Проверяем пароль
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
// Формируем полезную нагрузку токена
    const payload = { id: user.id, username: user.username, role: user.role };
    // Генерируем токены
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_TTL });
    // Сохраняем refresh-токен в базу
   // --- обрабатываем TTL ---
    const expiresAt = new Date(Date.now() + ms(REFRESH_TOKEN_TTL));
    await authModel.refreshToken(user.id, refreshToken, expiresAt);

    return res.json({ message: 'Вход успешен', 
      accessToken,
      refreshToken,
      expiresIn: ACCESS_TOKEN_TTL,
    });
  } catch (err) {
    console.error('loginUser error', err);

    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Возвращает профиль текущего пользователя.
 *
 * @async
 * @function getProfile
 * @param {import('express').Request} req - Объект запроса, содержит user.id (из middleware авторизации).
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными профиля пользователя.
 * @throws {Error} Если пользователь не найден или произошла ошибка сервера.
 */
async function getProfile(req: any, res: any) {
  try {
    const userId = req.user.id;
    const user = await userModel.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.json(profile);
  } catch (err) {
    console.error('getProfile error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { registerUser, loginUser, getProfile, 
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
  refreshAccessToken,
  verifyAccessToken };
