import {Request,Response} from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin';

import jwt from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';
import User from '../models/User';


interface UserPayload{
    id:number,
    email:string,
    role:string
}


const secret='abc@#1234';

export const register=async (req:Request,res:Response)=>{
    const {name,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,5);

    try{
        const admin=await Admin.create({
            name,
            email,
            password:hashedPassword
        });
        res.json({message:"Admin registered"})
    }catch(error){
        console.error('Error during registration',error)
        res.json({error:'Internal server error'});
    }
};


export const login =async(req:Request,res:Response)=>{
    const {email,password}=req.body;
 try  { const user=await Admin.findOne({
        where:{email}
    });
    if(!user){
        res.json({message:"Invalid credentails"});
        return;
    }
    const ispassword=await bcrypt.compare(password,user.password);
    if(!ispassword){
        res.json({message:"Invalid password"});
        return;
    }
    const payload:UserPayload={
        id:user.id,email:user.email,role:"Admin"
    }

    const token=jwt.sign(payload,secret);
    res.json({token});
    }

    catch(error){
        console.error('error during login',error);
        res.json({error:"Internal server error"});
    }

};


//User Registration

export const userRegister=async(req:Request,res:Response)=>{
    const {name,email,password}=req.body;
    try{
    const hashedPassword=await bcrypt.hash(password,5);

    const user=await User.create({
        name,email,password:hashedPassword
    })
    res.json({message:"User Added"});
}
catch(error){
    console.error("Error during registratio",error);
    res.json({message:"Internal server error"});
}
}


export const userLogin=async(req:Request,res:Response)=>{
    const{email,password}=req.body;
    try{
        const userdata=await User.findOne({where:{email:email}});
        if(!userdata){
            res.json({message:"Invalid credentials"});
        }
        const ispassword=await bcrypt.compare(password,userdata?.dataValues.password);

        if(!ispassword){
            res.json({message:"Password is wrong"});
            return;
        }

        const payload:UserPayload={
            id:userdata?.dataValues.id,email:userdata?.dataValues.email,role:"User"
        }
        const token=jwt.sign(payload,secret);
        res.json({token});
    }catch(error){
        res.json({error:"Internal server error"});
    }
}