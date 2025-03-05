import {Request,Response} from "express";
import {inject,injectable} from "inversify";
import { ISignService } from "../interface/signServiceInterface";



@injectable()

export class SignController{
    private readonly signService:ISignService;
    constructor(@inject("ISignService") signService:ISignService ){
        this.signService=signService;
    }
    async userRegister(req:Request,res:Response):Promise<any>{
        try {
            return res
              .status(200)
              .json(await this.signService.userRegister(req.body));
          } catch (err) {
            return res.status(500).json({ err });
          }
    }

    async userLogin(req:Request,res:Response):Promise<any>{
        try {
            return res
              .status(200)
              .json(await this.signService.userLogin(req.body.email,req.body.password));
          } catch (err) {
            return res.status(500).json({ err });
          }
    }
}





