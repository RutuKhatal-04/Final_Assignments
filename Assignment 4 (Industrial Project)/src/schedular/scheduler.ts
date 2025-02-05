import cron from 'node-cron';
import { Request, Response } from 'express';
import paymentPlan from '../models/paymentPlan';

// Function to check payment plans
import moment from 'moment';
import { Op, fn, col, where } from 'sequelize';
import SOW from '../models/Sow';
import CustOrgA from '../models/CustOrgAssociation';
import Customer from '../models/Customer';
import Sow from '../models/Sow';
import Organization from '../models/Organization';
import { sendEmail } from '../service/email';
import{format} from"date-fns";
import sequelize from 'sequelize';

// Function to check payment plans
//Logic applied:- To check for a due paymentplan having date as today or any before today with status and pending or partially pending
export const checkPaymentPlans =async() => {
            
    const today = moment().format('YYYY-MM-DD'); // Format today's date as YYYY-MM-DD
        


  
    try {
      const plansDueToday = await paymentPlan.findAll({
        where:{[Op.and]: [
          sequelize.where(sequelize.fn('DATE', sequelize.col('dueDate')), '<=', today),
          {
            status:{
              [Op.or]:["Pending","Partially Paid"]
            }
          }
        ]}
      });
      
      console.log("Plans data",plansDueToday);

      if (plansDueToday.length > 0) {

        console.log(plansDueToday);
        // Extract SOWId, particular, and amount from each plan.
        const CustomerDetails=plansDueToday.map(async(plan)=>{
        const sowId=plan.dataValues.SOWId;
        const particular=plan.dataValues.particular;
        const amt=plan.dataValues.amount;
        // Retrieve CustOrgAId using SOWId
            const cusorgIdData=await SOW.findByPk(sowId);
            console.log(cusorgIdData?.dataValues.CustOrgAId)
            // Fetch CustomerId and OrganizationId from CustOrgA.
            const custOrgId=await CustOrgA.findByPk(cusorgIdData?.dataValues.CustOrgAId)
            const custId=custOrgId?.dataValues.CustomerId
            const orgId=custOrgId?.dataValues.OrganizationId
<<<<<<< HEAD
            // Get customer and organization details using their IDs.
=======
            // Get customer and organization details using their IDs. 
>>>>>>> b7cb7d21f2a486a794a4d4fb950f86c107b2679c
            const custData=await Customer.findByPk(custId)
            const orgData=await Organization.findByPk(orgId)
            // Extract organization name and customer email.
            const orgname=orgData?.dataValues.displayName
            const custemail=custData?.dataValues.email;
            console.log(`Organization email : ${orgname} , customer email: ${custemail}`)
            console.log('Email function called')
            // Called sendEmail function with the extracted details.
            sendEmail(orgname,custemail,particular,amt)
            
        })
        
      } else {
        console.log('No payment plans due today.');
      }
    } catch (error) {
      console.error('Error checking payment plans:', error);
    }
}



// Above working but new methods 
    
    
// export const checkPaymentPlans = async (req:Request, res:Response) => {
//         const today = moment().format('YYYY-MM-DD'); // Format today's date as YYYY-MM-DD
    
//         try {
//             const plansDueToday = await paymentPlan.findAll({
//                 where: where(fn('DATE', col('dueDate')), today),
//                 attributes:['id'],
//                 include: [{
//                     model: Sow,
//                     attributes:['id','CustOrgAId'],
//                     include: [{
//                         model: CustOrgA,
//                         attributes:['id','CustomerId']
//                         // include: [Customer] // Include Customer within CustOrgA
//                     }]
//                 }]
//             });
//             // const customerIds = plansDueToday.map(plan => plan.SOW?.CustOrgA?.CustomerId).filter(id => id !== undefined);
//             const customerIds=plansDueToday.map(plan=>plan.SOWId);
//             console.log(plansDueToday);
//             res.json(customerIds);
//         } catch (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//     };

export default checkPaymentPlans
