"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Book_Functionalitites_1 = require("../controller/Book_Functionalitites");
const register_login_1 = require("../controller/register_login");
const router = (0, express_1.Router)();
router.post('/register', register_login_1.register);
router.post('/login', register_login_1.login);
router.post('/userregister', register_login_1.userRegister);
router.post('/userlogin', register_login_1.userLogin);
router.get('/book', Book_Functionalitites_1.getBooklist); //for adding book into database
router.get('/book/:id', Book_Functionalitites_1.getBook); //http://localhost:8000/book/21
router.get('/getuserdata', Book_Functionalitites_1.getUserData);
router.get('/booklist', Book_Functionalitites_1.booklist);
router.post('/addbook', Book_Functionalitites_1.addBook);
router.delete('/deletebook/:id', Book_Functionalitites_1.deletebook);
exports.default = router;
