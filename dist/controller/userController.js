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
exports.registerUser = void 0;
const uuid_1 = require("uuid");
const userModel_1 = require("../model/userModel");
const validation_1 = require("../utils/validation");
const helper_1 = require("../utils/services/helper");
const service_1 = require("../utils/services/service");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, firstName, lastName, dateOfBirth, email, password, phoneNumber } = req.body;
        const birth_year = dateOfBirth.split(' ')[2];
        const { error } = validation_1.registerSchema.validate({ userName, firstName, lastName, birth_year, email, password });
        if (error) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: error.message
            });
        }
        const hashedPassword = yield (0, helper_1.hashPassword)(password);
        const user = userModel_1.UserInstance.create({
            id: (0, uuid_1.v4)(),
            userName,
            firstName,
            lastName,
            dateOfBirth,
            email,
            password: hashedPassword,
            phoneNumber
        });
        if (!user) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `user not successfully created`
            });
        }
        const token = (0, helper_1.generateSignature)(user.id);
        const keysToExclude = [password, user.id];
        const updatedUser = (0, service_1.excludeProperty)(user, keysToExclude);
        res.cookie('token', token, {
            expires: (0, helper_1.cookieTimeout)()
        });
        return res.status(200).json({
            status: `success`,
            method: req.method,
            message: `user successfully created`,
            data: updatedUser
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
