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
exports.BookService = void 0;
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
const booksModel_1 = __importDefault(require("../models/booksModel"));
const axios_1 = __importDefault(require("axios"));
const filterDtos_1 = require("../dtos/filterDtos");
let BookService = class BookService {
    constructor(pgService) {
        this.pgService = pgService;
    }
    getBooklist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = 1;
                const size = 10;
                const limit = size;
                const offset = (page - 1) * limit;
                const response = yield axios_1.default.get("https://www.googleapis.com/books/v1/volumes", {
                    params: {
                        q: "flowers inauthor:keyes",
                        key: "AIzaSyB-M01PzjyLN4dq4f6dqDInxB0GV1Qo8ew",
                        startIndex: offset,
                        maxResults: limit,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data1 = response.data;
                const totalItems = data1.totalItems;
                const books = data1.items;
                const result = yield Promise.all(books.map((book) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d;
                    const bookCode = book.id;
                    const title = ((_a = book.volumeInfo) === null || _a === void 0 ? void 0 : _a.title) || "No title available";
                    const authors = ((_b = book.volumeInfo) === null || _b === void 0 ? void 0 : _b.authors) || ["Unknown author"];
                    const description = ((_c = book.volumeInfo) === null || _c === void 0 ? void 0 : _c.description) || "No description available";
                    const publishedDate = ((_d = book.volumeInfo) === null || _d === void 0 ? void 0 : _d.publishedDate) || "Unknown year";
                    const price = 600;
                    const uId = (0, uuid_1.v4)();
                    const data = {
                        bookCode,
                        title,
                        authors,
                        description,
                        publishedDate,
                        price,
                        uId,
                    };
                    return yield this.addBook(data);
                })));
                return {
                    success: true,
                    message: "Book added successfully",
                    data: result,
                };
            }
            catch (error) {
                console.error("Error adding book:", error);
                return {
                    success: false,
                    message: "Failed to add book",
                    data: error,
                };
            }
        });
    }
    addBook(bookDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorsString = Array.isArray(bookDto.authors)
                    ? bookDto.authors.join(", ")
                    : bookDto.authors;
                const uId = (0, uuid_1.v4)();
                let books = new booksModel_1.default();
                books.uId = uId;
                books.bookCode = bookDto.bookCode;
                books.title = bookDto.title;
                books.authors = authorsString; // Convert string to Text type
                books.description = bookDto.description; // Convert string to Text type
                books.publishedDate = bookDto.publishedDate;
                books.price = bookDto.price;
                if (!books.bookCode ||
                    !books.title ||
                    !books.description ||
                    !books.price ||
                    !books.authors ||
                    !books.uId) {
                    throw new Error("Missing required book fields");
                }
                const newBook = yield this.pgService.createBook(books);
                return {
                    success: true,
                    message: "Book added successfully",
                    data: newBook.dataValues,
                };
            }
            catch (error) {
                console.error("Error adding book:", error);
                return {
                    success: false,
                    message: "Failed to add book",
                    data: error,
                };
            }
        });
    }
    updateBook(updatedData, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.pgService.findBookByUuid(uuid);
                if (!book) {
                    return {
                        success: true,
                        message: "Book not found",
                        data: "",
                    };
                }
                const newVersion = book.version + 1;
                book.archive = true;
                yield this.pgService.updateBook(uuid, book);
                const bookdata = new booksModel_1.default();
                (bookdata.id = (0, uuid_1.v4)()),
                    (bookdata.bookCode = updatedData.bookCode || book.bookCode),
                    (bookdata.title = updatedData.title || book.title),
                    (bookdata.description = updatedData.description || book.description),
                    (bookdata.publishedDate = updatedData.publishedDate || book.publishedDate),
                    (bookdata.price = updatedData.price || book.price),
                    (bookdata.version = newVersion),
                    (bookdata.authors = updatedData.authors || book.authors),
                    (bookdata.uId = book.uId);
                const newBook = yield this.pgService.createBook(bookdata);
                return {
                    success: true,
                    message: "Book added successfully",
                    data: newBook.dataValues,
                };
            }
            catch (error) {
                console.error("Error adding book:", error);
                return {
                    success: false,
                    message: "Failed to add book",
                    data: error,
                };
            }
        });
    }
    deletebook(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.pgService.findBookByUuid(uid);
                if (!data) {
                    return {
                        success: false,
                        message: "no data found",
                        data: null
                    };
                }
                data.active = false;
                data.archive = true;
                const deleteddata = yield this.pgService.updateBook(uid, data);
                if (!deleteddata) {
                    return {
                        success: false,
                        message: "not deleted",
                        data: null
                    };
                }
                return {
                    success: true,
                    message: "Book deleted successfully",
                    data: deleteddata.dataValues,
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to delete book",
                    data: error,
                };
            }
        });
    }
    findBookByUuid(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.pgService.findBookByUuid(uuid);
                if (!book) {
                    throw new Error("Book not found");
                }
                return {
                    success: true,
                    message: "Book data retrieved",
                    data: book.dataValues,
                };
            }
            catch (error) {
                console.error("Error adding book:", error);
                return {
                    success: false,
                    message: "Failed to retrieve book",
                    data: error,
                };
            }
        });
    }
    booklist(page, size, requestdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = size;
            const offset = (page - 1) * limit;
            try {
                // let whereClause: any = {};
                // for (const field in requestdata) {
                //     if (requestdata[field as keyof BookDtos] !== undefined) {
                //         whereClause[field] = requestdata[field as keyof BookDtos];
                //     }
                // }
                if (requestdata.length === 0) {
                    let requestdata = ["id", "bookCode", "title", "description", "publishedDate", "price", "authors", "version", "active", "archive", "uId"];
                    const data = yield this.pgService.booklist(limit, offset, requestdata);
                }
                const data = yield this.pgService.booklist(limit, offset, requestdata);
                if (!data) {
                    return {
                        success: false,
                        message: "Book not found",
                        data: "",
                    };
                }
                else if (data.length === 0) {
                    return {
                        success: false,
                        message: "No more data",
                        data: null
                    };
                }
                const totalBooks = yield booksModel_1.default.count();
                const totalPages = Math.ceil(totalBooks / limit);
                return {
                    success: true,
                    message: `Books data, total books : ${totalBooks} totla pages: ${totalPages} `,
                    data: data,
                };
            }
            catch (error) {
                console.error("Error adding book:", error);
                return {
                    success: false,
                    message: "Failed to retrieve book",
                    data: error,
                };
            }
        });
    }
    filterdata(requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let whereClause = {};
                let filterDto = new filterDtos_1.FilterDTOImpl(requestData);
                const limit = filterDto.size;
                const offset = (filterDto.page - 1) * limit;
                if (Object.keys(requestData.filter).length > 0) {
                    Object.keys(requestData.filter).forEach((key) => {
                        let value = requestData.filter[key];
                        if (typeof value === "string") {
                            if (value.startsWith("!=")) {
                                whereClause[key] = { $ne: value.substring(2).trim() };
                            }
                            else if (value.startsWith(">=")) {
                                whereClause[key] = { $gte: value.substring(2).trim() };
                            }
                            else if (value.startsWith("<=")) {
                                whereClause[key] = { $lte: value.substring(2).trim() };
                            }
                            else if (value.startsWith(">")) {
                                whereClause[key] = { $gt: value.substring(1).trim() };
                            }
                            else if (value.startsWith("<")) {
                                whereClause[key] = { $lt: value.substring(1).trim() };
                            }
                            else if (value.includes("%")) {
                                whereClause[key] = { $like: value };
                            }
                            else {
                                whereClause[key] = value;
                            }
                        }
                        else {
                            whereClause[key] = value;
                        }
                    });
                }
                filterDto.filter = whereClause;
                //   console.log("Generated WHERE Clause:", whereClause);
                const data = yield this.pgService.filterdata(limit, offset, filterDto);
                if (!data || data.length === 0) {
                    return {
                        success: false,
                        message: "Book not found",
                        data: null,
                    };
                }
                const totalBooks = yield booksModel_1.default.count({ where: whereClause });
                const totalPages = Math.ceil(totalBooks / limit);
                return {
                    success: true,
                    message: `Books data, total books: ${totalBooks}, total pages: ${totalPages}`,
                    data: data,
                };
            }
            catch (error) {
                console.error("Error filtering data:", error);
                return {
                    success: false,
                    message: "Failed to retrieve books",
                    data: error,
                };
            }
        });
    }
    extractAndInsertAuthors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.pgService.extractAndInsertAuthors();
                res.json({ message: "Data added successfully", data });
                return;
            }
            catch (error) {
                res.json({ error });
                return;
            }
        });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)("IpgService")),
    __metadata("design:paramtypes", [Object])
], BookService);
//# sourceMappingURL=bookService.js.map