"use strict";
/**
 * @module AuthService
 * Сервисный модуль для аутентификации пользователей.
 *
 * Содержит функции для:
 * - регистрации пользователя,
 * - логина пользователя с выдачей JWT,
 * - получения профиля текущего пользователя.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bcrypt'.
var bcrypt = require('bcryptjs');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'jwt'.
var jwt = require('jsonwebtoken');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'userModel'... Remove this comment to see the full error message
var userModel = require('../../models/user-model');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var authModel = require('../../models/auth-models');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var ms = require('ms');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'JWT_SECRET... Remove this comment to see the full error message
var JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
var SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
var JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
var ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '2h'; // 15 минут
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
var REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d';
/**
 * Создаёт access token
 * @param {Object} user - объект пользователя ({ id, username, role })
 * @returns {string} access token
 */
function generateAccessToken(user) {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}
;
/**
 * Создаёт refresh token
 * @param {Object} user - объект пользователя ({ id, username })
 * @returns {string} refresh token
 */
function generateRefreshToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_TTL });
}
;
/**
 * Проверяет правильность пароля при входе
 * @param plainPassword
 * @param hashedPassword
 */
function verifyPassword(plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bcrypt.compare(plainPassword, hashedPassword)];
        });
    });
}
;
/**
 * Обновляет токены при истечении access-токена
 * @param req
 * @param res
 */
function refreshAccessToken(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var refreshToken_1, storedToken, payload, newAccessToken, newRefreshToken, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    refreshToken_1 = req.body.refreshToken;
                    if (!refreshToken_1) {
                        return [2 /*return*/, res.status(400).json({ error: 'refreshToken is required' })];
                    }
                    return [4 /*yield*/, authModel.getRefreshToken(refreshToken_1)];
                case 1:
                    storedToken = _a.sent();
                    if (!storedToken) {
                        return [2 /*return*/, res.status(403).json({ error: 'Invalid refresh token' })];
                    }
                    if (!(new Date(storedToken.expires_at) < new Date())) return [3 /*break*/, 3];
                    return [4 /*yield*/, authModel.deleteRefreshToken(refreshToken_1)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(403).json({ error: 'Refresh token expired' })];
                case 3:
                    payload = jwt.verify(refreshToken_1, JWT_REFRESH_SECRET);
                    newAccessToken = generateAccessToken(payload);
                    newRefreshToken = generateRefreshToken(payload);
                    // Меняем старый refresh на новый
                    return [4 /*yield*/, authModel.replaceRefreshToken(payload.id, refreshToken_1, newRefreshToken, REFRESH_TOKEN_TTL)];
                case 4:
                    // Меняем старый refresh на новый
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            message: 'Tokens refreshed successfully',
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                            expiresIn: ACCESS_TOKEN_TTL,
                        })];
                case 5:
                    err_1 = _a.sent();
                    console.error('refreshAccessToken error:', err_1);
                    return [2 /*return*/, res.status(403).json({ error: 'Invalid or expired refresh token' })];
                case 6: return [2 /*return*/];
            }
        });
    });
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
function verifyAccessToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
        throw new Error('Invalid or expired access token', err.message);
    }
}
;
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
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, email, password, role, existsByName, password_hash, newUser, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, username = _a.username, email = _a.email, password = _a.password, role = _a.role;
                    // Проверка обязательных полей
                    if (!username || !email || !password) {
                        return [2 /*return*/, res.status(400).json({ error: 'username, email and password are required' })];
                    }
                    return [4 /*yield*/, userModel.getUserByName(username)];
                case 1:
                    existsByName = _b.sent();
                    if (existsByName) {
                        return [2 /*return*/, res.status(400).json({ error: 'username already taken' })];
                    }
                    return [4 /*yield*/, bcrypt.hash(password, SALT_ROUNDS)];
                case 2:
                    password_hash = _b.sent();
                    return [4 /*yield*/, userModel.createUser(username, email, password_hash, role || 'user')];
                case 3:
                    newUser = _b.sent();
                    return [2 /*return*/, res.status(201).json({
                            message: 'Регистрация успешна',
                            user: {
                                id: newUser.id,
                                username: newUser.username,
                                email: newUser.email,
                                role: newUser.role,
                            },
                        })];
                case 4:
                    err_2 = _b.sent();
                    console.error('registerUser error', err_2);
                    return [2 /*return*/, res.status(500).json({ error: 'Server error' })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
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
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, username, password, user, valid, payload, accessToken, refreshToken_2, expiresAt, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, username = _a.username, password = _a.password;
                    if (!username || !password) {
                        return [2 /*return*/, res.status(400).json({ error: 'username and password are required' })];
                    }
                    return [4 /*yield*/, userModel.getUserByName(username)];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).json({ error: 'Invalid credentials' })];
                    }
                    return [4 /*yield*/, bcrypt.compare(password, user.password_hash)];
                case 2:
                    valid = _b.sent();
                    if (!valid) {
                        return [2 /*return*/, res.status(400).json({ error: 'Invalid credentials' })];
                    }
                    payload = { id: user.id, username: user.username, role: user.role };
                    accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
                    refreshToken_2 = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_TTL });
                    expiresAt = new Date(Date.now() + ms(REFRESH_TOKEN_TTL));
                    return [4 /*yield*/, authModel.refreshToken(user.id, refreshToken_2, expiresAt)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, res.json({ message: 'Вход успешен', accessToken: accessToken, refreshToken: refreshToken_2, expiresIn: ACCESS_TOKEN_TTL, })];
                case 4:
                    err_3 = _b.sent();
                    console.error('loginUser error', err_3);
                    return [2 /*return*/, res.status(500).json({ error: 'Server error' })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
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
function getProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, profile, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.user.id;
                    return [4 /*yield*/, userModel.getUser(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({ error: 'User not found' })];
                    }
                    profile = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                    };
                    return [2 /*return*/, res.json(profile)];
                case 2:
                    err_4 = _a.sent();
                    console.error('getProfile error', err_4);
                    return [2 /*return*/, res.status(500).json({ error: 'Server error' })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { registerUser: registerUser, loginUser: loginUser, getProfile: getProfile, generateAccessToken: generateAccessToken, generateRefreshToken: generateRefreshToken, verifyPassword: verifyPassword, refreshAccessToken: refreshAccessToken, verifyAccessToken: verifyAccessToken };
