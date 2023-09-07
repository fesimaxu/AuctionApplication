"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const dbConfig_1 = require("./config/dbConfig");
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const errorMessage_1 = require("./middleware/errorMessage");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const app = (0, express_1.default)();
const { PORT } = config_1.default;
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/users', userRoutes_1.default);
app.use('/item', itemRoutes_1.default);
app.all('*', errorMessage_1.notFoundError);
app.use(errorMessage_1.errorMessages);
dbConfig_1.db.sync({ alter: true }).then(() => {
    console.log(`Database is successfully connected`);
}).catch((error) => {
    console.log(`Database error at ${error}`);
});
const BUILD_PORT = PORT;
app.listen(BUILD_PORT || 3000, () => {
    console.log(`Auction Application running on http://localhost:${BUILD_PORT}/`);
});
exports.default = app;
