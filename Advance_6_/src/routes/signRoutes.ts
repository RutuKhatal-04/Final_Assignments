import { Router } from "express";
import { inject, injectable } from "inversify";
import { AdminController } from "../controller/adminController";
import { SignController } from "../controller/SignController";

@injectable()
class SignRoutes {
  private router: Router;
  constructor(
    @inject(SignController) private signController: SignController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post("/register", (req, res) =>
      this.signController.userRegister(req, res)
    );
    this.router.post("/login",(req,res)=>this.signController.userLogin(req,res));
  }
  public getRouter(): Router {
    return this.router;
  }
}
export default SignRoutes;