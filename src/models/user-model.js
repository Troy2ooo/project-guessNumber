"use strict";
/**
 * @module UserModel
 * Модуль для работы с таблицей `users` в базе данных.
 *
 * Содержит функции для:
 * - получение всех пользователей,
 * - получение одного пользователя по ID,
 * - получение пользователя по username,
 * - создание нового пользователя,
 * - удаление пользователя по ID,
 * - обновление информации пользователя.
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
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'pool'.
var pool = require('../../db');
/**
 * Тип данных пользователя
 * @typedef {Object} User
 * @property {number} id - Уникальный идентификатор пользователя.
 * @property {string} username - Имя пользователя.
 * @property {string} email - Электронная почта пользователя.
 * @property {string} password_hash - Хэш пароля пользователя.
 * @property {string} role - Роль пользователя (по умолчанию 'user').
 * @property {Date} created_at - Дата создания записи.
 * @property {Date} updated_at - Дата последнего обновления записи.
 */
/**
 * Получает всех пользователей.
 *
 * @async
 * @function getAllUsers
 * @returns {Promise<User[]>} Массив всех пользователей.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM users';
                    return [4 /*yield*/, pool.query(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
;
/**
 * Получает пользователя по его ID.
 *
 * @async
 * @function getUser
 * @param {number} userId - Уникальный идентификатор пользователя.
 * @returns {Promise<User|null>} Объект пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, value, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM users WHERE id = $1;';
                    value = [userId];
                    return [4 /*yield*/, pool.query(query, value)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 *
 * @param username
 */
function getUserByName(username) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!username) {
                        throw new Error('Username is required');
                    }
                    query = 'SELECT * FROM users WHERE username = $1;';
                    values = [username];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query(query, values)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0] || null]; // null, если пользователь не найден
                case 3:
                    err_1 = _a.sent();
                    console.error('getUserByName error:', err_1);
                    throw new Error('Database query error');
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Создает нового пользователя.
 *
 * @async
 * @function createUser
 * @param {string} userName - Имя пользователя.
 * @param {string} userEmail - Электронная почта пользователя.
 * @param {string} password_hash - Хэш пароля.
 * @param {string} [role='user'] - Роль пользователя.
 * @returns {Promise<User>} Объект созданного пользователя.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function createUser(userName_1, userEmail_1, password_hash_1) {
    return __awaiter(this, arguments, void 0, function (userName, userEmail, password_hash, role) {
        var query, values, result, err_2;
        if (role === void 0) { role = 'user'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'INSERT INTO users (username, email, password_hash, role ) values ($1, $2, $3, $4) RETURNING * ';
                    values = [userName, userEmail, password_hash, role];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query(query, values)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
                case 3:
                    err_2 = _a.sent();
                    console.error('Error executing query', err_2);
                    throw err_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Удаляет пользователя по ID.
 *
 * @async
 * @function deleteUser
 * @param {number} userId - Уникальный идентификатор пользователя.
 * @returns {Promise<User|null>} Объект удаленного пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'DELETE FROM users WHERE id = $1  RETURNING *';
                    values = [userId];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
/**
 * Обновляет поля пользователя.
 *
 * @async
 * @function updateUser
 * @param {number} userId - ID пользователя.
 * @param {Object} fieldsToUpdate - Объект с полями для обновления. Пример: { username: 'newName', email: 'newEmail' }.
 * @returns {Promise<User|null>} Объект обновленного пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function updateUser(userId, fieldsToUpdate) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, setQuery, values, query, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keys = Object.keys(fieldsToUpdate);
                    if (keys.length === 0) {
                        return [2 /*return*/, null];
                    }
                    ;
                    setQuery = keys.map(function (key, idx) { return "".concat(key, " = $").concat(idx + 1); }).join(', ');
                    values = keys.map(function (key) { return fieldsToUpdate[key]; });
                    values.push(userId); // добавляем userId для WHERE
                    query = "UPDATE users SET ".concat(setQuery, ", updated_at = NOW() WHERE id = $").concat(values.length, " RETURNING *");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query(query, values)];
                case 2:
                    result = _a.sent();
                    if (result.rows.length === 0) {
                        return [2 /*return*/, null];
                    }
                    ;
                    return [2 /*return*/, result.rows[0]];
                case 3:
                    err_3 = _a.sent();
                    console.error('Error updating user:', err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Обновляет эл. почту пользователя.
 *
 * @async
 * @function updateUserMail
 * @param {string} newMail - новая почта пользователя.
 * @param {number} userId - ID пользователя.
 * @returns {Promise<User|null>} Объект обновленного пользователя или null, если не найден.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function updateUserMail(newMail, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'UPDATE users SET mail = $1 WHERE id = $2 RETURNING *';
                    values = [newMail, userId];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    if (result.rowCount === 0) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
;
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { updateUserMail: updateUserMail, updateUser: updateUser, deleteUser: deleteUser, getAllUsers: getAllUsers, createUser: createUser, getUser: getUser, getUserByName: getUserByName };
