import { Router } from "express";
import { inject, injectable } from "inversify";
import { AdminController } from "../controller/adminController";

@injectable()
class AdminRoutes { 
  private router: Router;
  constructor(
    @inject(AdminController) private adminController: AdminController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get("/getauthor", (req, res) =>
      this.adminController.getauthor(req, res)
    );
    this.router.get("/getauthordata/:id",(req,res)=>this.adminController.getauthordata(req,res));
    this.router.post("/addauthor",(req,res)=>this.adminController.addauthor(req,res));
    this.router.delete("/deleteauthor/:id",(req,res)=>this.adminController.deleteauthor(req,res));
  }
  public getRouter(): Router {
    return this.router;
  }
}
export default AdminRoutes;
