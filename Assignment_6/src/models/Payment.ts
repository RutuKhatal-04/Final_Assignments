import {DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class Payment extends Model{
    public id!:number;
    public userid!:number;
    public bookid!:number;
    public amount!:number;
    public status!:string;
    public createdAt!:Date;
}

Payment.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    userid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    bookid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false
    }
},{
    sequelize,tableName:'Payment',timestamps:true
});

export default Payment;