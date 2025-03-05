"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controller/bookController");
const inversify_1 = require("inversify");
const register_login_1 = require("../controller/register_login");
const router = (0, express_1.Router)();
let BookRoutes = class BookRoutes {
    constructor(bookController) {
        this.bookController = bookController;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/addbook", (req, res) => this.bookController.addBook(req, res));
        this.router.put("/updatebook/:uuid", (req, res) => this.bookController.updateBook(req, res));
        this.router.delete("/deletebook/:uid", (req, res) => this.bookController.deleteBook(req, res));
        this.router.post("/getauthorextract", (req, res) => this.bookController.extractAndInsertAuthors(req, res));
        this.router.get("/getbooklist", (req, res) => this.bookController.getBooklist(req, res));
        this.router.get("/booklist", (req, res) => this.bookController.booklist(req, res));
        this.router.get("/findbook/:uid", (req, res) => this.bookController.findBookByUuid(req, res));
        this.router.get("/filterdata", (req, res) => this.bookController.filterdata(req, res));
    }
    getRouter() {
        return this.router;
    }
};
BookRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(bookController_1.BookController)),
    __metadata("design:paramtypes", [bookController_1.BookController])
], BookRoutes);
// router.post('/register',register);  //admin register
// router.post('/login',login); //admin login
router.post('/userregister', register_login_1.userRegister); //user register
router.post('/userlogin', register_login_1.userLogin); //user login
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
exports.default = BookRoutes;
//# sourceMappingURL=bookRoutes.js.map