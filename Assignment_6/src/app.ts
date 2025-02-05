import express from "express";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authroutes from "./routes/authroutes";
import { authenticatejwt } from "./middleware/auth";
dotenv.config();
const PORT=process.env.PORT;

const app=express();

app.use(express.json());
app.use('/',authroutes);
app.use('/admin',authenticatejwt("Admin"),authroutes);
app.use('/user',authenticatejwt("User"),authroutes)
app.listen(PORT ,()=>{
    console.log("Server started at port",PORT);
})