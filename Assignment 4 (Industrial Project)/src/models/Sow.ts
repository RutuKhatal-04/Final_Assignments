import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config";

class SOW extends Model {
  public id!: number;
  public title!: string;
  public installment!:number;
  public validityPeriod!: number;
  public totalValue!: number;
  public signedOn!:Date;
  
    
}

SOW.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },  
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  installment:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  validityPeriod: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  signedOn:{
    type:DataTypes.DATE,
    allowNull:false
  }
  
}, {
  sequelize,
  tableName: 'sow',
  timestamps: true,
});




// Define associations

  
export default SOW;
