import {inject,injectable} from "inversify";
import { ISignService } from "../interface/signServiceInterface";
import { ResponseDtos } from "../dtos/responseDtos";
import User from "../models/userModel";
import { IpgService } from "../database/pgInterface";
import { userDtos } from "../dtos/userDtos";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


interface UserPayload{
    id:number,
    email:string,
    role:string
}


const secret='abc@#1234';
@injectable()
export class SignService implements ISignService {
  private pgservice: IpgService;
  constructor(@inject("IpgService") pgservice: IpgService) {
    this.pgservice = pgservice;
  }

  async userRegister(userDto: userDtos): Promise<ResponseDtos> {
    try {
      let user = new User();
      user.name = userDto.name;
      user.email = userDto.email;
      const hashedPassword = await bcrypt.hash(userDto.password, 5);
      user.password = hashedPassword;
      const data = await this.pgservice.userRegister(user);
      return {
        success: true,
        message: "User Added successfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to add user data",
        data: error,
      };
    }
  }

  async userLogin(email: string, password: string): Promise<ResponseDtos> {
    try {
      const data = await this.pgservice.userLogin(email);
      if (!data) {
        return {
          success: false,
          message: "Invalid Credentails",
          data: "",
        };
      }
      const ispassword = await bcrypt.compare(
        password,
        data?.dataValues.password
      );

      if (!ispassword) {
        return {
          success: false,
          message: "Password is wrong",
          data: null,
        };
      }

      const payload: UserPayload = {
        id: data?.dataValues.id,
        email: data?.dataValues.email,
        role: "User",
      };
      const token = jwt.sign(payload, secret);
      return {
        success: true,
        message: "Your jwt Token",
        data: token,
      };
    } catch (error) {
      return {
        success: false,
        message: "Error",
        data: error,
      };
    }
  }
}