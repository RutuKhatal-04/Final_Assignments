import { inject, injectable } from "inversify";
import { IBookService } from "../interface/bookServiceInterface";
import { Request, Response } from "express";
import { IpgService } from "../database/pgInterface";
import { v4 as uuidv4 } from "uuid";
import Book from "../models/booksModel";
import { BookDtos } from "../dtos/bookDtos";
import { ResponseDtos } from "../dtos/responseDtos";
import axios, { request } from "axios";
import { FilterDTOImpl, filterDtos } from "../dtos/filterDtos";


@injectable()
export class BookService implements IBookService {
  private pgService: IpgService;

  constructor(@inject("IpgService") pgService: IpgService) {
    this.pgService = pgService;
  }

  async getBooklist(req: Request, res: Response): Promise<ResponseDtos> {
    try {
      const page = 1;
      const size = 10;
      const limit = size;
      const offset = (page - 1) * limit;

      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: "flowers inauthor:keyes",
            key: "AIzaSyB-M01PzjyLN4dq4f6dqDInxB0GV1Qo8ew",
            startIndex: offset,
            maxResults: limit,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data1: any = response.data;
      const totalItems = data1.totalItems;
      const books = data1.items;

      const result = await Promise.all(
        books.map(async (book: any) => {
          const bookCode = book.id;
          const title = book.volumeInfo?.title || "No title available";
          const authors = book.volumeInfo?.authors || ["Unknown author"];
          const description =
            book.volumeInfo?.description || "No description available";
          const publishedDate =
            book.volumeInfo?.publishedDate || "Unknown year";
          const price = 600;
          const uId = uuidv4();

          const data = {
            bookCode,
            title,
            authors,
            description,
            publishedDate,
            price,
            uId,
          };
          return await this.addBook(data);
        })
      );
      return {
        success: true,
        message: "Book added successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error adding book:", error);
      return {
        success: false,
        message: "Failed to add book",
        data: error,
      };
    }
  }

  async addBook(bookDto: BookDtos): Promise<ResponseDtos> {
    try {
      const authorsString = Array.isArray(bookDto.authors)
        ? bookDto.authors.join(", ")
        : bookDto.authors;
        const uId = uuidv4();

      let books = new Book();
      books.uId = uId;
      books.bookCode = bookDto.bookCode;
      books.title = bookDto.title;
      books.authors = authorsString as unknown as Text; // Convert string to Text type
      books.description = bookDto.description as unknown as Text; // Convert string to Text type
      books.publishedDate = bookDto.publishedDate;
      books.price = bookDto.price;

      if (
        !books.bookCode ||
        !books.title ||
        !books.description ||
        !books.price ||
        !books.authors ||
        !books.uId
      ) {
        throw new Error("Missing required book fields");
      }

      const newBook = await this.pgService.createBook(books);

      return {
        success: true,
        message: "Book added successfully",
        data: newBook.dataValues,
      };
    } catch (error) {
      console.error("Error adding book:", error);
      return {
        success: false,
        message: "Failed to add book",
        data: error,
      };
    }
  }

  async updateBook(updatedData: BookDtos, uuid: string): Promise<ResponseDtos> {
    try {
      const book = await this.pgService.findBookByUuid(uuid);
      
      if (!book) {
        return {
          success: true,
          message: "Book not found",
          data: "",
        };
      }

      const newVersion = book.version + 1;
      book.archive = true;
      
      
      await this.pgService.updateBook(uuid,book);

        const bookdata = new Book();
        (bookdata.id = uuidv4()),
        (bookdata.bookCode = updatedData.bookCode || book.bookCode),
        (bookdata.title = updatedData.title || book.title),
        (bookdata.description = updatedData.description || book.description),
        (bookdata.publishedDate =updatedData.publishedDate || book.publishedDate),
        (bookdata.price = updatedData.price || book.price),
        (bookdata.version = newVersion),
        (bookdata.authors = updatedData.authors || book.authors),
        (bookdata.uId = book.uId);

      const newBook = await this.pgService.createBook(bookdata);

      return {
        success: true,
        message: "Book added successfully",
        data: newBook.dataValues,
      };
    } catch (error) {
      console.error("Error adding book:", error);
      return {
        success: false,
        message: "Failed to add book",
        data: error,
      };
    }
  } 

