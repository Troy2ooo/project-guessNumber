"use strict";
/**
 * @module AuthModel
 * Работа с таблицей refresh_tokens
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
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'db'.
var db = require('../../db');
/**
 * Сохраняет refresh-токен в базу
 * @param {number} userId - ID пользователя
 * @param {string} token - сам токен
 * @param {string|number} ttl - срок жизни (например, '7d')
 */
function refreshToken(userId, token, ttl) {
    return __awaiter(this, void 0, void 0, function () {
        var selectQuery, result, updateQuery, insertQuery;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectQuery = 'SELECT 1 FROM refresh_tokens WHERE user_id = $1';
                    return [4 /*yield*/, db.query(selectQuery, [userId])];
                case 1:
                    result = _a.sent();
                    if (!(result.rowCount > 0)) return [3 /*break*/, 3];
                    updateQuery = "\n      UPDATE refresh_tokens\n      SET token = $2, expires_at = $3\n      WHERE user_id = $1\n    ";
                    return [4 /*yield*/, db.query(updateQuery, [userId, token, ttl])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    insertQuery = "\n      INSERT INTO refresh_tokens (user_id, token, expires_at)\n      VALUES ($1, $2, $3)\n      ON CONFLICT (user_id) DO UPDATE\n      SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at;\n    ";
                    // @ts-expect-error TS(2304): Cannot find name 'query'.
                    return [4 /*yield*/, db.query(query, [userId, token, ttl])];
                case 4:
                    // @ts-expect-error TS(2304): Cannot find name 'query'.
                    _a.sent();
                    _a.label = 5;
                case 5:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
;
/**
 * Возвращает refresh-токен по его строке
 * @param {string} token
 */
// Проверяем, существует ли токен и не истёк ли
/**
 *
 * @param token
 */
function getRefreshToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM refresh_tokens WHERE token = $1";
                    return [4 /*yield*/, db.query(query, [token])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
;
/**
 * Удаляет refresh-токен из базы (например, при logout)
 * @param {string} token
 */
function deleteRefreshToken(token) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "DELETE FROM refresh_tokens WHERE token = $1";
                    return [4 /*yield*/, db.query(query, [token])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
;
/**
* Обновляет refresh-токен (удаляет старый и сохраняет новый)
* @param {number} userId
* @param {string} oldToken
* @param {string} newToken
* @param {string|number} ttl
*/
function replaceRefreshToken(userId, oldToken, newToken, ttl) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deleteRefreshToken(oldToken)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, refreshToken(userId, newToken, ttl)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = { refreshToken: refreshToken, getRefreshToken: getRefreshToken, deleteRefreshToken: deleteRefreshToken, replaceRefreshToken: replaceRefreshToken };
