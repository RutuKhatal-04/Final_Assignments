import {DataType,DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class Timesheet extends Model{
    public id!:number;
    public empid!:number;
    public shift_id!:number;
    public projectName!:string;
    public taskName!:string;
    public fromDate!:Date;
    public endDate!:Date;
}


Timesheet.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    empid:{
        type:DataTypes.STRING,
        allowNull:false
    },
    shift_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    projectName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    taskName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fromDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    endDate:{
        type:DataTypes.DATE,
        allowNull:false   
    }

},{
    sequelize,
    tableName:'Timesheet',
    timestamps:true
})


export default Timesheet;