"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionInstance = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../config/dbConfig");
const itemModel_1 = require("./itemModel");
const userModel_1 = require("./userModel");
const bidModel_1 = require("./bidModel");
class AuctionInstance extends sequelize_1.Model {
}
exports.AuctionInstance = AuctionInstance;
;
AuctionInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    highestBidder: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    auctionStartTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    auctionEndTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: dbConfig_1.db,
    tableName: `Auction`
});
// User and Auction association - a user can have only one auction at a time and an auction belongs to one user
userModel_1.UserInstance.hasOne(AuctionInstance, {
    sourceKey: `id`,
    foreignKey: `userId`,
    as: `userAuction`
});
AuctionInstance.belongsTo(userModel_1.UserInstance, { targetKey: `id` });
// Auction and item association - an auction can conatin many items but an item belongs to one auction
AuctionInstance.hasMany(itemModel_1.ItemInstance, {
    sourceKey: `id`,
    foreignKey: `itemId`
});
itemModel_1.ItemInstance.belongsTo(AuctionInstance, { targetKey: `id` });
// User and Auction association - a user can have only one auction at a time and an auction belongs to one user
bidModel_1.BidderInstance.hasOne(AuctionInstance, {
    sourceKey: `id`,
    foreignKey: `auctionId`,
    as: `auctionBid`
});
AuctionInstance.belongsTo(bidModel_1.BidderInstance, { targetKey: `id` });
