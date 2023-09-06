import { Request, Response, NextFunction } from "express";
import { itemSchema } from "../utils/validation";
import { ItemInstance } from "../model/itemModel";




export const createItem = async (req: Request, res: Response, next: NextFunction) => {

    const { title, description, image , startingBid, reservePrice, auctionEndTime } = req.body;

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

      const isExisting = await ItemInstance.findOne({
        where: { title: title },
      });
  
      if (isExisting) {
        return res.status(400).json({
          status: "error",
          method: req.method,
          message: "title of item already exists",
        });
      }


      

}