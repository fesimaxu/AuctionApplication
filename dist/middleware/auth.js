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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const userModel_1 = require("../model/userModel");
const helper_1 = require("../utils/services/helper");
const service_1 = require("../utils/services/service");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return res.status(401).json({
                status: `error`,
                message: `You are not logged in`
            });
        }
        const decoded = yield (0, helper_1.verifySignature)(token);
        if (!decoded) {
            return res.status(401).json({
                status: `error`,
                message: `Invalid token or user doesn't exist`
            });
        }
        const user = yield userModel_1.UserInstance.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(401).json({
                status: `error`,
                message: `User with that token no longer exist`
            });
        }
        res.locals.user = (0, service_1.excludeProperty)(user, [`password`]);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.auth = auth;
