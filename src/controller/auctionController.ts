import { Request, Response, NextFunction } from "express";
import { UserInstance } from "../model/userModel";
import { AuctionAttributes, ItemAttributes, UserAttributes } from "../utils/constant/interface";
import { ItemInstance } from "../model/itemModel";
import { AuctionInstance } from "../model/auctionModel";
import { v4 } from "uuid";




export const organizeAuction = async (req: Request, res: Response, next : NextFunction) => {

    try {
        

    const { email, highestBidder, auctionStartTime, auctionEndTime, itemTitle  } = req.body;

    const user = await UserInstance.findOne({ where: { email: email }}) as unknown as UserAttributes;


    if(!user){
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `user is not registered`
        })
    }

    const item = await ItemInstance.findOne({ where: { title: itemTitle }}) as unknown as ItemAttributes;

    if(!item){
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `item not found`
        })
    }

    const auction = await AuctionInstance.create({
        id: v4(),
        userId: user.id,
        item: item,
        highestBidder,
        auctionStartTime,
        auctionEndTime
    }) as unknown as AuctionAttributes;

    if(!auction){
        return res.status(400).json({
            status: `error`,
            method: req.method,
            message: `failed to create auction`
        })
    }

    res.status(200).json({
        status: `success`,
        method: req.method,
        message: `auction created successfully`,
        data: auction
    })

    } catch (error) {
        next(error)
    }
}