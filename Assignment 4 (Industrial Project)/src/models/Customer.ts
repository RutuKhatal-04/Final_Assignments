import { DataTypes, Model } from "sequelize";
import sequelize from "../database/config";
import Organization from "./Organization";
class Customer extends Model {
  public id!: number;
  public legalName!: string;
  public shortName!: string;
  public addressId!: string;
  public displayName!: string;
  public email!: string;
  public ndaSignedOn!:string;
  public password!:string;
  }

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  legalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  ndaSignedOn: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  }
 
}, {
  sequelize,
  tableName: 'customer',
  timestamps: true,
});

// Customer.belongsTo(Organization,{ foreignKey: 'orgid' });

export default Customer;
