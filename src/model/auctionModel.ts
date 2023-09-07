import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig";
import { AuctionAttributes } from "../utils/constant/interface";
import { ItemInstance } from "./itemModel";
import { UserInstance } from "./userModel";
import { BidderInstance } from "./bidModel";

export class AuctionInstance extends Model<AuctionAttributes> {};



AuctionInstance.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
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
  
},
{
    sequelize: db,
    tableName: `Auction`
}
)

// User and Auction association - a user can have only one auction at a time and an auction belongs to one user
UserInstance.hasOne(AuctionInstance, {  
    sourceKey: `id`, 
    foreignKey: `userId`,
    as: `userAuction`
});
AuctionInstance.belongsTo(UserInstance, { targetKey: `id` });

// Auction and item association - an auction can conatin many items but an item belongs to one auction
AuctionInstance.hasMany(ItemInstance, {  
    sourceKey: `id`, 
    foreignKey: `itemId`
 });
ItemInstance.belongsTo(AuctionInstance, { targetKey: `id` });


// User and Auction association - a user can have only one auction at a time and an auction belongs to one user
BidderInstance.hasOne(AuctionInstance, {  
    sourceKey: `id`, 
    foreignKey: `auctionId`,
    as: `auctionBid`
});
AuctionInstance.belongsTo(BidderInstance, { targetKey: `id` });

