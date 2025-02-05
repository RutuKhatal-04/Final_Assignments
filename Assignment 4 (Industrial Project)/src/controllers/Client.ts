
import { Request, Response } from 'express';
import Customer from '../models/Customer';
import { authenticateJWT } from '../middleware/authMiddleware';
import Organization from '../models/Organization';
import bcrypt from 'bcryptjs';
import CustOrgA from '../models/CustOrgAssociation';
import SOW from '../models/Sow';
import paymentPlan from '../models/paymentPlan';
import crypto from 'crypto'
import { sendCustEmail } from '../service/email';
import lineItem from '../models/lineItems';



// To add client by organization
export const addClient = async (req: Request, res: Response):Promise<any> => {
    const { legalName, shortName, addressId, displayName, email, ndaSignedOn } = req.body;
   
    const orgid = (req as any).user.id; // Extract orgid from the token
    //check if the client exist if yes then only the organization id and customer id gets added in the custorgAid table if client doesnt exits then data gets added in customer table of new client and checking is done on the basis of "email"
    try {
        const existingCustomer = await Customer.findOne({
            where: {
                email: email
            }
        });

        if (existingCustomer) {
            const clientId = existingCustomer.id;
            //customer already exist thus checked wether for that organization is it there if yes then directly url of sow creation is passed if not then gets added in custorg table with that organization id and custid
            const existingAssociation = await CustOrgA.findOne({
                where: {
                    OrganizationId: orgid,
                    CustomerId: clientId
                }
            });

            if (existingAssociation) {
                const url = `http://localhost:8000/home/addClient/sow/${clientId}`;
                return res.status(201).json(`To create a sow for ${clientId} click here ${url}`);
            } else {
               
                await CustOrgA.create({
                    OrganizationId: orgid,
                    CustomerId: clientId
                });
               
                const url = `http://localhost:8000/home/addClient/sow/${clientId}`;
                return res.status(201).json(`To create a sow for ${clientId} click here ${url}`);
            }
        } else {
            const password=passCreation(7);
            //Email of password created for customer is send
            sendCustEmail(email,password)

            //if customer doesnt exist then get added in customer table
            const customer = await Customer.create({
                orgid,
                legalName,
                shortName,
                addressId,
                displayName,
                email,
                ndaSignedOn,
                password
            });
            
            const clientId = customer.id;
            //and then both ids get added in custorga table
            await CustOrgA.create({
                OrganizationId: orgid,
                CustomerId: clientId
            });
            const url = `http://localhost:8000/home/addClient/sow/${clientId}`;
            return res.status(201).json(`To create a sow for ${clientId} click here ${url}`);
        }
    } catch (error) {
        console.error('Error adding client:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
//password creation password send by emial to customer for its login
const passCreation = (length: number): string => {
    return crypto.randomBytes(length).toString('hex');
};



//Sow creation of the added customer
export const makesow = async (req: Request, res: Response): Promise<any> => {
    const custId = req.params.id;
    const orgid = (req as any).user.id;

    //custorgid taken for particular organization and customer of which sow to be created
    try {
        const orgcustid = await CustOrgA.findOne({
            where: {
                OrganizationId: orgid,
                CustomerId: custId
            }
        });

        if (!orgcustid) {
            return res.status(404).json({ error: 'Association not found' });
        }


        //destructing data from the payload passed
        const { title, installment,validityPeriod, totalValue,signedOn } = req.body;
        //sow data added
        const sow = await SOW.create({
            CustOrgAId: orgcustid.id,  
            
            title,
            installment,
            validityPeriod,
            totalValue,
            signedOn
        });
        //url paased for making payment plan for that sow
        const url = `http://localhost:8000/home/sow/makepay/${sow.id}`;
            
        return res.status(201).json({message:`Now you can make payment plans for ${installment} installments here is the link :${url} `});
    } catch (error) {
        console.error('Error creating SOW:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


//getting all clients of that particular loggedin organization

export const getClient = async (req: Request, res: Response) => {
    const orgid = (req as any).user.id;
    const customers = await Customer.findAll({});
    res.json({ message: "All customers list", customers });
};



//Payment plan creation 

export const createplan = async (req: Request, res: Response) => {
    
        try {

    //data destructed from payload
      const { particular, amount, dueDate, status } = req.body;

      //sow id was passed in params
      const sowid = req.params.id;

      //get data of sow with installement and custorgid as attribute
      const pay=await SOW.findOne({
        attributes:['installment',"CustOrgAId"],
        where:{
            id:sowid,
        }
      })
      console.log("pay",pay);
      console.log(sowid);
      

      //Installment no is extracted
      const installment=pay?.dataValues.installment;

      //Counted payment plan made using sow id to verify how many more paymentplan can we make 
      const countSowid=await paymentPlan.count({where:{
        SOWId:sowid
      }})
      console.log(countSowid);
      const custorgid=pay?.dataValues.CustOrgAId;
      const cust_id=await CustOrgA.findByPk(custorgid,{attributes:["CustomerId","OrganizationId"]})
      console.log("Custorgid",custorgid);
      console.log("Customer id",cust_id?.dataValues.CustomerId);

      //here is the verification done , payment plan will be made according to no of installment for each sow thus we count the existing one above and then compare if less then create plan if crosses the limit then we cant create paymentplan more than installment no  
      if(countSowid<installment){
      const paymentplan = await paymentPlan.create({
        SOWId:sowid,
        particular,
        amount,
        dueDate,
        status,
        balance:amount,
        Customer_Id:cust_id?.dataValues.CustomerId,
        Organization_Id:cust_id?.dataValues.OrganizationId
      });


      //Passing url for creating line items
      const planid=paymentplan.dataValues.id;
      console.log(planid);
      const url=`http://localhost:8000/home/addClient/sow/makelineit/${planid}`;
      res.status(201).json({message:`Payment plan created ${url}`});
    }
    else{
        res.send("Cannot create a payment plan ")
    }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while creating the payment plan." });
    }
  };


  //line items creation 

  export const lineitem=async(req:Request,res:Response)=>{
    const planid=req.params.id;
    const {amount,particular}=req.body;
    const lineitems=await lineItem.create({
        amount:amount,
        particular:particular,
        plan_id:planid
    });
    res.json({message:"line item created"})
  }
export default { addClient, getClient,createplan };