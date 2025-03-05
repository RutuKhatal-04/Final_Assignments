import {DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class User extends Model{
    public id!:number;
    public name!:string;
    public password!:string;
    public email!:string;
}


User.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,tableName:"User",timestamps:true
});

export default User;