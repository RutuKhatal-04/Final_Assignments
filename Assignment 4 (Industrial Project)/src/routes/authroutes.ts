import { Router } from 'express';
import { register, login, Custlogin,} from '../controllers/authcontroller';
import {addClient,getClient,makesow, createplan, lineitem} from '../controllers/Client';
import {checkPaymentPlans} from '../schedular/scheduler';
import { Custdetails, custOrgdetails, payment, PaymentPlan, Sowdetails } from '../controllers/Customer_get';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/custlogin',Custlogin);

router.post("/addClient",addClient);
router.get("/getClient",getClient)
router.post('/addClient/sow/:id',makesow);
router.post('/sow/makepay/:id',createplan);
router.get('/date',checkPaymentPlans);
router.get('/custdetails',authenticateJWT("Customer"),Custdetails);
router.get("/orgcust",authenticateJWT("Customer"),custOrgdetails);
router.get('/sowdetails/:id',authenticateJWT("Customer"),Sowdetails);
router.get('/payplandetails/:id',authenticateJWT("Customer"),PaymentPlan);
router.post('/pay/:id',authenticateJWT("Customer"),payment);
router.post('/addClient/sow/makelineit/:id',lineitem);
export default router;