import { DataTypes,Model } from "sequelize";
import sequelize from "../database/config";

class paymentPlan extends Model{
    public id!:number;
    public particular!:string;
    public amount!:number;
    public dueDate!:Date;
    public status!:string;
    public balance!:number;
    public Customer_id!:number;
    public Organization_Id!:number;

    // public SOWId!:number;
}


paymentPlan.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true

    },
    particular:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    dueDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"pending"
    },
balance:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    Customer_Id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Organization_Id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    sequelize,
    timestamps:true,
    tableName:"paymentPlan"

})

export default paymentPlan;