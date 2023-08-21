"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("reflect-metadata");
dotenv_1.default.config();
require("./data/source/init");
const whiteListedClientDomains_1 = require("./constants/whiteListedClientDomains");
const server = (0, express_1.default)();
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whiteListedClientDomains_1.domains.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
server.use((0, cors_1.default)(corsOptions));
server.use((0, cookie_parser_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
exports.default = server;
//# sourceMappingURL=server.js.map