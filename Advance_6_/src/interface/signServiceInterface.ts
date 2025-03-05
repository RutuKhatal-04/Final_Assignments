import { ResponseDtos } from "../dtos/responseDtos";
import { userDtos } from "../dtos/userDtos";

export interface ISignService{
    userRegister(user:userDtos):Promise<ResponseDtos>;
    userLogin(email:string,password:string):Promise<ResponseDtos>;
}