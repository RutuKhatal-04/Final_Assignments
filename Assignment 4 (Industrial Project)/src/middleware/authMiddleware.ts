import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'Rkhkjfjsdkbf@#$$24?#@';

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
                res.sendStatus(403);
                return;
            }
            if(!role.includes(user.role))
            {
                 res.sendStatus(403); 
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


export const authenticateJWTcust=(role:string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (token) {
        const user=jwt.verify(token,secret) as UserPayload;
        if(!user)
      {
          res.sendStatus(403);
          return;
      }
      if(!role.includes(user.role))
      {
           res.sendStatus(403); 
           return;          
       }
      (req as any).user = {id:user.id,role:user.role}; 
      next();
        
    } else {
        res.sendStatus(401);
    }
};