import { Router } from "express";
import { BookController } from "../controller/bookController";
import { inject, injectable } from "inversify";
import { userLogin, userRegister } from "../controller/register_login";
const router = Router();

@injectable()
class BookRoutes {
  private router: Router;

  constructor(@inject(BookController) private bookController: BookController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/addbook", (req, res) =>
      this.bookController.addBook(req, res)
    );
    this.router.put("/updatebook/:uuid", (req, res) =>
      this.bookController.updateBook(req, res)
    );
    this.router.delete("/deletebook/:uid", (req, res) =>
      this.bookController.deleteBook(req, res)
    );
    
    this.router.post("/getauthorextract", (req, res) =>
      this.bookController.extractAndInsertAuthors(req, res)
    );
    this.router.get("/getbooklist", (req, res) =>
      this.bookController.getBooklist(req, res)
    );
    this.router.get("/booklist",(req,res)=>this.bookController.booklist(req,res));
    this.router.get("/findbook/:uid",(req,res)=>this.bookController.findBookByUuid(req,res));
    this.router.get("/filterdata",(req,res)=>this.bookController.filterdata(req,res));
  }
  public getRouter(): Router {
    return this.router;
  }
}

// router.post('/register',register);  //admin register
// router.post('/login',login); //admin login
router.post('/userregister',userRegister);  //user register
router.post('/userlogin',userLogin);  //user login
// router.get('/book',getBooklist); //for adding book into database
// router.get('/book/:id',getBook);   //http://localhost:8000/book/21
// router.get('/getuserdata',getUserData);
// router.get('/booklist',booklist);  //http://localhost:8000/user/booklist?page=5&size=10
// router.post('/addbook',addBook);
// router.delete('/deletebook/:id',deletebook);
// router.post('/addreview/:id',addReview);
// router.get('/getreview/:id',getreview);
// router.delete('/deletereview/:id',deletereview);
// router.post('/addrating/:id',addRating);
// router.get('/getrating/:id',getRating);
// router.post('/payment',payment);  //to check wether gocardless is correctly integrated
// router.post('/createpayment/:bookId',createPayment);
// router.get('/getorder',getorder);
// router.put('/updatebook/:id', updatebook);
//for getting unique author list from book table and insert into author table
// router.get('/getauthor',getauthor);
// router.get('/getauthor/:id',getauthordata);
// router.post('addauthor',addauthor);
// router.put('/updateauthor/:id',updateauthor);
// router.delete('/deleteauthor/:id',deleteauthor);

// export default router;
export default BookRoutes;
