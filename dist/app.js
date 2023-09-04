"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./config/index"));
const dbConfig_1 = require("./config/dbConfig");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const { PORT } = index_1.default;
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
const BUILD_PORT = PORT;
dbConfig_1.db.sync({}).then(() => {
    console.log(`Database is succeffully connected`);
}).catch((error) => {
    console.log(`Database error at ${error}`);
});
app.listen(BUILD_PORT || 3000, () => {
    console.log(`Auction Application running on http://localhost:${BUILD_PORT}/`);
});
exports.default = app;
