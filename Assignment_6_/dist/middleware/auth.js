"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatejwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'abc@#1234';
const authenticatejwt = (role) => (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        const user = jsonwebtoken_1.default.verify(token, secret);
        if (!user) {
            res.json({ message: "No such user found" });
            return;
        }
        if (!role.includes(user.role)) {
            res.json({ message: "No user with this role found" });
            return;
        }
        req.user = { id: user.id, role: user.role };
        console.log(user.id);
        console.log(user.role);
        console.log(req.user);
        next();
    }
    else {
        res.json({ message: "Invalid token" });
    }
};
exports.authenticatejwt = authenticatejwt;
