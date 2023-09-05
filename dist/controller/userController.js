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
exports.loginUser = exports.registerUser = void 0;
const uuid_1 = require("uuid");
const userModel_1 = require("../model/userModel");
const validation_1 = require("../utils/validation");
const helper_1 = require("../utils/services/helper");
const service_1 = require("../utils/services/service");
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, firstName, lastName, dateOfBirth, email, password, repeat_password, phoneNumber, } = req.body;
        const birth_year = dateOfBirth.split("-")[2];
        const { error } = validation_1.registerSchema.validate({
            userName,
            firstName,
            lastName,
            birth_year,
            email,
            password,
            repeat_password,
        });
        if (error) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: error.message,
            });
        }
        const isExisting = yield userModel_1.UserInstance.findOne({
            where: { email: email },
        });
        if (isExisting) {
            return res.status(400).json({
                status: "error",
                method: req.method,
                message: "user already exists",
            });
        }
        const hashedPassword = yield (0, helper_1.hashPassword)(password);
        const user = (yield userModel_1.UserInstance.create({
            id: (0, uuid_1.v4)(),
            userName,
            firstName,
            lastName,
            dateOfBirth,
            email,
            password: hashedPassword,
            phoneNumber,
        }));
        if (!user) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `user not successfully created`,
            });
        }
        const token = (0, helper_1.generateSignature)({ email: email, id: user.id });
        const keysToExclude = ["password", "id"];
        const updatedUser = (0, service_1.excludeProperty)(user, keysToExclude);
        const updatedUserDetails = (0, service_1.excludeProperty)(updatedUser._previousDataValues, keysToExclude);
        res.cookie("token", token, {
            expires: (0, helper_1.cookieTimeout)(),
        });
        return res.status(200).json({
            status: `success`,
            method: req.method,
            message: `user successfully created`,
            data: updatedUserDetails,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { error } = validation_1.loginSchema.validate({
        email,
        password,
    });
    if (error) {
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: error.message,
        });
    }
    const user = (yield userModel_1.UserInstance.findOne({
        where: { email: email },
    }));
    if (!user) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: "you are not a registered user",
        });
    }
    const validatePassword = yield (0, helper_1.verifyPassword)(password, user.password);
    if (!validatePassword) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid email or password",
        });
    }
    const token = yield (0, helper_1.generateSignature)({
        id: user.id,
        email: user.email,
    });
    res.cookie("token", token, {
        expires: (0, helper_1.cookieTimeout)(),
    });
    return res.status(200).json({
        status: "success",
        message: "User logged in successfully",
    });
});
exports.loginUser = loginUser;
