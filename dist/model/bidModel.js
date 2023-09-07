"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidderInstance = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../config/dbConfig");
const userModel_1 = require("./userModel");
class BidderInstance extends sequelize_1.Model {
}
exports.BidderInstance = BidderInstance;
;
BidderInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    bidAmount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isPaid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    timeStamp: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    }
}, {
    sequelize: dbConfig_1.db,
    tableName: `Bidder`
});
// User and Bid association - a user can make many bid and a bid belongs to a user
userModel_1.UserInstance.hasMany(BidderInstance, {
    sourceKey: `id`,
    foreignKey: `userId`,
    as: `bid`
});
BidderInstance.belongsTo(userModel_1.UserInstance, { targetKey: `id` });
