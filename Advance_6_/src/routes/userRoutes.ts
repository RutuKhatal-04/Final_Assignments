import { Router } from "express";
import { inject, injectable } from "inversify";
import { UserController } from "../controller/UserController";
const router = Router();

@injectable()
class UserRoutes {
  private router: Router;

  constructor(@inject(UserController) private userController: UserController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/getuserdata", (req, res) =>
      this.userController.getUserData(req, res)
    );
    this.router.post("/addreview/:id", (req, res) =>
      this.userController.addReview(req, res)
    );
    this.router.get("/getreview/:id", (req, res) =>
      this.userController.getReview(req, res)
    );
    this.router.delete("/deletereview/:id", (req, res) =>
      this.userController.deleteReview(req, res)
    );
    this.router.post("/addrating", (req, res) =>
      this.userController.addRating(req, res)
    );
    this.router.get("/getrating", (req, res) =>
      this.userController.getRating(req, res)
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}

export default UserRoutes;
