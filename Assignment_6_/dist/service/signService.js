"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.SignService = void 0;
const inversify_1 = require("inversify");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'abc@#1234';
let SignService = class SignService {
    constructor(pgservice) {
        this.pgservice = pgservice;
    }
    userRegister(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = new userModel_1.default();
                user.name = userDto.name;
                user.email = userDto.email;
                const hashedPassword = yield bcrypt_1.default.hash(userDto.password, 5);
                user.password = hashedPassword;
                const data = yield this.pgservice.userRegister(user);
                return {
                    success: true,
                    message: "User Added successfully",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to add user data",
                    data: error,
                };
            }
        });
    }
    userLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgservice.userLogin(email);
                if (!data) {
                    return {
                        success: false,
                        message: "Invalid Credentails",
                        data: "",
                    };
                }
                const ispassword = yield bcrypt_1.default.compare(password, data === null || data === void 0 ? void 0 : data.dataValues.password);
                if (!ispassword) {
                    return {
                        success: false,
                        message: "Password is wrong",
                        data: null,
                    };
                }
                const payload = {
                    id: data === null || data === void 0 ? void 0 : data.dataValues.id,
                    email: data === null || data === void 0 ? void 0 : data.dataValues.email,
                    role: "User",
                };
                const token = jsonwebtoken_1.default.sign(payload, secret);
                return {
                    success: true,
                    message: "Your jwt Token",
                    data: token,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Error",
                    data: error,
                };
            }
        });
    }
};
exports.SignService = SignService;
exports.SignService = SignService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IpgService")),
    __metadata("design:paramtypes", [Object])
], SignService);
//# sourceMappingURL=signService.js.map