import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig";
import { ItemAttributes } from "../utils/constant/interface";
import { UserInstance } from "./userModel";

export class ItemInstance extends Model<ItemAttributes> {}

UserInstance.hasMany(ItemInstance, { foreignKey: 'userId', as: 'items' });


ItemInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId:{
        type: DataTypes.UUID,
        references:{
            model: UserInstance,
            key:'id'
    
          }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startingBid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reservePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auctionEndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: `Item`,
  }
);


