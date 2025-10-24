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
 * @module AuthorsModel
 * Модуль для работы с таблицей `authors` в базе данных.
 *
 * Содержит функции для:
 * - получения всех авторов,
 * - получения одного автора по ID,
 * - создания нового автора,
 * - удаления автора по ID.
 */
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'pool'.
var pool = require('../../db');
/**
 * Получает всех авторов из базы данных.
 *
 * @async
 * @function getAllAuthors
 * @returns {Promise<Object[]>} Массив объектов авторов.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function getAllAuthors() {
    return __awaiter(this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM authors';
                    return [4 /*yield*/, pool.query(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
/**
 * Получает одного автора по ID.
 *
 * @async
 * @function getOneAuthor
 * @param {number} authorId - Уникальный идентификатор автора.
 * @returns {Promise<Object>} Объект автора.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
function getOneAuthor(authorId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, value, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM authors WHERE id = $1;';
                    value = [authorId];
                    return [4 /*yield*/, pool.query(query, value)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Создает нового автора.
 *
 * @async
 * @function createAuthor
 * @param {string} authorName - Имя автора.
 * @param {string} authorBio - Биография автора.
 * @returns {Promise<Object>} Объект созданного автора.
 * @throws {Error} Если произошла ошибка при создании автора.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function createAuthor(authorName, authorBio) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'INSERT INTO authors (name, bio) values ($1, $2) RETURNING * ;';
                    values = [authorName, authorBio];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Удаляет автора по ID.
 *
 * @async
 * @function deleteAuthor
 * @param {number} authorId - Уникальный идентификатор автора.
 * @returns {Promise<Object>} Объект удаленного автора.
 * @throws {Error} Если произошла ошибка при удалении автора.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function deleteAuthor(authorId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'DELETE FROM authors WHERE id = $1  RETURNING *';
                    values = [authorId];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllAuthors: getAllAuthors, getOneAuthor: getOneAuthor, createAuthor: createAuthor, deleteAuthor: deleteAuthor };
