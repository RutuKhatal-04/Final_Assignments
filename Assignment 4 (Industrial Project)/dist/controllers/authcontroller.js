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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Custlogin = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Organization_1 = __importDefault(require("../models/Organization"));
const Customer_1 = __importDefault(require("../models/Customer"));
const secret = 'Rkhkjfjsdkbf@#$$24?#@';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { email, password } = _a, otherDetails = __rest(_a, ["email", "password"]);
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const organization = yield Organization_1.default.create(Object.assign({ email, password: hashedPassword }, otherDetails));
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
        const organization = yield Organization_1.default.findOne({ where: { email } });
        if (!organization) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, organization.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const payload = {
            id: organization.id, email: organization.email, role: "Organization"
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
//Customer login based on role
const Custlogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(`here ${email},${password}`);
    console.log("------------------------------------------------------------------------------------------------------------------------");
    try {
        const customer = yield Customer_1.default.findOne({ where: { email } });
        console.log(customer);
        if (!customer) {
            res.status(401).json({ error: 'User not found' });
            return;
        }
        const isPasswordValid = password === customer.password;
        console.log(password);
        console.log("password", customer.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials after customer is found' });
            return;
        }
        //role is passed using middleware
        const payload = {
            id: customer.id, email: customer.email, role: "Customer"
        };
        const token = jsonwebtoken_1.default.sign(payload, secret);
        res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.Custlogin = Custlogin;
