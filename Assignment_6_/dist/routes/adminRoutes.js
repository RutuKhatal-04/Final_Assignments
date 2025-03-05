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
const adminController_1 = require("../controller/adminController");
let AdminRoutes = class AdminRoutes {
    constructor(adminController) {
        this.adminController = adminController;
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/getauthor", (req, res) => this.adminController.getauthor(req, res));
        this.router.get("/getauthordata/:id", (req, res) => this.adminController.getauthordata(req, res));
        this.router.post("/addauthor", (req, res) => this.adminController.addauthor(req, res));
        this.router.delete("/deleteauthor/:id", (req, res) => this.adminController.deleteauthor(req, res));
    }
    getRouter() {
        return this.router;
    }
};
AdminRoutes = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(adminController_1.AdminController)),
    __metadata("design:paramtypes", [adminController_1.AdminController])
], AdminRoutes);
exports.default = AdminRoutes;
//# sourceMappingURL=adminRoutes.js.map