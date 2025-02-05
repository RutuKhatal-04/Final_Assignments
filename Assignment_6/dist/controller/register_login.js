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
exports.userLogin = exports.userRegister = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Admin_1 = __importDefault(require("../models/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const secret = 'abc@#1234';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        const admin = yield Admin_1.default.create({
            name,
            email,
            password: hashedPassword
        });
        res.json({ message: "Admin registered" });
    }
    catch (error) {
        console.error('Error during registration', error);
        res.json({ error: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Admin_1.default.findOne({
            where: { email }
        });
        if (!user) {
            res.json({ message: "Invalid credentails" });
            return;
        }
        const ispassword = yield bcrypt_1.default.compare(password, user.password);
        if (!ispassword) {
            res.json({ message: "Invalid password" });
            return;
        }
        const payload = {
            id: user.id, email: user.email, role: "Admin"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret);
        res.json({ token });
    }
    catch (error) {
        console.error('error during login', error);
        res.json({ error: "Internal server error" });
    }
});
exports.login = login;
//User Registration
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const user = yield User_1.default.create({
            name, email, password: hashedPassword
        });
        res.json({ message: "User Added" });
    }
    catch (error) {
        console.error("Error during registratio", error);
        res.json({ message: "Internal server error" });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userdata = yield User_1.default.findOne({ where: { email: email } });
        if (!userdata) {
            res.json({ message: "Invalid credentials" });
        }
        const ispassword = yield bcrypt_1.default.compare(password, userdata === null || userdata === void 0 ? void 0 : userdata.dataValues.password);
        if (!ispassword) {
            res.json({ message: "Password is wrong" });
            return;
        }
        const payload = {
            id: userdata === null || userdata === void 0 ? void 0 : userdata.dataValues.id, email: userdata === null || userdata === void 0 ? void 0 : userdata.dataValues.email, role: "User"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret);
        res.json({ token });
    }
    catch (error) {
        res.json({ error: "Internal server error" });
    }
});
exports.userLogin = userLogin;
