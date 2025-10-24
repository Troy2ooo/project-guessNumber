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
 * @module BookService
 * Сервисный модуль для работы с книгами.
 *
 * Содержит функции для:
 * - получения всех книг,
 * - получения всех книг с авторами,
 * - получения книги по ID,
 * - получения книги с автором по ID,
 * - создания книги,
 * - удаления книги по ID,
 * - обновления статуса доступности книги.
 */
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bookModel'... Remove this comment to see the full error message
var bookModel = require('../../models/book-model');
/**
 * Получает все книги.
 *
 * @async
 * @function getAllBooks
 * @param {import('express').Request} req - Объект запроса.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с массивом всех книг.
 * @throws {Error} Если произошла ошибка при получении книг.
 */
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookModel.getAllBooks()];
                case 1:
                    books = _a.sent();
                    res.json(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error getting books', error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Получает все книги с их авторами.
 *
 * @async
 * @function getAllBooksWithAuthors
 * @param {import('express').Request} req - Объект запроса Express.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с массивом всех книг и их авторов.
 * @throws {Error} Если произошла ошибка при получении книг.
 */
function getAllBooksWithAuthors(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var books, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookModel.getAllBooksWithAuthors()];
                case 1:
                    books = _a.sent();
                    res.json(books);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error getting books', error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Получает книгу по ID.
 *
 * @async
 * @function getBookById
 * @param {import('express').Request} req - req.params.id содержит ID книги.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом книги.
 * @throws {Error} Если произошла ошибка при получении книги.
 */
function getBookById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookId, book, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bookModel.getBook(bookId)];
                case 2:
                    book = _a.sent();
                    res.json(book);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error creating book', error: error_3.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Получает книгу с автором по ID.
 *
 * @async
 * @function getBookWithAuthor
 * @param {import('express').Request} req - req.params.id содержит ID книги.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом книги и автором.
 * @throws {Error} Если книга не найдена или произошла ошибка сервера.
 */
function getBookWithAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookId, book, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    bookId = req.params.id;
                    return [4 /*yield*/, bookModel.getBookWithAuthorById(bookId)];
                case 1:
                    book = _a.sent();
                    if (!book) {
                        return [2 /*return*/, res.status(404).json({ error: 'Книга не найдена' })];
                    }
                    res.json(book);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Ошибка при получении книги:', err_1);
                    res.status(500).json({ error: 'Ошибка при получении книги' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Создает новую книгу.
 *
 * @async
 * @function createBook
 * @param {import('express').Request} req - req.body содержит { title, description, available }.
 * @param {import('express').Response} res - - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом созданной книги.
 * @throws {Error} Если произошла ошибка при создании книги.
 */
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var book, newBook, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    book = {
                        title: req.body.title,
                        description: req.body.description,
                        available: req.body.available ? req.body.available : true,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bookModel.createBook(book.title, book.description, book.available)];
                case 2:
                    newBook = _a.sent();
                    res.json({ message: 'Book created successfully', book: newBook });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error creating book', error: error_4.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Удаляет книгу по ID.
 *
 * @async
 * @function deleteBook
 * @param {import('express').Request} req - req.params.id содержит ID книги.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом удаленной книги или сообщение об ошибке.
 */
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookId, deletedBook;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookId = req.params.id;
                    return [4 /*yield*/, bookModel.deleteBook(bookId)];
                case 1:
                    deletedBook = _a.sent();
                    if (deletedBook) {
                        res.json({ message: 'Book deleted successfully', book: deletedBook });
                    }
                    else {
                        res.status(404).json({ message: 'Book not found' });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Обновляет статус доступности книги по ID.
 *
 * @async
 * @function updateBookStatus
 * @param {import('express').Request} req - req.params.id содержит ID книги, req.body.available содержит true/false.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с обновленным объектом книги.
 * @throws {Error} Если произошла ошибка при обновлении книги.
 */
function updateBookStatus(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookId, available, updatedBook, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    bookId = req.params.id;
                    available = req.body.available;
                    if (typeof available !== 'boolean') {
                        return [2 /*return*/, res.status(400).json({ error: 'available must be a boolean (true/false)' })];
                    }
                    return [4 /*yield*/, bookModel.updateBookStatus(bookId, available)];
                case 1:
                    updatedBook = _a.sent();
                    if (!updatedBook) {
                        return [2 /*return*/, res.status(404).json({ error: 'Book not found' })];
                    }
                    res.json({
                        message: "Book ".concat(bookId, " status updated successfully"),
                        book: updatedBook,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    console.error('updateBookStatus error:', error_5);
                    res.status(500).json({ error: 'Server error' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
    getAllBooks: getAllBooks,
    getAllBooksWithAuthors: getAllBooksWithAuthors,
    getBookById: getBookById,
    getBookWithAuthor: getBookWithAuthor,
    createBook: createBook,
    deleteBook: deleteBook,
    updateBookStatus: updateBookStatus,
};
