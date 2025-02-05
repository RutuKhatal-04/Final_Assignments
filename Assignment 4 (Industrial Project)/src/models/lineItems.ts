import { DataTypes,Model } from "sequelize";
import sequelize from "../database/config";
import { AutoIncrement } from "sequelize-typescript";

class lineItem extends Model{
    public id!:number;
    public particular!:string;
    public amount!:number;
    
    // public sow_id!:number;

}

lineItem.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    particular:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
  
    // sow_id:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // }
},{
    sequelize,
    modelName:"lineItems",
    timestamps:true
})


export default lineItem;