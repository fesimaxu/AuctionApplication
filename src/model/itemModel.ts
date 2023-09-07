import { DataTypes, Model } from "sequelize";
import { db } from "../config/dbConfig";
import { ItemAttributes } from "../utils/constant/interface";
import { UserInstance } from "./userModel";

export class ItemInstance extends Model<ItemAttributes> {}




ItemInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
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





// a user can have many items for auction and an item belongs to a user

UserInstance.hasMany(ItemInstance, {
    sourceKey: 'id',
    foreignKey: 'userId' // this determines the name in `associations`!
  });
  
  ItemInstance.belongsTo(UserInstance, { targetKey: 'id' });