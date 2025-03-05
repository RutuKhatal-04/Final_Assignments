import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAdminService } from "../interface/adminServiceInterface";

@injectable()
export class AdminController {
  private readonly adminService: IAdminService;

  constructor(@inject("IAdminService") adminService: IAdminService) {
    this.adminService = adminService;
  }

  async getauthor(req: Request, res: Response): Promise<any> {
    try {
      return res.status(200).json(await this.adminService.getauthor());
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async getauthordata(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.adminService.getauthordata(parseInt(req.params.id))); 
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async addauthor(req: Request, res: Response): Promise<any> {
    try {
      return res.status(200).json(await this.adminService.addauthor(req.body));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async deleteauthor(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.adminService.deleteauthor(parseInt(req.params.id)));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
