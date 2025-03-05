import { BookDtos } from "../dtos/bookDtos";
import { filterDtos } from "../dtos/filterDtos";
import Author from "../models/authorModel";
import Book from "../models/booksModel";
import Rating from "../models/ratingModel";
import Review from "../models/reviewModel";
import User from "../models/userModel";

export interface IpgService {
  findBookByUuid(uuid: string): Promise<Book|null>;
  createBook(bookData: Book): Promise<Book>;
  updateBook(uuid: String, updatedData: Book): Promise<Book|null>;
  booklist(limit: number, offset: number,requestBody:string[]): Promise<Book[]>;
  extractAndInsertAuthors(): Promise<any>;
  filterdata(limit: number, offset: number,filterDto:filterDtos):Promise<Book[]>;

  getauthor(): Promise<Author[]>;
  getauthordata(id: number): Promise<Author|null>;
  addauthor(author: Author): Promise<Author>;
  deleteauthor(author: Author): Promise<any>;

  getUserData(id: number): Promise<User|null>;
  addReview(userid: number, id: number, review: Review): Promise<Review>;
  getReview(id: number): Promise<Review[]>;
  deleteReview(id: number): Promise<Review|null>;

  addRating(userid: number, id: number, rating: Rating): Promise<Rating>;
  getRating(id: number): Promise<Rating[]>;
  userRegister(user: User): Promise<User>;
  userLogin(email: string): Promise<User|null>;
}
