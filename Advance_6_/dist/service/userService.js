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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const ratingModel_1 = __importDefault(require("../models/ratingModel"));
let UserService = class UserService {
    constructor(pgservice) {
        this.pgservice = pgservice;
    }
    getUserData(userid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgservice.getUserData(userid);
                return {
                    success: true,
                    message: "User Data",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to fetch user data",
                    data: error,
                };
            }
        });
    }
    addReview(userid, id, reviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let review = new reviewModel_1.default();
                review.userid = reviewDto.userid;
                review.bookid = reviewDto.bookid;
                review.content = reviewDto.content;
                const data = yield this.pgservice.addReview(userid, id, review);
                return {
                    success: true,
                    message: "Review Added",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to add review data",
                    data: error,
                };
            }
        });
    }
    getReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgservice.getReview(id);
                if (!data) {
                    return {
                        success: false,
                        message: "No review for this book id",
                        data: " ",
                    };
                }
                return {
                    success: true,
                    message: "Review data for given bookid",
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
    deleteReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgservice.deleteReview(id);
                return {
                    success: true,
                    message: "Review deleted",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to delete review data",
                    data: error,
                };
            }
        });
    }
    addRating(userid, id, ratingDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rating = new ratingModel_1.default();
                rating.userid = ratingDto.userid;
                rating.bookid = ratingDto.bookid;
                rating.rating = ratingDto.rating;
                const data = yield this.pgservice.addRating(userid, id, rating);
                return {
                    success: true,
                    message: "Rating added for bookid",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to add rating data",
                    data: error,
                };
            }
        });
    }
    getRating(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgservice.getRating(id);
                if (!data) {
                    return {
                        success: false,
                        message: "No data found",
                        data: "",
                    };
                }
                return {
                    success: true,
                    message: "Rating data for given bookid",
                    data: data,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to fetch rating data",
                    data: error,
                };
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IpgService")),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=userService.js.map