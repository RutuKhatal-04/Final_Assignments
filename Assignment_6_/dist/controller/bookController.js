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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const inversify_1 = require("inversify");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    addBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.bookService.addBook(req.body));
            }
            catch (err) {
                return res.status(500).json({ err });
            }
        });
    }
    getBooklist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.bookService.getBooklist(req, res));
            }
            catch (err) {
                return res.status(500).json({ err });
            }
        });
    }
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res
                    .status(200)
                    .json(yield this.bookService.updateBook(req.body, req.params.uuid));
            }
            catch (err) {
                return res.status(500).json({ err });
            }
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res
                    .status(200)
                    .json(yield this.bookService.deletebook(req.params.uid));
            }
            catch (err) {
                return res.status(500).json({ err });
            }
        });
    }
    booklist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page, 10);
                const size = parseInt(req.query.size, 10);
                if (isNaN(page) || isNaN(size)) {
                    return res
                        .status(400)
                        .json({ message: "Invalid page or size parameter" });
                }
                return res.status(200).json(yield this.bookService.booklist(page, size, req.body));
            }
            catch (err) {
                return res.status(500).json({ err });
            }
        });
    }
    findBookByUuid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.bookService.findBookByUuid(req.params.uid));
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    }
    filterdata(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.bookService.filterdata(req.body));
            }
            catch (err) {
                return res.status(500).json({ err });
            }
        });
    }
    extractAndInsertAuthors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res
                    .status(200)
                    .json(yield this.bookService.extractAndInsertAuthors(req, res));
            }
            catch (err) {
                return res.status(500).json({ err });
            }
        });
    }
};
exports.BookController = BookController;
exports.BookController = BookController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IBookService")),
    __metadata("design:paramtypes", [Object])
], BookController);
//# sourceMappingURL=bookController.js.map