import express from "express";
import appRoutes from "./router/appRoutes";
import sequelize from "./Database/config";
import bodyParser from "body-parser";
const app=express();
app.use(express.json())
const PORT=8000;

app.use(bodyParser.json());
app.use("/",appRoutes) 




app.listen(PORT,()=>console.log("Server started"))


const startServer=async()=>{
    try{await sequelize.authenticate()
        console.log("Connection authenticated")
        await sequelize.sync({alter:true})
        console.log("Database synchronised")
    }
    catch(error){
        console.log("error connecing to db")
    }
};
startServer();