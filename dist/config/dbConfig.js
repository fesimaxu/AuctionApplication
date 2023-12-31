"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_NAME = exports.DB_HOST = exports.PORT = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./index"));
dotenv_1.default.config;
exports.PORT = index_1.default.PORT, exports.DB_HOST = index_1.default.DB_HOST, exports.DB_NAME = index_1.default.DB_NAME, exports.DB_USERNAME = index_1.default.DB_USERNAME, exports.DB_PASSWORD = index_1.default.DB_PASSWORD, exports.DB_PORT = index_1.default.DB_PORT;
exports.db = new sequelize_1.Sequelize(exports.DB_NAME, //name of database
exports.DB_USERNAME, //name of username
exports.DB_PASSWORD, //db password
{
    host: exports.DB_HOST,
    port: exports.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        encrypt: true,
        //  ssl: {
        //    rejectUnauthorized: false,
        //  },
    },
});
