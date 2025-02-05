import {Request,response,Response} from "express";
import { GoCardlessClient } from 'gocardless-nodejs/client';
import constants from 'gocardless-nodejs/constants';
import sequelize from "../database/config";
import Review from "../models/Review";
import Rating from "../models/Rating";
import { Environments } from "gocardless-nodejs/constants";
import User from "../models/User";
import Book from "../models/books";
import { PaymentCurrency } from "gocardless-nodejs";
import Payment from "../models/Payment";



//Logged in user can add review to book using bookid passed in params
export const addReview=async(req:Request,res:Response)=>{
    const userid=(req as any).user.id;
    const {id}=req.params;
    const {review}=req.body;
    try{
        const data=await Review.create({
            
            userid,
            bookid:id,
            content:review
        });
        console.log(userid,id,review);
        res.json({message:"Data inserted successfully",data});
        return;
    }
    catch(error){
        res.json({error});
        return;
    }
}

//retrive the review of the book using id
export const getreview=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const data=await Review.findAll({
            where:{
                bookid:id
            }
        });
        if(!data){
            res.json({message:"No review for this book id"});
            return;
        }
        res.json({message:"All reviews for this book",data});
        return;
    }
    catch(error){
        res.json({error});
        return;
    }
};


//Logged in user can delete the review of the book id passed in params
export const deletereview=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const data=await Review.findByPk(id);
        if(!data){
            res.json({message:"No review exist"});
            return;
        }
        await data.destroy();
        res.json({message:"Data deleted successfully"});
        return;
    }catch(error){
        res.json({error});
        return;
    }
}

//Logges in user can add ratings to the book
export const addRating=async(req:Request,res:Response)=>{
    const {id}=req.params; //bookid
    const {rating}=req.body;
    const userid=(req as any).user.id;
    try{
        const data=await Rating.create({
            userid,
            bookid:id,
            rating
        });
        res.json({message:"Rating added successfully",data});
        return;
    }catch(error){
        res.json({error});
        return;
    }
};

//Retrieve the rating of the particular book
export const getRating=async(req:Request,res:Response)=>{
    const{id}=req.params;
    try{
        const data=await Rating.findAll({where:{
            bookid:id
        }});
        if(!data){
            res.json({message:"Data not found"});
            return;
        }
        res.json({message:"Rating data for book",data});
        return;
    }catch(error){
        res.json({error});
        return;
    }
}





////Payment Gocardless
export const payment=async(req:Request,res:Response)=>{
const accessToken= process.env.GoCardlessAccessToken as string;
const client = new GoCardlessClient(accessToken, Environments.Sandbox);
//gocardless code for customer retrieval
try {
    const listResponse = await client.customers.list({
      limit: '10', 
    });
    const customers = listResponse.customers;
    console.log(customers);
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error listing customers:', error);
    res.status(500).json({ error: 'Failed to list customers' });
  }
}

 //Create customer,mandate for that customer and make payment for the bookid passed in params

export const createPayment = async (req: Request, res: Response) => {
    const accessToken = process.env.GoCardlessAccessToken as string;
    const client = new GoCardlessClient(accessToken, Environments.Sandbox);
    const { id } = (req as any).user;
    const { bookId } = req.params;
  
    try {
        //user data retrived for that loggedin user id
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return ;
      }
      //book data retrieved for that bookid which passed in params
      const book = await Book.findByPk(bookId);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return ;
      }
  
      //  Create a customer 
      const customerResponse = await client.customers.create({
        given_name: user.dataValues.name,
        family_name: "Singh", // Ensure this field is available
        email: user.dataValues.email,
        address_line1: '123 Main Street',
        city: 'London',
        postal_code: 'E1 8QS',
        country_code: 'GB',
      });
      //return data
      const customerData = {
        id: customerResponse.id as string,
        given_name: customerResponse.given_name,
        email: customerResponse.email,
      };
  
      //  Create a customer bank account
      const bankAccountResponse = await client.customerBankAccounts.create({
        account_number: '55779911',
        branch_code: '200000',
        account_holder_name: user.dataValues.name,
        country_code: 'GB',
        links: {
          customer: customerResponse.id as string, // Ensure it's a string
        },
      });
  
      //  Create a mandate
      const mandateResponse = await client.mandates.create({
        scheme: 'bacs',
        links: {
          customer_bank_account: bankAccountResponse.id as string, // Ensure it's a string
        },
      });
  
    //  Create a payment for book id passed in params
      const paymentResponse = await client.payments.create({
        amount: book.dataValues.price,
        currency: 'GBP' as PaymentCurrency,
        links: {
          mandate: mandateResponse.id as string, 
        },
        description: `Purchase of book: ${book.dataValues.title}`,
      });
      if(!paymentResponse){
        res.json({message:"Payment not done"});
        return;
      }

      //if payment successfully done then order get created and added in payment table
      const order=await Payment.create({
        bookid:bookId,userid:id,amount:book.dataValues.price,status:'Paid'
      });
      res.json({
        message: "Customer, mandate, and payment created successfully",
        customer: customerData,
        mandate: mandateResponse,
        payment: paymentResponse,
        order:order
      });

    } catch (error) {
      console.error('Error creating customer, mandate, or payment:', error);
      res.status(500).json({ error: 'Failed to create customer, mandate, or payment' });
    }
  };



// Retrieval of all order of logged in customer

  export const getorder=async(req:Request,res:Response)=>{
    const id=(req as any).user.id;
    try{
        const data= await Payment.findAll({
            where:{
                userid:id
            }
        });
        if(!data){
            res.json({message:"Data not found"});
            return;
        }
        res.json({message:"Order data",data});
        return;
    }catch(error){
        res.json({error});
        return;
    }
  }