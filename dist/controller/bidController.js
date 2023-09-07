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
exports.makeBid = void 0;
const userModel_1 = require("../model/userModel");
const bidModel_1 = require("../model/bidModel");
const uuid_1 = require("uuid");
const makeBid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auctionId } = req.params;
        const { email, bidAmount } = req.body;
        const user = yield userModel_1.UserInstance.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `user is not registered`
            });
        }
        const Bid = yield bidModel_1.BidderInstance.create({
            id: (0, uuid_1.v4)(),
            userId: user.id,
            auction: auctionId,
            bidAmount,
            isPaid: false,
            timeStamp: new Date()
        });
        if (!Bid) {
            return res.status(400).json({
                status: `error`,
                method: req.method,
                message: `Bid was unsuccessful`
            });
        }
        res.status(200).json({
            status: `success`,
            method: req.method,
            message: `Bid made successful`,
            data: Bid
        });
    }
    catch (error) {
        next(error);
    }
});
exports.makeBid = makeBid;
