import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig";
import { BidderAttributes } from "../utils/constant/interface";
import { UserInstance } from "./userModel";


export class BidderInstance extends Model<BidderAttributes> {};


BidderInstance.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    bidAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isPaid:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    timeStamp: {
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    sequelize: db,
    tableName: `Bidder`
}
)


// User and Bid association - a user can make many bid and a bid belongs to a user

UserInstance.hasMany(BidderInstance, {
    sourceKey: `id`,
    foreignKey: `userId`, // this determines the name in `associations`!
    as: `bid`
  });
  
  BidderInstance.belongsTo(UserInstance, { targetKey: `id` });