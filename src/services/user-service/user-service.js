"use strict";
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
/**
 * @module UserService
 * Сервисный модуль для работы с пользователями.
 *
 * Содержит функции для:
 * - получение всех пользователей,
 * - получение одного пользователя по ID,
 * - создание нового пользователя,
 * - удаление пользователя по ID,
 * - обновление информации пользователя,
 * - обновление электронной почты пользователя.
 */
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bcrypt'.
var bcrypt = require('bcryptjs');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'userModel'... Remove this comment to see the full error message
var userModel = require('../../models/user-model');
/**
 * Получает всех пользователей.
 *
 * @async
 * @function getAllUsers
 * @param {import('express').Request} req - Объект запроса.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с массивом пользователей.
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных.
 */
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var users, usersData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userModel.getAllUsers()];
                case 1:
                    users = _a.sent();
                    usersData = users.map(function (user) { return ({
                        id: user.id,
                        name: user.username,
                        mail: user.email,
                        role: user.role
                    }); });
                    res.json({
                        message: 'Here we go, all users!',
                        usersData: usersData
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error getting all users', error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Получает одного пользователя по ID.
 *
 * @async
 * @function getOneUser
 * @param {import('express').Request} req - Объект запроса, содержит params.id.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными пользователя.
 * @throws {Error} Если произошла ошибка при выполнении запроса к базе данных.
 */
function getOneUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log(userId);
                    return [4 /*yield*/, userModel.getUser(userId)];
                case 2:
                    user = _a.sent();
                    res.json({ message: 'Here we go user',
                        userData: {
                            id: user.id,
                            name: user.username,
                            mail: user.email,
                            role: user.role
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error getting user', error: error_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Создает нового пользователя.
 *
 * @async
 * @function createUser
 * @param {import('express').Request} req - Объект запроса, содержит body: { name, mail, password, role }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными созданного пользователя.
 * @throws {Error} Если произошла ошибка при создании пользователя или нарушении уникальности.
 */
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, mail, password, role, saltRounds, password_hash, userRole, newUser, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, name_1 = _a.name, mail = _a.mail, password = _a.password, role = _a.role;
                    if (!name_1 || !mail || !password) {
                        return [2 /*return*/, res.status(400).json({ message: 'Name, mail, and password are required' })];
                    }
                    saltRounds = 10;
                    return [4 /*yield*/, bcrypt.hash(password, saltRounds)];
                case 1:
                    password_hash = _b.sent();
                    userRole = 'user';
                    if (role === 'admin') {
                        if (req.user && req.user.role === 'admin') {
                            userRole = 'admin'; // админ может создать другого админа
                        }
                        else {
                            return [2 /*return*/, res.status(403).json({ error: 'Only admins can assign the admin role' })];
                        }
                    }
                    return [4 /*yield*/, userModel.createUser(name_1, mail, password_hash, userRole)];
                case 2:
                    newUser = _b.sent();
                    res.status(201).json({
                        message: 'User created successfully',
                        user: {
                            id: newUser.id,
                            name: newUser.name,
                            mail: newUser.mail,
                            role: newUser.role,
                        },
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.error('Error creating user:', error_3);
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error creating user', error: error_3.message });
                    return [3 /*break*/, 4];
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
 * @param {import('express').Request} req - Объект запроса, содержит params.id.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с данными удаленного пользователя.
 * @throws {Error} Если произошла ошибка при удалении пользователя.
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, deletedUser, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userModel.deleteUser(userId)];
                case 2:
                    deletedUser = _a.sent();
                    if (deletedUser) {
                        res.json({ message: 'User deleted successfully', user: deletedUser });
                    }
                    else {
                        res.status(404).json({ message: 'User not found' });
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error deleting user', error: error_4.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Обновляет имя и/или email пользователя.
 *
 * @async
 * @function updateUser
 * @param {import('express').Request} req - Объект запроса, содержит body: { userId, userName, email }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с обновленными данными пользователя.
 * @throws {Error} Если произошла ошибка при обновлении.
 */
//донастроить http
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userName, email, userId, fieldsToUpdate, result, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, userName = _a.userName, email = _a.email;
                    userId = req.params.id;
                    console.log(req.params);
                    console.log({ userId: userId, userName: userName, email: email });
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: 'userId is required' })];
                    }
                    fieldsToUpdate = {};
                    if (userName) {
                        // @ts-expect-error TS(2339): Property 'username' does not exist on type '{}'.
                        fieldsToUpdate.username = userName;
                    }
                    ;
                    if (email) {
                        // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
                        fieldsToUpdate.email = email;
                    }
                    ;
                    return [4 /*yield*/, userModel.updateUser(userId, fieldsToUpdate)];
                case 1:
                    result = _b.sent();
                    if (!result) {
                        return [2 /*return*/, res.status(404).json({ message: 'User not found or nothing to update' })];
                    }
                    res.status(200).json({ message: 'User updated successfully', user: result });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    console.error('Error updating user:', error_5);
                    res.status(500).json({ message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Обновляет email пользователя.
 *
 * @async
 * @function updateUserMail
 * @param {import('express').Request} req - Объект запроса, содержит body: { userId, newMail }.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с обновленным email пользователя.
 * @throws {Error} Если произошла ошибка при обновлении email.
 */
function updateUserMail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, newMail, result, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, userId = _a.userId, newMail = _a.newMail;
                    return [4 /*yield*/, userModel.updateUserMailById(newMail, userId)];
                case 1:
                    result = _b.sent();
                    if (result) {
                        res.status(200).json({ message: 'User email updated', user: result });
                    }
                    else {
                        res.status(404).json({ message: 'User not found' });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    console.error('Error updating user name:', err_1);
                    res.status(500).json({ message: 'Internal server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllUsers: getAllUsers, getOneUser: getOneUser, createUser: createUser, deleteUser: deleteUser, updateUser: updateUser, updateUserMail: updateUserMail };
