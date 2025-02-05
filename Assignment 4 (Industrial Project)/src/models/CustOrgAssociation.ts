import { DataTypes,Model } from "sequelize";
import sequelize from "../database/config";
import Organization from "./Organization";
import Customer from "./Customer";

class CustOrgA extends Model{
    public id!: number;
    
    public readonly createdAt!:Date;
    public readonly updatedAt!:Date;
}
CustOrgA.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }

},
{
  sequelize,
  tableName: 'custorg',
  timestamps: true,
}
)

export default CustOrgA;