import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import Employee from '../models/Employee';
import { sendpassEmail } from '../service/email';

interface UserPayload{
    id:number;
    email:string;
    role:string;
}

const secret = 'abc@#1234';
export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const organization = await Admin.create({ email, password: hashedPassword});
        res.status(201).json(organization);
    } catch (error) {
        console.error('Error during registration:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const login = async (req: Request, res: Response)=> {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const payload:UserPayload={
            id: admin.id, email: admin.email,role:"Admin"
        }
        const token = jwt.sign(payload, secret);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const addEmp=async(req:Request,res:Response)=>{
    const {name,email,password,assginedTime}=req.body;
  
        const existingEmp = await Employee.findOne({
            where: {
                email: email
            }
        });
        if(existingEmp){
        res.json({message:"Employee already exist"});
        return;
        }
        else{
            const employee = await Employee.create({
                name,
                email,
                password,
                assginedTime
            })
            sendpassEmail(email,password);
            res.json({message:"Employee added",employee});
        }

}
