import { DataTypes,Model } from "sequelize";
import sequelize from "../database/config";


class Review extends Model{
    public id!:number;
    public userid!:number;
    public bookid!:number;
    public content!:string;
}


Review.init({
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
    content:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    tableName:"Review",
    timestamps:true
});

export default Review;