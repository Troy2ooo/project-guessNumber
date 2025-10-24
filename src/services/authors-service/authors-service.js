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
 * @module AuthorsService
 * Сервисный модуль для работы с авторами.
 *
 * Содержит функции для:
 * - получения всех авторов,
 * - получения одного автора по ID,
 * - создания нового автора,
 * - удаления автора по ID.
 */
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var authorsModel = require('../../models/authors-model');
/**
 * Получает всех авторов и отправляет их в ответе.
 *
 * @async
 * @function getAllAuthors
 * @param {Object} req - HTTP-запрос.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при получении авторов.
 */
function getAllAuthors(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authors, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, authorsModel.getAllAuthors()];
                case 1:
                    authors = _a.sent();
                    res.json(authors);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error getting authors', error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Получает одного автора по ID и отправляет его в ответе.
 *
 * @async
 * @function getAuthor
 * @param {Object} req - HTTP-запрос.
 * @param {Object} req.params - Параметры запроса.
 * @param {number} req.params.id - ID автора.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при получении автора.
 */
function getAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authorId, author, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authorId = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authorsModel.getOneAuthor(authorId)];
                case 2:
                    author = _a.sent();
                    res.json(author);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error getting author', error: error_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Создает нового автора и отправляет объект созданного автора в ответе.
 *
 * @async
 * @function createAuthor
 * @param {Object} req - HTTP-запрос.
 * @param {Object} req.body - Тело запроса.
 * @param {string} req.body.name - Имя автора.
 * @param {string} req.body.bio - Биография автора.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при создании автора.
 */
function createAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var author, newAuthor, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    author = {
                        name: req.body.name,
                        bio: req.body.bio,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authorsModel.createAuthor(author.name, author.bio)];
                case 2:
                    newAuthor = _a.sent();
                    res.json({ message: 'Author created successfully', author: newAuthor });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    // @ts-expect-error TS(2339): Property 'message' does not exist on type 'unknown... Remove this comment to see the full error message
                    res.status(500).json({ message: 'Error creating author', error: error_3.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Удаляет автора по ID и отправляет объект удаленного автора в ответе.
 *
 * @async
 * @function deleteAuthor
 * @param {Object} req - HTTP-запрос.
 * @param {Object} req.params - Параметры запроса.
 * @param {number} req.params.id - ID автора.
 * @param {Object} res - HTTP-ответ.
 * @returns {Promise<void>}
 * @throws {Error} Если произошла ошибка при удалении автора.
 */
function deleteAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var authorId, deletedAuthor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authorId = req.params.id;
                    return [4 /*yield*/, authorsModel.deleteAuthor(authorId)];
                case 1:
                    deletedAuthor = _a.sent();
                    if (deletedAuthor) {
                        res.json({ message: 'Author deleted successfully', author: deleteAuthor });
                    }
                    else {
                        res.status(404).json({ message: 'Author not found' });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { getAllAuthors: getAllAuthors, getAuthor: getAuthor, createAuthor: createAuthor, deleteAuthor: deleteAuthor };
