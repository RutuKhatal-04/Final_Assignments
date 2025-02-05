"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
require("./models/associations");
const node_cron_1 = __importDefault(require("node-cron"));
const scheduler_1 = __importDefault(require("./schedular/scheduler"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use('/auth', authroutes_1.default); //for customer login and registration
app.get('/home', (0, authMiddleware_1.authenticateJWT)("Organization"), (req, res) => {
    const user = req.user; //  type assertion 
    res.json({ message: 'This is a home page', user });
});
//for organization functionalities
app.use('/home', (0, authMiddleware_1.authenticateJWT)("Organization"), authroutes_1.default);
//for customer functionalities
app.use('/customer', authroutes_1.default);
//for mail scheduling
node_cron_1.default.schedule('* * * * *', () => {
    (0, scheduler_1.default)();
    console.log("cron running");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
