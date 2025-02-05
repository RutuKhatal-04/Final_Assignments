"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const auth_1 = require("./middleware/auth");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', authroutes_1.default);
app.use('/admin', (0, auth_1.authenticatejwt)("Admin"), authroutes_1.default);
app.use('/user', (0, auth_1.authenticatejwt)("User"), authroutes_1.default);
app.listen(PORT, () => {
    console.log("Server started at port", PORT);
});
