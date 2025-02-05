import {Request,Response} from "express";
import Customer from "../models/Customer";
import CustOrgA from "../models/CustOrgAssociation";
import paymentPlan from "../models/paymentPlan";
import SOW from "../models/Sow";
import Organization from "../models/Organization";
import moment from "moment";
import Invoice from "../models/Invoice";
import { sendInvoiceMail } from "../service/email";




// For cutomer to get its own profile details
export const Custdetails =async(req:Request,res:Response)=>{
    try{
    console.log((req as any).user.id);
    const cust_id=(req as any).user.id;
    //Find customer using id
    const cust=await Customer.findByPk(cust_id,{
        attributes: ['id', 'legalName', 'email', 'ndaSignedOn']
    });
    if(!cust){
        res.json({message:"Customer not found"})
    }
    else{
    const response= `<html>
    <head>
        <title>Customer Details</title>
    </head>
    <body>
        <h1>Customer Details</h1>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Signed On</th>
            </tr>
            <tr>
                <td>${cust.id}</td>
                <td>${cust.legalName}</td>
                <td>${cust.email}</td>
                <td>${cust.ndaSignedOn}</td>
            </tr>
        </table>
    </body>
</html>
`;  
res.send(response);
}

    }
catch(err){
    console.error("Cannot fetch customer details")
}}



// For customer to get all details related to which orgnization it belongs with its sow url for getting sow in that registered organization
export const custOrgdetails=async(req:Request,res:Response)=>{
    const cust_id=(req as any).user.id;

    //get custorg data using customer id
    const orgid=await CustOrgA.findAll({where:{
       
        CustomerId:cust_id
    }, attributes:["id","OrganizationId"]})
    
    //organization id extracted from above data
    const CustOrgids=orgid.map(id=>id.dataValues.OrganizationId); // comes in array
    
    //fetch the display names of the organizations , bcz in array we map it 
    const orgname=await Promise.all(CustOrgids.map(async(id)=>{
        return await Organization.findOne({
            attributes:["displayname"],
            where:{
                id:id
            }
        })
    }))
    console.log(CustOrgids);
    console.log("orgname",orgname);
    //organization name extracted
    const name=orgname.map(name=>name?.dataValues.displayname)
    console.log(name);
    // custorg id extracted 
    const custorgid=orgid.map(id=>id.dataValues.id);
    console.log("custorgid",custorgid);
    //response whihc shows org name , sow url of that customer in that specific organization ,index will iterated at same index in both array of custorgid and orgdata at same time this will help for matching 
    const result=orgname.map((org,index)=>{
        return{
            OrgName:org,
            Sow_url:`http://localhost:8000/customer/sowdetails/${CustOrgids[index]}`,
            
        }
    })

    res.json(result);
}

//to get details for sow in that organization using custorgid  passed in url as params

export const Sowdetails=async(req:Request,res:Response)=>{
    const cust_id=(req as any).user.id;
    const custorgid=req.params.id;
    console.log(custorgid);
    try {
        const sow = await SOW.findAll({
            attributes: ["id","title", "installment", "validityPeriod", "totalValue", "signedOn"],
            
                where: {
                    CustOrgAId: custorgid,
                }
           
        });
        
        if (sow.length === 0) {
            res.json({ message: "No SOW found for this customer" });
        } else {
            const rows = sow.map(s => `
                <tr>
                    <td>${s.title}</td>
                    <td>${s.installment}</td>
                    <td>${s.validityPeriod}</td>
                    <td>${s.totalValue}</td>
                    <td>${s.signedOn}</td>
                    <td>http://localhost:/8000/customer/payplandetails/${s.id}</td>
                </tr>
            `).join('');

            const response = `
                <html>
                <head>
                    <title>SOW Details</title>
                </head>
                <body>
                    <h1>SOW Details</h1>
                    <table border="1">
                        <tr>
                            <th>Title</th>
                            <th>Installment</th>
                            <th>Validity Period</th>
                            <th>Total Value</th>
                            <th>Signed On</th>
                            <th>Url to paymentplan </th>
                        </tr>
                        ${rows}
                    </table>
                </body>
                </html>
            `;
            res.send(response);
        }
    } catch (err) {
        console.error("Cannot fetch SOW details", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



//to get paymentplan details of that sow , sowid passed in url as params, so find using sowid in paymentplan table
export const PaymentPlan = async (req: Request, res: Response) => {
    const cust_id = (req as any).user.id;
    const sow_id = req.params.id;
    const payplan = await paymentPlan.findAll({
        where: {
            SOWId: sow_id
        }
    });

    if (payplan.length === 0) {
        res.json({ message: "No SOW found for this customer" });
        return;
    }

    const rows = payplan.map(plan => `
        <tr>
            <td>${plan.particular}</td>
            <td>${plan.amount}</td>
            <td>${plan.status}</td>
            <td>${plan.balance}</td>
            <td>${cust_id}</td>
            <td>http://localhost:8000/customer/pay/${plan.id}</td>
        </tr>
    `).join('');

    const response = `
        <html>
        <head>
            <title>Payment Plan Details</title>
        </head>
        <body>
            <h1>Payment Plan Details</h1>
            <table border="1">
                <tr>
                    <th>Particulars</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Balance</th>
                    <th>Customer ID</th>
                    <th>Payment Link</th>
                </tr>
                ${rows}
            </table>
        </body>
        </html>
    `;

    res.send(response);
};

//To update the paid value for each payment plan , in body amt to be paid is passed which gets deducted from the actual amount and new column is there of balance whose default value is actual amount and as payment is done that value gets deducted and if balance is 0 then status updated as "paid" else "partially paid" by default is "pending"


export const payment=async(req:Request,res:Response)=>{
    const {amt}=req.body;
    const pid=parseInt(req.params.id);
    console.log(pid);
    console.log(amt);
    const cust_id=(req as any).user.id;
    const data=await paymentPlan.findByPk(pid);
    //logic implemented for amt deduction and status updation
    if(data){
        const actual_amt=data.balance;
        const pending=actual_amt-amt;
        data.balance=pending;
        if(pending===0){
            data.status="Paid"
        }else{
            data.status="Partially Paid"
        }
        await data.save();
    }
    const today = moment().format('YYYY-MM-DD');

    //Invoice is created for each paid amt for specific paymentplan and data gets inserted in invoice table along with the mail is send to customer as well as organization of invoice data 
    const invoice = await Invoice.create({
      value:amt,
      customer_id:cust_id,
      pay_received:today,
      plan_id:pid,
      organization_id:data?.Organization_Id
    })

    //data extracted for passing parameters to sendemail function
    const orgdata=await Organization.findByPk(data?.Organization_Id);
    console.log(orgdata)
    
    const orgname=orgdata?.dataValues.displayName;
    console.log(orgname)
    const orgemail=orgdata?.dataValues.email;
    const custdata=await Customer.findByPk(cust_id);
    const custname=custdata?.dataValues.legalName;
    const custemail=custdata?.dataValues.email;
    const particulars=data?.dataValues.particular;

    //Invoice send mail function called
    sendInvoiceMail(custemail,orgemail,amt,particulars,custname,orgname)
    res.json(invoice);
    
}