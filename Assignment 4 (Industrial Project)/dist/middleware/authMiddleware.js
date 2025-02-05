"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWTcust = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'Rkhkjfjsdkbf@#$$24?#@';
const authenticateJWT = (role) => (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // token from Authorization header.
    if (token) {
        const user = jsonwebtoken_1.default.verify(token, secret);
        if (!user) {
            res.sendStatus(403);
            return;
        }
        if (!role.includes(user.role)) {
            res.sendStatus(403);
            return;
        }
        req.user = { id: user.id, role: user.role }; // Use type assertion here
        console.log(user.id);
        console.log(user.role);
        console.log("req", req.user);
        next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
const authenticateJWTcust = (role) => (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        const user = jsonwebtoken_1.default.verify(token, secret);
        if (!user) {
            res.sendStatus(403);
            return;
        }
        if (!role.includes(user.role)) {
            res.sendStatus(403);
            return;
        }
        req.user = { id: user.id, role: user.role };
        next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWTcust = authenticateJWTcust;
