"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    userName: joi_1.default.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: joi_1.default.ref('password'),
    birth_year: joi_1.default.number()
        .integer()
        .max(2005),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('password', 'repeat_password');
