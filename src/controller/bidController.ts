import { Request, Response, NextFunction } from "express";
import { UserInstance } from "../model/userModel";
import { BidderAttributes, UserAttributes } from "../utils/constant/interface";
import { BidderInstance } from "../model/bidModel";
import { v4 } from "uuid";


export const makeBid = async (req: Request, res: Response, next: NextFunction ) => {

    try {
        
    const { auctionId } = req.params;
    const { email, bidAmount } = req.body;

    const user = await UserInstance.findOne({ where: {email: email}}) as unknown as UserAttributes;

    if(!user){
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `user is not registered`
        })
    }

    const Bid = await BidderInstance.create({
        id: v4(),
        userId: user.id,
        auction: auctionId,
        bidAmount,
        isPaid: false,
        timeStamp: new Date()
    }) as unknown as BidderAttributes;

    if(!Bid){
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `Bid was unsuccessful`
        })
    }


    res.status(200).json({
        status: `success`,
        method: req.method,
        message: `Bid made successful`,
        data: Bid
    })

    } catch (error) {
        next(error)
    }
}