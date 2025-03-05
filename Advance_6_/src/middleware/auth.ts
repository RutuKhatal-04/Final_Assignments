import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';


const secret='abc@#1234';

interface UserPayload{
    id:number,
    role:string,
    email:string
}

export const authenticatejwt=(role:string)=>(req:Request,res:Response,next:NextFunction)=>{
    const token=req.header('Authorization')?.split(' ')[1];

    if(token){
        const user=jwt.verify(token,secret) as UserPayload;
        if(!user){
            res.json({message:"No such user found"});
            return ;
        }

        if(!role.includes(user.role)){
            res.json({message:"No user with this role found"});
            return ;
        }
        (req as any).user={id:user.id,role:user.role};
        console.log(user.id);
        console.log(user.role);
        console.log((req as any).user);
        next();
    }else{
        res.json({message:"Invalid token"});
    }
}
