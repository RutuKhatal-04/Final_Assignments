import express from "express";
import bodyParser from 'body-parser';
import authroutes from "./routes/authroutes";
import { authenticateJWT } from "./middleware/auth";
import dotenv from 'dotenv';
dotenv.config();



const app=express();
const PORT=process.env.PORT;
app.use(express.json());
app.use(bodyParser.json());
app.use('/auth',authroutes);
app.use('/home',authenticateJWT("Admin"),authroutes);
app.use('/employee',authenticateJWT("Employee"),authroutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

