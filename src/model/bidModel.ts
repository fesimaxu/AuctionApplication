import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig";
import { BidderAttributes } from "../utils/constant/interface";
import { ItemInstance } from "./itemModel";


export class BidderInstance extends Model<BidderAttributes> {};



BidderInstance.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    bidAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeStamp: {
        type: DataTypes.TIME,
        allowNull: false
    },
    itemId: {
        type: DataTypes.STRING,
        references: {
            model: ItemInstance,
            key: `id`
        }
    }
},{
    sequelize: db,
    tableName: `Bid`
}
)