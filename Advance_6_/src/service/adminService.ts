import { inject, injectable } from "inversify";
import { IAdminService } from "../interface/adminServiceInterface";
import { IpgService } from "../database/pgInterface";
import { Request, Response } from "express";
import { ResponseDtos } from "../dtos/responseDtos";
import { authorDtos } from "../dtos/authorDtos";
import Author from "../models/authorModel";

@injectable()
export class AdminService implements IAdminService {
  private pgService: IpgService;
  constructor(@inject("IpgService") pgService: IpgService) {
    this.pgService = pgService;
  }

  async getauthor(): Promise<ResponseDtos> {
    try {
      const data = await this.pgService.getauthor();

      return {
        success: true,
        message: "Author Data",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch author data",
        data: error,
      };
    }
  }

  async getauthordata(id: number): Promise<ResponseDtos> {
    try {
      const data = await this.pgService.getauthordata(id);

      return {
        success: true,
        message: "Author Data",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch author data",
        data: error,
      };
    }
  }

  async addauthor(authorDto: authorDtos): Promise<ResponseDtos> {
    try {
      let authordata = new Author();
      authordata.name = authorDto.name;
      authordata.bio = authorDto.bio;
      authordata.birthdate = authorDto.birthdate;
      authordata.isSystemUser = authorDto.isSystemUser;

      const newAuthor = await this.pgService.addauthor(authordata);
      return {
        success: true,
        message: "Author added successfully",
        data: newAuthor,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to add author data",
        data: error,
      };
    }
  }

  async deleteauthor(id: number): Promise<ResponseDtos> {
    try {
      const data = await this.pgService.getauthordata(id);
      if(!data){
        return {
          success: false,
          message: "No author data",
          data: "",
        }
      }
      const msg = await this.pgService.deleteauthor(data);
      return {
        success: true,
        message: "Author deleted sucessfully",
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Failed to delete author data",
        data: error,
      };
    }
  }
}
