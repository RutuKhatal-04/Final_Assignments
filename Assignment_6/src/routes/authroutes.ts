import {Router} from 'express';
import {addBook, booklist, deletebook, getBook, getBooklist, getUserData} from '../controller/Book_Functionalitites';
import { login, register, userLogin, userRegister } from '../controller/register_login';
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

export default router;

