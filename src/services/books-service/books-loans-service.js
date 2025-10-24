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
 * @module BookLoansService
 * Сервисный модуль для работы с займами книг.
 *
 * Содержит функции для:
 * - получения всех займов,
 * - получения одного займа по ID,
 * - выдачи книги пользователю (checkout),
 * - возврата книги пользователем.
 */
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var loansModel = require('../../models/book-loans-model');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'bookModel'... Remove this comment to see the full error message
var bookModel = require('../../models/book-model');
/**
 * Получает все займы книг.
 *
 * @async
 * @function getAllLoans
 * @param {import('express').Request} req - Объект запроса.
 * @param {import('express').Response} res - Объект ответа.
 * @returns {Promise<void>} Отправляет JSON с массивом всех займов.
 * @throws {Error} Если произошла ошибка при получении займов.
 */
function getAllLoans(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var loans, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, loansModel.getAllLoans()];
                case 1:
                    loans = _a.sent();
                    res.json(loans);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error getting loans', error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Получает один заем книги по ID.
 *
 * @async
 * @function getLoan
 * @param {import('express').Request} req - req.params.id содержит ID займа.
 * @param {import('express').Response} res
 * @returns {Promise<void>} Отправляет JSON с объектом займа.
 * @throws {Error} Если произошла ошибка при получении займа.
 */
function getLoan(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var loanId, loan, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loanId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, loansModel.getLoan(loanId)];
                case 2:
                    loan = _a.sent();
                    res.json(loan);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error creating loan', error: error_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Выдает книгу пользователю (checkout).
 *
 * @async
 * @function checkoutBook
 * @param {import('express').Request} req - req.params.id содержит ID книги.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом займа.
 * @throws {Error} Если книга недоступна или произошла ошибка сервера.
 */
// доработать
/**
 *
 * @param req
 * @param res
 */
function checkoutBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookId, book, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, bookModel.getBook(bookId)];
                case 2:
                    book = _a.sent();
                    if (!book) {
                        return [2 /*return*/, res.status(404).json({ error: 'Book not found' })];
                    }
                    ;
                    if (!book.available) {
                        return [2 /*return*/, res.status(400).json({ error: 'Book is not available' })];
                    }
                    ;
                    // Обновляем статус книги
                    return [4 /*yield*/, bookModel.updateBookStatus(bookId, false)];
                case 3:
                    // Обновляем статус книги
                    _a.sent();
                    res.status(201).json({
                        message: 'Book checked out successfully'
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('checkoutBook error:', error_3);
                    res.status(500).json({ error: 'Server error' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Возвращает книгу пользователем.
 *
 * @async
 * @function returnBook
 * @param {import('express').Request} req - req.params.id содержит ID книги, req.body.user_id содержит ID пользователя.
 * @param {import('express').Response} res - Объект ответа Express.
 * @returns {Promise<void>} Отправляет JSON с объектом возврата займа.
 * @throws {Error} Если не найден активный заем или произошла ошибка сервера.
 */
function returnBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var bookId, userId, book, loan, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bookId = req.params.id;
                    userId = req.body.user_id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, bookModel.getBook(bookId)];
                case 2:
                    book = _a.sent();
                    if (!book) {
                        return [2 /*return*/, res.status(404).json({ error: 'Book not found' })];
                    }
                    ;
                    return [4 /*yield*/, loansModel.returnBook(bookId, userId)];
                case 3:
                    loan = _a.sent();
                    if (!loan) {
                        return [2 /*return*/, res.status(400).json({ error: 'No active loan found for this user/book' })];
                    }
                    // Обновляем статус книги
                    return [4 /*yield*/, bookModel.updateBookStatus(bookId, true)];
                case 4:
                    // Обновляем статус книги
                    _a.sent();
                    res.json({
                        message: 'Book returned successfully',
                        loan: loan,
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.error('returnBook error:', error_4);
                    res.status(500).json({ error: 'Server error' });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllLoans: getAllLoans, getLoan: getLoan, checkoutBook: checkoutBook, returnBook: returnBook };
