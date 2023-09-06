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
exports.createItem = void 0;
const validation_1 = require("../utils/validation");
const itemModel_1 = require("../model/itemModel");
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, image, startingBid, reservePrice, auctionEndTime, email } = req.body;
    const { error } = validation_1.itemSchema.validate({
        title, description, image, startingBid, reservePrice, auctionEndTime
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
            status: `error`,
            method: req.method,
            message: `you are not a registered user`
        });
    }
    const isExisting = yield itemModel_1.ItemInstance.findOne({
        where: { title: title },
    });
    if (isExisting) {
        return res.status(400).json({
            status: "error",
            method: req.method,
            message: `title of item already exists`
        });
    }
    const item = yield itemModel_1.ItemInstance.create({
        id: (0, uuid_1.v4)(),
        userId: user.id,
        title,
        description,
        image,
        startingBid,
        reservePrice,
        auctionEndTime
    });
    return res.status(200).json({
        status: `success`,
        method: req.method,
        message: `item successfully created`,
        data: item
    });
});
exports.createItem = createItem;
