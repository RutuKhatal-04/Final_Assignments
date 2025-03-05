import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "../interface/userServiceInterface";

@injectable()
export class UserController {
  private readonly userService: IUserService;
  constructor(@inject("IUserService") userService: IUserService) {
    this.userService = userService;
  }
  async getUserData(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.userService.getUserData((req as any).user.id));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async addReview(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(
          await this.userService.addReview(
            (req as any).user.id,
            parseInt(req.params.id),
            req.body
          )
        );
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async getReview(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.userService.getReview(parseInt(req.params.id)));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async deleteReview(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.userService.deleteReview(parseInt(req.params.id)));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }

  async addRating(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(
          await this.userService.addRating(
            (req as any).user.id,
            parseInt(req.params.id),
            req.body
          )
        );
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
  async getRating(req: Request, res: Response): Promise<any> {
    try {
      return res
        .status(200)
        .json(await this.userService.getRating(parseInt(req.params.id)));
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}
