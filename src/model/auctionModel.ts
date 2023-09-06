import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig";
import { AuctionAttributes } from "../utils/constant/interface";
import { ItemInstance } from "./itemModel";

export class AuctionInstance extends Model<AuctionAttributes> {};



AuctionInstance.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    itemId: {
        type: DataTypes.STRING,
        references: {
            model: ItemInstance,
            key: `id`
        }
    },
    highestBidder: {
        type: DataTypes.STRING,
        allowNull: false
    },
      auctionStartTime: {
         type: DataTypes.DATE,
        allowNull: false
    },
    auctionEndTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
  
},{
    sequelize: db,
    tableName: `Auction`
}
)