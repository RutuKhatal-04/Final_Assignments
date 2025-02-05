import { Router } from 'express';
import { addEmp, login, register } from '../controller/register_login';

import { create_timesheet, emplogin, emplogout, report } from '../controller/Employee_functionalities';

const router = Router();

router.post('/admin_register',register);
router.post('/admin_login',login);
router.post('/addEmp',addEmp);
router.post('/empLogin',emplogin);
router.post('/timesheet',create_timesheet);
router.get('/report',report);
router.post('/logout',emplogout);
export default router;