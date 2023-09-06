"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInstance = void 0;
const sequelize_1 = require("sequelize");
const dbConfig_1 = require("../config/dbConfig");
const userModel_1 = require("./userModel");
class ItemInstance extends sequelize_1.Model {
}
exports.ItemInstance = ItemInstance;
//UserInstance.hasMany(ItemInstance, { foreignKey: 'userId', as: 'items' });
ItemInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: userModel_1.UserInstance,
            key: 'id'
        }
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    startingBid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reservePrice: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    auctionEndTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: dbConfig_1.db,
    tableName: `Item`,
});
