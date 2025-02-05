import {DataType,DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class Employee extends Model{
    public id!:number;
    public email!:string;
    public name!:string;
    public password!:string;
    public assginedTime!:number;
}


Employee.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    assginedTime:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    sequelize,
    tableName:'Employee',
    timestamps:true
})


export default Employee;