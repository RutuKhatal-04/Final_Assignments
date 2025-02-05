import Customer from "../models/Customer";
import CustOrgA from "../models/CustOrgAssociation";



//Logic applied:- If the customer is already there checked using email
export const checkUser=async(req:Request,res:Response)=>{
    const email=req.body;
    const orgid = (req as any).user.id; // Extract orgid from the token

    
    const yes=await Customer.findOne({
        where:{
            email:email
        }
    })
    if (yes) {
        const customerId = yes.id;
        const getorg=CustOrgA.findOne({
            where:{
                CustomerId:customerId,
            }
        })
        return {getorg,customerId}
    }
    
}