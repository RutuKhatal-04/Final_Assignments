import {Router} from 'express';
import {addauthor, addBook, booklist, deleteauthor, deletebook, extractAndInsertAuthors, getauthor, getauthordata, getBook, getBooklist, getUserData, updateauthor, updatebook} from '../controller/Book_Functionalitites';
import { login, register, userLogin, userRegister } from '../controller/register_login';
import { addRating, addReview, createPayment, deletereview, getorder, getRating, getreview, payment } from '../controller/User_Functionalities';
const router=Router();

router.post('/register',register);
router.post('/login',login);
router.post('/userregister',userRegister);
router.post('/userlogin',userLogin);
router.get('/book',getBooklist); //for adding book into database
router.get('/book/:id',getBook);   //http://localhost:8000/book/21
router.get('/getuserdata',getUserData);
router.get('/booklist',booklist);
router.post('/addbook',addBook);
router.delete('/deletebook/:id',deletebook);
router.post('/addreview/:id',addReview);
router.get('/getreview/:id',getreview);
router.delete('/deletereview/:id',deletereview);
router.post('/addrating/:id',addRating);
router.get('/getrating/:id',getRating);
router.post('/payment',payment);
router.post('/createpayment',createPayment);
router.get('/getorder/:id',getorder);
router.put('/updatebook/:id', updatebook);
router.post('/getauthor',extractAndInsertAuthors);
router.get('/getauthor',getauthor);
router.get('/getauthor/:id',getauthordata);
router.post('addauthor',addauthor);
router.put('/updateauthor',updateauthor);
router.delete('/deleteauthor',deleteauthor);


export default router;

