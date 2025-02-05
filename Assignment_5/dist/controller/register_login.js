"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmp = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const Employee_1 = __importDefault(require("../models/Employee"));
const email_1 = require("../service/email");
const secret = 'abc@#1234';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const organization = yield Admin_1.default.create({ email, password: hashedPassword });
        res.status(201).json(organization);
    }
    catch (error) {
        console.error('Error during registration:', error); // Log the error
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.register = register;
// organization login based on roles
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield Admin_1.default.findOne({ where: { email } });
        if (!admin) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const payload = {
            id: admin.id, email: admin.email, role: "Admin"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret);
        res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.login = login;
const addEmp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, assginedTime } = req.body;
    const existingEmp = yield Employee_1.default.findOne({
        where: {
            email: email
        }
    });
    if (existingEmp) {
        res.json({ message: "Employee already exist" });
        return;
    }
    else {
        const employee = yield Employee_1.default.create({
            name,
            email,
            password,
            assginedTime
        });
        (0, email_1.sendpassEmail)(email, password);
        res.json({ message: "Employee added", employee });
    }
});
exports.addEmp = addEmp;
