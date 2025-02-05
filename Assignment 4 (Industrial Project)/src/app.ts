import express from "express";
import bodyParser from 'body-parser';
import authRoutes from './routes/authroutes';
import { authenticateJWT, authenticateJWTcust } from './middleware/authMiddleware';
import "./models/associations";
import cron from "node-cron";

import {addClient,  getClient } from "./controllers/Client";
import checkPaymentPlans from "./schedular/scheduler";
const app=express();
const PORT=8000;
app.use(express.json());
app.use(bodyParser.json());
app.use('/auth',authRoutes); //for customer login and registration

app.get('/home', authenticateJWT("Organization"), (req, res) => {
    const user = (req as any).user; //  type assertion 
    res.json({ message: 'This is a home page', user });
});


//for organization functionalities
app.use('/home',authenticateJWT("Organization"),authRoutes);
//for customer functionalities
app.use('/customer',authRoutes);
//for mail scheduling
cron.schedule('* * * * *', ()=>{
    
    checkPaymentPlans();
    console.log("cron running")
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});