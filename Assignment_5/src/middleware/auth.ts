import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'abc@#1234';

interface UserPayload{
    id:number;
    email:string;
    role:string;
}

export const authenticateJWT =(role:string)=> (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];  // token from Authorization header.

    if (token) {
       
       
         const user=jwt.verify(token,secret) as UserPayload;
              if(!user)
            {
                res.json({message:"No such user found"});
                return;
            }
            if(!role.includes(user.role))
            {
                 res.json({message:"No user for this role"}); 
                 return;          
             }
            (req as any).user = {id:user.id,role:user.role}; // Use type assertion here
            console.log(user.id);
            console.log(user.role);
            console.log("req",(req as any).user);
            next();
        }
    else {
        res.sendStatus(401);
    }
};