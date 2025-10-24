"use strict";
/**
 * @module BookLoansModel
 *
 * Модуль для работы с таблицей `book_loans` в базе данных.
 *
 * Содержит функции для:
 * - получения всех записей о займах книг,
 * - получения одного займа по ID,
 * - регистрации выдачи книги пользователю,
 * - регистрации возврата книги.
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
 * пользовательский тип, описывающий свойства объекта, который содержит данные о записях займов книг.
 *
 * @typedef {Object} BookLoan
 * @property {number} id - Уникальный идентификатор займа.
 * @property {number} book_id - ID книги.
 * @property {number} user_id - ID пользователя, который взял книгу.
 * @property {Date} taken_at - Дата и время, когда книга была взята.
 * @property {Date|null} returned_at - Дата и время возврата книги (если книга возвращена).
 */
/**
 * Получает все записи о займах книг из базы данных.
 *
 * @async
 * @function getAllLoans
 * @returns {Promise<BookLoan[]>} Массив всех записей о займах.
 * @throws {Error} Если произошла ошибка при выполнении SQL-запроса.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function getAllLoans() {
    return __awaiter(this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM book_loans';
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
 * @function getLoan
 * @param {number} loanId - Уникальный идентификатор записи займа.
 * @returns {Promise<BookLoan>} Объект с информацией о займе.
 * @throws {Error} Если запись с таким ID не найдена или произошла ошибка в запросе.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function getLoan(loanId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, value, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = 'SELECT * FROM book_loans WHERE id = $1;';
                    value = [loanId];
                    return [4 /*yield*/, pool.query(query, value)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Регистрирует выдачу книги пользователю (создаёт новую запись о займе).
 *
 * @async
 * @function checkoutBook
 * @param {number} bookId - ID книги, которую берут.
 * @param {number} userId - ID пользователя, который берёт книгу.
 * @returns {Promise<BookLoan>} Объект с данными о созданной записи займа.
 * @throws {Error} Если произошла ошибка при добавлении записи.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function checkoutBook(bookId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    INSERT INTO book_loans (book_id, user_id, taken_at)\n    VALUES ($1, $2, NOW())\n    RETURNING *;\n  ";
                    values = [bookId, userId];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
/**
 * Регистрирует возврат книги пользователем (обновляет запись займа).
 *
 * @async
 * @function returnBook
 * @param {number} bookId - ID книги, которую возвращают.
 * @param {number} userId - ID пользователя, который возвращает книгу.
 * @returns {Promise<BookLoan>} Обновлённая запись займа с датой возврата.
 * @throws {Error} Если запись не найдена или книга уже была возвращена.
 */
// @ts-expect-error TS(2393): Duplicate function implementation.
function returnBook(bookId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var query, values, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n    UPDATE book_loans\n    SET returned_at = NOW()\n    WHERE book_id = $1 AND user_id = $2 AND returned_at IS NULL\n    RETURNING *;\n  ";
                    values = [bookId, userId];
                    return [4 /*yield*/, pool.query(query, values)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllLoans: getAllLoans, getLoan: getLoan, checkoutBook: checkoutBook, returnBook: returnBook };
