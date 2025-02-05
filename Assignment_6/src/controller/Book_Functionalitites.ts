import {Request,response,Response} from "express";
import axios from "axios";
import sequelize from "../database/config";
import Book from "../models/books";
import User from "../models/User";



//http://localhost:8000/book?page=20&size=10
export const getBooklist=async(req:Request,res:Response)=>{

    const {page,size}=req.query;
    const limit=parseInt(size as string);
    const offset=(parseInt(page as string)-1)*limit;
const response=await axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyA1ASOi0ETyuR9obKPHfQMosKSMYv6HUAc',{
    headers:{
        'yourAPIKey':'AIzaSyA1ASOi0ETyuR9obKPHfQMosKSMYv6HUAc'
    },
    params: {
        
        startIndex: offset,
        maxResults: limit,
      },

      
       
});

  const data1:any = response.data;
  const totalItems = data1.totalItems;
  const books = data1.items;
  
  // const result=books.map((book:any)=>{
  //   const bookCode=book.id;
  //   const title=book.volumeInfo.title;
  //   const author=book.volumeInfo.authors;
  //   const description=book.volumeInfo.description;
  //   const publishedYear=book.volumeInfo.publishedDate;
  //   const price=600;

  const result = await Promise.all(books.map(async (book: any) => {
    const bookCode = book.id;
    const title = book.volumeInfo?.title || 'No title available';
    const authors = book.volumeInfo?.authors || ['Unknown author'];
    const description = book.volumeInfo?.description || 'No description available';
    const publishedDate = book.volumeInfo?.publishedDate || 'Unknown year';
    const price = 600; 

    await Book.create({
      bookCode,
      title,
      authors: authors.join(', '), // Assuming authors is an array
      description,
      publishedDate: publishedDate,
      price,
    });

    return {
      bookCode,
      title,
      authors,
      description,
      publishedDate,
      price,
    };
  }));

  console.log("Length of displayed records:", books.length);
  res.json({message:"Data Got Inserted",
    totalItems,
    books: result,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: parseInt(page as string),
  });

}





export const getBook=async(req:Request,res:Response)=>{
  const {id}=req.params;
  console.log("id is",id);
  const bookdata=await Book.findByPk(id);

  res.json(bookdata);

}


export const addBook=async(req:Request,res:Response)=>{
  const {bookCode, title, authors,description,publishedDate,price}=req.body;
try{

  const result=await Book.create({
    bookCode, title, authors,description,publishedDate,price
  });

  res.json({message:"Record Added",result});}
  catch(error){
    res.json({message:"Internal server error",error});
  }

}

export const booklist=async(req:Request,res:Response)=>{
  const data=await Book.findAll({
    order: [['id', 'ASC']]    //If not specified it gives output but not in serialized order as in db
});
  if (!data) {
    res.status(404).json({ message: "User not found" });
    return;
    

 }
  const dataLength = data.length;
  console.log('length',dataLength);
  res.json({data,length:dataLength});
}

export const getUserData=async(req:Request,res:Response)=>{
  const id=(req as any).user.id;
  const data=await User.findByPk(id);
 

  res.json({message:"User data",data});
}


export const deletebook=async(req:Request,res:Response)=>{
  const {id}=req.params;
  try{
  const data=await Book.findByPk(id);

  if(!data){
    res.json({message:"Book not found"});
    return;
  }
  await data.destroy();
  res.json({message:"Book got deleted successfully"});
}
catch(error){
  res.json({error});
}
}