"use strict";
/**
 * @module BookModel
 * Модуль для работы с таблицей `book` в базе данных.
 *
 * Содержит функции для:
 * - получение всех книг,
 * - получение одной книги по ID,
 * - получение всех книг с авторами,
 * - получение одной книги с автором по ID,
 * - создание книг,
 * - удаление книги по ID,
 * - обновление статуса доступности книги по ID
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
 * пользовательский тип, описывающий свойства объекта, который содержит данные о книгах.
 *
 * @typedef {Object} Book
 * @property {number} id - Уникальный идентификатор книги.
 * @property {string} title - наименование книги.
 * @property {string} description - описание книги.
 * @property {boolean} available - Статус доступности книги.
 * @property {Date} created_at - дата и время создания книги.
 * @property {Date} updated_at - дата и время последнего обновления.
 */
/**
 * Получает все книги из базы данных.
 *
 * @async
 * @function getAllBooks
 * @returns {Promise<Book[]>} Массив всех книг.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function getAllBooks() {
    return __awaiter(this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM books';
                    return [4 /*yield*/, pool.query(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
/**
 * Получает все книги с их авторами из базы данных.
 *
 * @async
 * @function getAllBooksWithAuthors
 * @returns {Promise<Book[]>} Массив всех книг с их авторами.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function getAllBooksWithAuthors() {
    return __awaiter(this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n      SELECT \n        b.id AS book_id,\n        b.title,\n        b.description,\n        json_agg(\n          DISTINCT jsonb_build_object(\n            'id', a.id,\n            'name', a.name,\n            'bio', a.bio\n          )\n        ) FILTER (WHERE a.id IS NOT NULL) AS authors\n      FROM books b\n      LEFT JOIN books_authors ba ON b.id = ba.book_id\n      LEFT JOIN authors a ON ba.author_id = a.id\n      GROUP BY b.id;\n    ";
                    return [4 /*yield*/, pool.query(query)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
/**
 * Получает одну запись о займе книги по её ID.
 *
 * @async
 * @function getBook
 * @param {number} bookId - Уникальный идентификатор книги.
 * @returns {Promise<Book[]>} Объект с информацией о названии книги.
 * @throws {Error} Если запись с таким ID не найдена или произошла ошибка в запросе.
 */
function getBook(bookId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, value, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM books WHERE id = $1;';
                    value = [bookId];
                    return [4 /*yield*/, pool.query(query, value)];
                case 1:
                    result = _a.sent();
                    console.log({ result: result });
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Получает одну книгу с ее автором по ID книги.
 *
 * @async
 * @function getBookWithAuthorById
 * @param {number} bookId - Уникальный идентификатор книги.
 * @returns  {Promise<Book|null>} - Возвращает объект книги или null, если не найден.
 * @throws {Error} Если запись с таким ID не найдена или произошла ошибка в запросе.
 */
function getBookWithAuthorById(bookId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    SELECT \n      b.id AS book_id,\n      b.title,\n      b.description,\n      json_agg(\n        json_build_object(\n          'id', a.id,\n          'name', a.name,\n          'bio', a.bio\n        )\n      ) AS authors\n    FROM books b\n    JOIN books_authors ba ON b.id = ba.book_id\n    JOIN authors a ON ba.author_id = a.id\n    WHERE b.id = $1\n    GROUP BY b.id;\n  ";
                    return [4 /*yield*/, pool.query(query, [bookId])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Создает одну книгу.
 *
 * @async
 * @function createBook
 * @param {text} bookTitle - название книги.
 * @param {text} bookDescription - описание книги
 * @param {boolean} bookAvailable - наличие книги по умоляания true.
 * @returns {Promise<Book|null>} - Возвращает объект книги или null, если не найден.
 * @throws {Error} Если произошла ошибка при создании книги.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function createBook(bookTitle_1, bookDescription_1) {
    return __awaiter(this, arguments, void 0, function (bookTitle, bookDescription, bookAvailable) {
        var query, values, result;
        if (bookAvailable === void 0) { bookAvailable = true; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log({ bookTitle: bookTitle, bookDescription: bookDescription, bookAvailable: bookAvailable });
                    query = 'INSERT INTO books (title, description, available) values ($1, $2, $3) RETURNING * ;';
                    values = [bookTitle, bookDescription, bookAvailable];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    console.log({ result: result });
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Удаляет одну книгу по ID.
 *
 * @async
 * @function deleteBook
 * @param {number} bookId - ID книги.
 * @returns {Promise<Book|null>} Объект удалённой книги или null, если не найдена.
 * @throws {Error} Если произошла ошибка при создании книги.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function deleteBook(bookId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'DELETE FROM books WHERE id = $1  RETURNING *';
                    values = [bookId];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Обнавляет статус наличия книги по ID.
 *
 * @async
 * @function updateBookStatus
 * @param {number} book_id - ID книги.
 * @param {boolean} isAvailable - статус наличия книги.
 * @returns {Promise<Book|null>} Обновлённая книга или null, если книга не найдена.
 * @throws {Error} Если произошла ошибка при создании книги.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function updateBookStatus(book_id, isAvailable) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n  UPDATE books\n    SET available = $2,\n        updated_at = NOW()\n    WHERE id = $1\n    RETURNING *;\n    ";
                    values = [book_id, isAvailable];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pool.query(query, values)];
                case 2:
                    result = _a.sent();
                    if (result.rows.length === 0) {
                        console.warn("Book with ID ".concat(book_id, " not found"));
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, result.rows[0]];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error updating book status:', err_1);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
    getAllBooks: getAllBooks,
    getAllBooksWithAuthors: getAllBooksWithAuthors,
    getBook: getBook,
    getBookWithAuthorById: getBookWithAuthorById,
    createBook: createBook,
    deleteBook: deleteBook,
    updateBookStatus: updateBookStatus,
};
