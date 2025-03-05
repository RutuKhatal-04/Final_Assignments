"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAndInsertAuthors = exports.BookController = void 0;
const books_1 = __importDefault(require("../models/books"));
const Author_1 = __importDefault(require("../models/Author"));
const inversify_1 = require("inversify");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    addBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookService.addBook(req, res);
        });
    }
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookService.updateBook(req, res);
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookService.deletebook(req, res);
        });
    }
    getBookdata(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookService.getBookdata(req, res);
        });
    }
    booklist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookService.booklist(req, res);
        });
    }
    extractAndInsertAuthors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.bookService.extractAndInsertAuthors(req, res);
        });
    }
};
exports.BookController = BookController;
exports.BookController = BookController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IBookService')),
    __metadata("design:paramtypes", [Object])
], BookController);
// export const extractAndInsertAuthors = async (req: Request, res: Response) => {
//   try {
//       // Fetch all books
//       const books = await Book.findAll();
//       // Extract authors' names
//       const authorsSet = new Set<string>();
//       books.forEach(book => {
//           console.log(`Processing book: ${book.title}`);
//           const authors = (book.authors as unknown as string).split(','); // Assuming authors are stored as a comma-separated string
//           authors.forEach(async (author: string) => {
//               const trimmedAuthor = author.trim();
//               console.log(`Extracted author: ${trimmedAuthor}`);
//               authorsSet.add(trimmedAuthor);
//               const data=await Author.create({
//                   name:trimmedAuthor
//               })
//           });
//       });
//       // Convert the Set to an array before sending it in the response
//       const authorsArray = Array.from(authorsSet);
//       console.log('Authors have been successfully extracted ');
//       res.json({ authors: authorsArray });
//   } catch (error) {
//       console.error('An error occurred:', error);
//       res.status(500).json({ error: 'An error occurred while extracting and inserting authors' });
//   }
// };
//http://localhost:8000/book?page=20&size=10 
//For getting the data of book from 3rd party api as google developer api and using axios (Pagination also implemented in it)
// export const getBooklist=async(req:Request,res:Response)=>{
//     const {page,size}=req.query;
//     const limit=parseInt(size as string);
//     const offset=(parseInt(page as string)-1)*limit;
// const response=await axios.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyA1ASOi0ETyuR9obKPHfQMosKSMYv6HUAc',{
//     headers:{
//         'yourAPIKey':'AIzaSyA1ASOi0ETyuR9obKPHfQMosKSMYv6HUAc'
//     },
//     params: {
//         startIndex: offset,
//         maxResults: limit,
//       },
// });
//   const data1:any = response.data;
//   const totalItems = data1.totalItems;
//   const books = data1.items;
//   const result = await Promise.all(books.map(async (book: any) => {
//     const bookCode = book.id;
//     const title = book.volumeInfo?.title || 'No title available';
//     const authors = book.volumeInfo?.authors || ['Unknown author'];
//     const description = book.volumeInfo?.description || 'No description available';
//     const publishedDate = book.volumeInfo?.publishedDate || 'Unknown year';
//     const price = 600; 
//     await Book.create({
//       bookCode,
//       title,
//       authors: authors.join(', '), // Assuming authors is an array
//       description,
//       publishedDate: publishedDate,
//       price,
//     });
//     return {
//       bookCode,
//       title,
//       authors,
//       description,
//       publishedDate,
//       price,
//     };
//   }));
//   console.log("Length of displayed records:", books.length);
//   res.json({message:"Data Got Inserted",
//     totalItems,
//     books: result,
//     totalPages: Math.ceil(totalItems / limit),
//     currentPage: parseInt(page as string),
//   });
// }
// //getting book 
// // export const getBook=async(req:Request,res:Response)=>{
// //   const {id}=req.params;
// //   console.log("id is",id);
// //   const bookdata=await Book.findByPk(id);
// //   res.json(bookdata);
// // }
// //Only admin can add the books 
// //http://localhost:8000/admin/addbook
// // export const addBook=async(req:Request,res:Response)=>{
// //   const {bookCode, title, authors,description,publishedDate,price}=req.body;
// // try{
// //   const result=await Book.create({
// //     bookCode, title, authors,description,publishedDate,price
// //   });
// //   res.json({message:"Record Added",result});}
// //   catch(error){
// //     res.json({message:"Internal server error",error});
// //   }
// // }
//retrieve the list of book but using pagination
// export const booklist = async (req: Request, res: Response) => {
//   const { page = '1', size = '10' } = req.query; // Default to page 1 and size 10 if not provided
//   const limit = parseInt(size as string);
//   const offset = (parseInt(page as string) - 1) * limit;
//   try {
//     const data = await Book.findAll({
//       order: [['id', 'ASC']], // Order by ID in ascending order
//       limit: limit,
//       offset: offset,
//     });
//     if (!data) {
//       res.status(404).json({ message: "Books not found" });
//       return;
//     }
//     const totalBooks = await Book.count(); // Get the total number of books
//     const totalPages = Math.ceil(totalBooks / limit); // Calculate the total number of pages
//     res.json({
//       data,
//       totalBooks,
//       totalPages,
//       currentPage: parseInt(page as string),
//       pageSize: limit,
//     });
//   } catch (error) {
//     console.error('Error retrieving books:', error);
//     res.status(500).json({ error: 'Failed to retrieve books' });
//   }
// };
// //Retrival of user data
//admin can only delete the book
// export const deletebook=async(req:Request,res:Response)=>{
//   const {id}=req.params;
//   try{
//   const data=await Book.findByPk(id);
//   if(!data){
//     res.json({message:"Book not found"});
//     return;
//   }
//   await data.destroy();
//   res.json({message:"Book got deleted successfully"});
// }
// catch(error){
//   res.json({error});
// }
// }
//Only Admin can update the book
// export const updatebook= async (req: Request, res: Response) => {
//   const bookId = req.params.id;
//   const updateData = req.body;
//   try {
//       const book = await Book.findByPk(bookId);
//       if (!book) {
//           res.status(404).json({ message: 'Book not found' });
//           return ;
//       }
//       // Use Object.assign to update only the fields present in updateData
//       Object.assign(book, updateData);
//       await book.save();
//       res.status(200).json(book);
//       return;
//   } catch (error) {
//       res.status(500).json({ message: 'An error occurred', error });
//       return;
//   }
// };
//For extracting the author list from the book table 
const extractAndInsertAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all books
        const books = yield books_1.default.findAll();
        // Extract authors' names
        const authorsSet = new Set();
        books.forEach(book => {
            console.log(`Processing book: ${book.title}`);
            const authors = book.authors.split(','); // Assuming authors are stored as a comma-separated string
            authors.forEach((author) => __awaiter(void 0, void 0, void 0, function* () {
                const trimmedAuthor = author.trim();
                console.log(`Extracted author: ${trimmedAuthor}`);
                authorsSet.add(trimmedAuthor);
                const data = yield Author_1.default.create({
                    name: trimmedAuthor
                });
            }));
        });
        // Convert the Set to an array before sending it in the response
        const authorsArray = Array.from(authorsSet);
        console.log('Authors have been successfully extracted ');
        res.json({ authors: authorsArray });
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred while extracting and inserting authors' });
    }
});
exports.extractAndInsertAuthors = extractAndInsertAuthors;
//Get list of author 
// export const getauthor=async(req:Request,res:Response)=>{
//   try{
//     const data=await Author.findAll();
//     if(!data){
//       res.json({message:"No data found"});
//       return;
//     }
//     res.json({message:"Author data",data});
//     return;
//   }catch(error){
//     res.json({error});
//     return;
//   }
// }
//For getting the  particular author data 
// export const getauthordata=async(req:Request,res:Response)=>{
//   const {id}=req.params;
//   try{
//     const data=await Author.findByPk(id);
//     if(!data){
//       res.json({message:"No data found"});
//       return;
//     }
//     res.json({message:"Author data",data});
//     return;
//   }catch(error){
//     res.json({error});
//     return;
//   }
// }
//Admin can only add author
// export const addauthor=async(req:Request,res:Response)=>{
//   const{name,bio,birthdate,isSystemUser}=req.body;
//   try{
//     const data=await Author.create({
//       name,
//       bio,birthdate,isSystemUser
//     });
//     res.json({message:"Record added successfully"});
//     return;
//   }catch(error){
//     res.json({error});
//     return;}
// }
//admin can only update the author data
// export const updateauthor=async(req:Request,res:Response)=>{
//   const {id}=req.params;
//   const updatedata=req.body;
//   try{
//     const data=await Author.findByPk(id);
//     if(!data){
//       res.json({message:"Data not found"});
//       return;
//     }
//      Object.assign(data,updatedata);
//      await data.save();
//      res.json({message:"Data updated successfully"});
//      return;
//   }catch(error){
//     res.json({error});
//     return;}
// }
//Admin can only delete the specific author by passing id in params
//# sourceMappingURL=Book_Functionalitites.js.map