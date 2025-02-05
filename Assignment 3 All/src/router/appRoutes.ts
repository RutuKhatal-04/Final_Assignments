import {Router} from 'express';
import {Request,Response} from 'express';
import{getemailData, getWeatherData} from "../controllers/appController"
import { getWeatherDashboard } from '../controllers/appController';
const router=Router();

router.post("/weather", getWeatherData);
router.get('/api/weatherDashboard', getWeatherDashboard);
router.post('/api/saveWeatherMapping',getemailData)
export default router;