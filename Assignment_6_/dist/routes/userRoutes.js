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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("inversify");
const UserController_1 = require("../controller/UserController");
const router = (0, express_1.Router)();
let UserRoutes = class UserRoutes {
    constructor(userController) {
        this.userController = userController;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/getuserdata", (req, res) => this.userController.getUserData(req, res));
        this.router.post("/addreview/:id", (req, res) => this.userController.addReview(req, res));
        this.router.get("/getreview/:id", (req, res) => this.userController.getReview(req, res));
        this.router.delete("/deletereview/:id", (req, res) => this.userController.deleteReview(req, res));
        this.router.post("/addrating", (req, res) => this.userController.addRating(req, res));
        this.router.get("/getrating", (req, res) => this.userController.getRating(req, res));
    }
    getRouter() {
        return this.router;
    }
};
UserRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(UserController_1.UserController)),
    __metadata("design:paramtypes", [UserController_1.UserController])
], UserRoutes);
exports.default = UserRoutes;
//# sourceMappingURL=userRoutes.js.map