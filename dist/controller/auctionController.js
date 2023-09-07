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
exports.organizeAuction = void 0;
const userModel_1 = require("../model/userModel");
const itemModel_1 = require("../model/itemModel");
const auctionModel_1 = require("../model/auctionModel");
const uuid_1 = require("uuid");
const organizeAuction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, highestBidder, auctionStartTime, auctionEndTime, itemTitle } = req.body;
        const user = yield userModel_1.UserInstance.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `user is not registered`
            });
        }
        const item = yield itemModel_1.ItemInstance.findOne({ where: { title: itemTitle } });
        if (!item) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `item not found`
            });
        }
        const auction = yield auctionModel_1.AuctionInstance.create({
            id: (0, uuid_1.v4)(),
            userId: user.id,
            item: item,
            highestBidder,
            auctionStartTime,
            auctionEndTime
        });
        if (!auction) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `failed to create auction`
            });
        }
        res.status(200).json({
            status: `success`,
            method: req.method,
            message: `auction created successfully`,
            data: auction
        });
    }
    catch (error) {
        next(error);
    }
});
exports.organizeAuction = organizeAuction;
