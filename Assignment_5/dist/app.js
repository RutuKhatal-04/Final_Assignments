"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const auth_1 = require("./middleware/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// import authRoutes from './routes/authroutes';
// import { authenticateJWT, authenticateJWTcust } from './middleware/authMiddleware';
// import "./models/associations";
// import cron from "node-cron";
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/auth', authroutes_1.default);
app.use('/home', (0, auth_1.authenticateJWT)("Admin"), authroutes_1.default);
app.use('/employee', (0, auth_1.authenticateJWT)("Employee"), authroutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
