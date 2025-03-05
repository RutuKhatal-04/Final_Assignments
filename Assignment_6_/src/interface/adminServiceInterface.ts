import { Request,Response } from "express";
import { authorDtos } from "../dtos/authorDtos";
import { ResponseDtos } from "../dtos/responseDtos";

export interface IAdminService{
 
    getauthor():Promise<ResponseDtos>;
    getauthordata(id:number):Promise<ResponseDtos>;
    addauthor(author:authorDtos):Promise<ResponseDtos>;
    deleteauthor(id:number):Promise<ResponseDtos>;
    
}