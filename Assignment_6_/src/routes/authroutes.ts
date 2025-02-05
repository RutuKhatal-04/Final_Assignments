import {Router} from 'express';
import {addauthor, addBook, booklist, deleteauthor, deletebook, extractAndInsertAuthors, getauthor, getauthordata, getBook, getBooklist, getUserData, updateauthor, updatebook} from '../controller/Book_Functionalitites';
import { login, register, userLogin, userRegister } from '../controller/register_login';
import { addRating, addReview, createPayment, deletereview, getorder, getRating, getreview, payment } from '../controller/User_Functionalities';
const router=Router();

router.post('/register',register);  //admin register
router.post('/login',login); //admin login
router.post('/userregister',userRegister);  //user register
router.post('/userlogin',userLogin);  //user login
router.get('/book',getBooklist); //for adding book into database
router.get('/book/:id',getBook);   //http://localhost:8000/book/21
router.get('/getuserdata',getUserData);
router.get('/booklist',booklist);  //http://localhost:8000/user/booklist?page=5&size=10
router.post('/addbook',addBook);
router.delete('/deletebook/:id',deletebook);
router.post('/addreview/:id',addReview);
router.get('/getreview/:id',getreview);
router.delete('/deletereview/:id',deletereview);
router.post('/addrating/:id',addRating);
router.get('/getrating/:id',getRating);
router.post('/payment',payment);  //to check wether gocardless is correctly integrated
router.post('/createpayment/:bookId',createPayment);
router.get('/getorder',getorder);
router.put('/updatebook/:id', updatebook);
router.post('/getauthor',extractAndInsertAuthors); //for getting unique author list from book table and insert into author table
router.get('/getauthor',getauthor);
router.get('/getauthor/:id',getauthordata);
router.post('addauthor',addauthor);
router.put('/updateauthor/:id',updateauthor);
router.delete('/deleteauthor/:id',deleteauthor);


export default router;