  async deletebook(uid: string): Promise<ResponseDtos> {
    try {

      let data=await this.pgService.findBookByUuid(uid)
      if(!data)
      {
        return {
          success:false,
          message:"no data found",
          data:null
        }
      }
      
      data.active = false;
      data.archive = true;

      const deleteddata = await this.pgService.updateBook(uid,data);
      if(!deleteddata){
        return{
          success:false,
          message:"not deleted",
          data:null
        }
      }
      return {
        success: true,
        message: "Book deleted successfully",
        data: deleteddata.dataValues,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete book",
        data: error,
      };
    }
  } 

  async findBookByUuid(uuid: string): Promise<ResponseDtos> {
    try {
      const book = await this.pgService.findBookByUuid(uuid);
      if (!book) {
        throw new Error("Book not found");
      }
      return {
        success: true,
        message: "Book data retrieved",
        data: book.dataValues,
      };
    } catch (error) {
      console.error("Error adding book:", error);
      return {
        success: false,
        message: "Failed to retrieve book",
        data: error,
      };
    }
  }

  async booklist(page:number,size:number,requestdata:string[]):Promise<ResponseDtos>{
    const limit = size;
    const offset = (page - 1) * limit;

    try {
    // let whereClause: any = {};
    // for (const field in requestdata) {
    //     if (requestdata[field as keyof BookDtos] !== undefined) {
    //         whereClause[field] = requestdata[field as keyof BookDtos];
    //     }
    // }
      if (requestdata.length===0){
        let requestdata=["id","bookCode","title","description","publishedDate","price","authors","version","active","archive","uId"]
        const data = await this.pgService.booklist(limit, offset,requestdata);
      }
      const data = await this.pgService.booklist(limit, offset,requestdata);
      if (!data) {
        return {
          success: false,
          message: "Book not found",
          data: "",
        };
      }
      else if(data.length===0){
        return{
          success:false,
          message:"No more data",
          data:null
        }
      }

      const totalBooks = await Book.count();
      const totalPages = Math.ceil(totalBooks / limit);

      return {
        success: true,
        message: `Books data, total books : ${totalBooks} totla pages: ${totalPages} `,
        data: data,
      };
    } catch (error) {
      console.error("Error adding book:", error);
      return {
        success: false,
        message: "Failed to retrieve book",
        data: error,
      };
    }
  }


  async filterdata(requestData:filterDtos): Promise<ResponseDtos> {
    

    try {
      
      let whereClause:any = {};
      let filterDto = new FilterDTOImpl(requestData);
      const limit = filterDto.size;
    const offset = (filterDto.page - 1) * limit;
      
      if (Object.keys(requestData.filter).length > 0) {
        Object.keys(requestData.filter).forEach((key) => {
            let value = requestData.filter[key];

            if (typeof value === "string") {
                if (value.startsWith("!=")) {
                    whereClause[key] = { $ne: value.substring(2).trim() };
                } else if (value.startsWith(">=")) {
                    whereClause[key] = { $gte: value.substring(2).trim() };
                } else if (value.startsWith("<=")) {
                    whereClause[key] = { $lte: value.substring(2).trim() };
                } else if (value.startsWith(">")) {
                    whereClause[key] = { $gt: value.substring(1).trim() };
                } else if (value.startsWith("<")) {
                    whereClause[key] = { $lt: value.substring(1).trim() };
                } else if (value.includes("%")) {
                    whereClause[key] = { $like: value };
                } else {
                    whereClause[key] = value;
                }
            } else {
                whereClause[key] = value;
            }
        });
    }
    filterDto.filter=whereClause;
      //   console.log("Generated WHERE Clause:", whereClause);

        
        const data = await this.pgService.filterdata(limit, offset, filterDto);

        if (!data || data.length === 0) {
            return {
                success: false,
                message: "Book not found",
                data: null,
            };
        }

        
        const totalBooks = await Book.count({ where: whereClause });
        const totalPages = Math.ceil(totalBooks / limit);

        return {
            success: true,
            message: `Books data, total books: ${totalBooks}, total pages: ${totalPages}`,
            data: data,
        };
    } catch (error) {
        console.error("Error filtering data:", error);
        return {
            success: false,
            message: "Failed to retrieve books",
            data: error,
        };
    }
}

  async extractAndInsertAuthors(req: Request, res: Response) {
    try {
      const data = await this.pgService.extractAndInsertAuthors();
      res.json({ message: "Data added successfully", data });
      return;
    } catch (error) {
      res.json({ error });
      return;
    }
  }
}
