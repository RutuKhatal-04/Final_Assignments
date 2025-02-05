import {DataType,DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class Shift extends Model{
    public id!:number;
    public empid!:number;
    public startTime!:Date;
    public endTime!:Date;
    public actualTime!:number;
}


Shift.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    empid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    startTime:{
        type:DataTypes.DATE,
        allowNull:false
    },
    endTime:{
        type:DataTypes.DATE,
        allowNull:false
    },
    actualTime:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    sequelize,
    tableName:'Shift',
    timestamps:true
})


export default Shift;