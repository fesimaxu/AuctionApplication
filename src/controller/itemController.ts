import { Request, Response, NextFunction } from "express";
import { itemSchema } from "../utils/validation";
import { ItemInstance } from "../model/itemModel";
import { UserInstance } from "../model/userModel";
import { v4 } from "uuid";
import { ItemAttributes, UserAttributes } from "../utils/constant/interface";




export const createItem = async (req: Request, res: Response, next: NextFunction) => {

    const { title, description, image , startingBid, reservePrice, auctionEndTime, email } = req.body;

    const { error } = itemSchema.validate({
        title, description, image , startingBid, reservePrice, auctionEndTime
      });

      if (error) {
        return res.status(400).json({
          status: `error`,
          method: req.method,
          message: error.message,
        });
      }

      const user = (await UserInstance.findOne({
        where: { email: email },
      })) as unknown as UserAttributes;
    
  
      if (!user) {
        return res.status(400).json({
          status: `error`,
          method: req.method,
          message: `you are not a registered user`
        });
      }
  

      const isExisting = await ItemInstance.findOne({
        where: { title: title },
      });
  
      if (isExisting) {
        return res.status(400).json({
          status: "error",
          method: req.method,
          message: `title of item already exists`
        });
      }

      const item = await ItemInstance.create({
        id: v4(),
        userId: user.id,
        title,
        description,
        image,
        startingBid,
        reservePrice,
        auctionEndTime
      }) as unknown as ItemAttributes

      return res.status(200).json({
        status: `success`,
        method: req.method,
        message: `item successfully created`,
        data: item
      });

}