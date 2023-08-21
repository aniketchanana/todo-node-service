"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCookieString = exports.isUpdateAllowed = void 0;
const lodash_1 = require("lodash");
const isUpdateAllowed = (updateObj, allowedKeys) => {
    return Object.keys(updateObj).every((parameterName) => allowedKeys.includes(parameterName));
};
exports.isUpdateAllowed = isUpdateAllowed;
const parseCookieString = (cookieString) => {
    const parsedCookies = {};
    const pairs = (0, lodash_1.split)(cookieString, ";");
    pairs.forEach((pair) => {
        const [key, value] = (0, lodash_1.split)(pair, "=");
        parsedCookies[(0, lodash_1.trim)(key)] = (0, lodash_1.trim)(value);
    });
    return parsedCookies;
};
exports.parseCookieString = parseCookieString;
//# sourceMappingURL=index.js.map