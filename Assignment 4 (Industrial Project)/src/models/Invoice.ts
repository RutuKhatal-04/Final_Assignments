import {DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class Invoice extends Model{
    public id!:number;
    public value!:number;
    public customer_id!:number;
    public pay_received!:Date;
    public organization_id!:number;
}

Invoice.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        
        primaryKey:true

    },
    value:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    customer_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    pay_received:{
        type:DataTypes.DATE,
        allowNull:false
    },
    organization_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{sequelize,
 tableName:"invoice",
 timestamps:true   
})


export default Invoice;