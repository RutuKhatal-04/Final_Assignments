import {Request,response,Response} from "express";
import axios from "axios";
import sequelize from "../database/config";
import Book from "../models/books";
import User from "../models/User";
import Author from "../models/Author";



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




export const updatebook= async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const updateData = req.body;

  try {
      const book = await Book.findByPk(bookId);
      if (!book) {
          res.status(404).json({ message: 'Book not found' });
          return ;
      }

      // Use Object.assign to update only the fields present in updateData
      Object.assign(book, updateData);

      await book.save();
      res.status(200).json(book);
      return;
  } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
      return;
  }
};



export const extractAndInsertAuthors = async (req: Request, res: Response) => {
  try {
      // Fetch all books
      const books = await Book.findAll();

      // Extract authors' names
      const authorsSet = new Set<string>();
      books.forEach(book => {
          console.log(`Processing book: ${book.title}`);
          const authors = (book.authors as unknown as string).split(','); // Assuming authors are stored as a comma-separated string
          authors.forEach(async (author: string) => {
              const trimmedAuthor = author.trim();
              console.log(`Extracted author: ${trimmedAuthor}`);
              authorsSet.add(trimmedAuthor);
              const data=await Author.create({
                  name:trimmedAuthor
              })
          });
      });

      // Convert the Set to an array before sending it in the response
      const authorsArray = Array.from(authorsSet);

      // // Insert authors' names into the new Author table
      // for (const authorName of authorsArray) {
      //     await Author.findOrCreate({ where: { name: authorName } });
      // }

      console.log('Authors have been successfully extracted and inserted.');
      res.json({ authors: authorsArray });
  } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An error occurred while extracting and inserting authors' });
  }
};



export const getauthor=async(req:Request,res:Response)=>{
  try{
    const data=await Author.findAll();
    if(!data){
      res.json({message:"No data found"});
      return;
    }
    res.json({message:"Author data",data});
    return;
  }catch(error){
    res.json({error});
    return;
  }
}



export const getauthordata=async(req:Request,res:Response)=>{
  const {id}=req.params;
  try{
    const data=await Author.findByPk(id);
    if(!data){
      res.json({message:"No data found"});
      return;
    }
    res.json({message:"Author data",data});
    return;
  }catch(error){
    res.json({error});
    return;
  }
}



export const addauthor=async(req:Request,res:Response)=>{
  const{name,bio,birthdate,isSystemUser}=req.body;
  try{
    const data=await Author.create({
      name,
      bio,birthdate,isSystemUser
    });

    res.json({message:"Record added successfully"});
    return;
  }catch(error){
    res.json({error});
    return;}
}

export const updateauthor=async(req:Request,res:Response)=>{
  const {id}=req.params;
  const updatedata=req.body;
  try{
    const data=await Author.findByPk(id);
    if(!data){
      res.json({message:"Data not found"});
      return;
    }

     Object.assign(data,updatedata);
     await data.save();
     res.json({message:"Data updated successfully"});
     return;

  }catch(error){
    res.json({error});
    return;}
}
export const deleteauthor=async(req:Request,res:Response)=>{
  const {id}=req.params;
  try{
  const data=await Author.findByPk(id);

  if(!data){
    res.json({message:"Author not found"});
    return;
  }
  await data.destroy();
  res.json({message:"Author got deleted successfully"});
}
catch(error){
  res.json({error});
}
}

