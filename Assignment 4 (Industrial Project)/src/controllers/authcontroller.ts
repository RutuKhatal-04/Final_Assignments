import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Organization from '../models/Organization';
import Customer from '../models/Customer';
import { runInContext } from 'vm';



//Organization registration

interface UserPayload{
    id:number;
    email:string;
    role:string;
}

const secret = 'Rkhkjfjsdkbf@#$$24?#@';
export const register = async (req: Request, res: Response) => {
    const { email, password, ...otherDetails } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const organization = await Organization.create({ email, password: hashedPassword, ...otherDetails });
        res.status(201).json(organization);
    } catch (error) {
        console.error('Error during registration:', error); // Log the error
        res.status(500).json({ error: 'Internal server error' });
    }
};


// organization login based on roles

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const organization = await Organization.findOne({ where: { email } });

        if (!organization) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, organization.password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const payload:UserPayload={
            id: organization.id, email: organization.email,role:"Organization"
        }
        const token = jwt.sign(payload, secret);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




//Customer login based on role
export const Custlogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log(`here ${email},${password}`);
    console.log("------------------------------------------------------------------------------------------------------------------------")
    try {
        const customer = await Customer.findOne({ where: { email } });
        console.log(customer);

        if (!customer) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        const isPasswordValid = password===customer.password;
        console.log(password);
        console.log("password",customer.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials after customer is found' });
            return;
        }

        //role is passed using middleware
        const payload={
            id: customer.id, email: customer.email,role:"Customer" 
        }
        const token = jwt.sign(payload, secret);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



