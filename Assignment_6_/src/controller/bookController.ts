import { Request, response, Response } from "express";
import { inject, injectable } from "inversify";
import { IBookService } from "../interface/bookServiceInterface";

@injectable()
export class BookController {
  private bookService: IBookService;

  constructor(@inject("IBookService") bookService: IBookService) {
    this.bookService = bookService;
  }

  async addBook(req: Request, res: Response): Promise<any> {
    try {
      return res.status(200).json(await this.bookService.addBook(req.body));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
  async getBooklist(req: Request, res: Response): Promise<any> {
    try {
      return res.status(200).json(await this.bookService.getBooklist(req, res));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async updateBook(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.bookService.updateBook(req.body, req.params.uuid));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
  async deleteBook(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.bookService.deletebook(req.params.uid));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
  async booklist(req: Request, res: Response): Promise<any> {
    try {
      const page = parseInt(req.query.page as string, 10);
      const size = parseInt(req.query.size as string, 10);

      if (isNaN(page) || isNaN(size)) {
        return res
          .status(400)
          .json({ message: "Invalid page or size parameter" });
      }

      return res.status(200).json(await this.bookService.booklist(page, size,req.body));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

 async findBookByUuid(req:Request,res:Response):Promise<any>{
  try{
    return res.status(200).json(await this.bookService.findBookByUuid(req.params.uid));
  }
  catch(error){
    return res.status(500).json({error})
  } 
 }

 async filterdata(req:Request,res:Response):Promise<any>{
  try {
    return res.status(200).json(await this.bookService.filterdata(req.body));
  } catch (err) {
    return res.status(500).json({ err });
  }
 }



  async extractAndInsertAuthors(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.bookService.extractAndInsertAuthors(req, res));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
