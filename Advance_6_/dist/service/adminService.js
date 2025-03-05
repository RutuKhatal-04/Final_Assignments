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
exports.AdminService = void 0;
const inversify_1 = require("inversify");
const authorModel_1 = __importDefault(require("../models/authorModel"));
let AdminService = class AdminService {
    constructor(pgService) {
        this.pgService = pgService;
    }
    getauthor() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgService.getauthor();
                return {
                    success: true,
                    message: "Author Data",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to fetch author data",
                    data: error,
                };
            }
        });
    }
    getauthordata(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgService.getauthordata(id);
                return {
                    success: true,
                    message: "Author Data",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to fetch author data",
                    data: error,
                };
            }
        });
    }
    addauthor(authorDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let authordata = new authorModel_1.default();
                authordata.name = authorDto.name;
                authordata.bio = authorDto.bio;
                authordata.birthdate = authorDto.birthdate;
                authordata.isSystemUser = authorDto.isSystemUser;
                const newAuthor = yield this.pgService.addauthor(authordata);
                return {
                    success: true,
                    message: "Author added successfully",
                    data: newAuthor,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to add author data",
                    data: error,
                };
            }
        });
    }
    deleteauthor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgService.getauthordata(id);
                if (!data) {
                    return {
                        success: false,
                        message: "No author data",
                        data: "",
                    };
                }
                const msg = yield this.pgService.deleteauthor(data);
                return {
                    success: true,
                    message: "Author deleted sucessfully",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to delete author data",
                    data: error,
                };
            }
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IpgService")),
    __metadata("design:paramtypes", [Object])
], AdminService);
//# sourceMappingURL=adminService.js.map