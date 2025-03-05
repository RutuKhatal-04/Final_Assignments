import { Request, Response } from "express";
import { BookDtos } from "../dtos/bookDtos";
import { ResponseDtos } from "../dtos/responseDtos";
import { filterDtos } from "../dtos/filterDtos";


export interface IBookService{
    findBookByUuid(uuid:string):Promise<ResponseDtos>
    addBook(book:BookDtos):Promise<ResponseDtos>
    updateBook(requestBody:BookDtos,uId:string):Promise<ResponseDtos>
    deletebook(uid:string):Promise<ResponseDtos>
    booklist(page:number,size:number,requestBody:string[]):Promise<ResponseDtos>
    extractAndInsertAuthors(req:Request,res:Response):Promise<any>
    getBooklist(req:Request,res:Response):Promise<ResponseDtos>;
    filterdata(filterDto:filterDtos):Promise<ResponseDtos>
}