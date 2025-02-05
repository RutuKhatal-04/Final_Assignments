import sequelize from "../Database/config";
import {DataTypes,Model} from "sequelize";


class Weather extends Model{
    public id!:number;
    public city!:string;
    public country!:string;
    public weather!:string; 
    public readonly createdAt!:Date;
    public Latitude!:string;
    public Longitude!:string;
    updatedAt: any;

}

Weather.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    weather:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    Latitude:{
        type:DataTypes.STRING,
    },
    Longitude:{
        type:DataTypes.STRING,
    }
},{
    sequelize,
    tableName:'weather',
    timestamps:true,
});


export default Weather;