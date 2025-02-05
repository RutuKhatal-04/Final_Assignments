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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletebook = exports.getUserData = exports.booklist = exports.addBook = exports.getBook = exports.getBooklist = void 0;
const axios_1 = __importDefault(require("axios"));
const books_1 = __importDefault(require("../models/books"));
const User_1 = __importDefault(require("../models/User"));
//http://localhost:8000/book?page=20&size=10
const getBooklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = req.query;
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
    const response = yield axios_1.default.get('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyA1ASOi0ETyuR9obKPHfQMosKSMYv6HUAc', {
        headers: {
            'yourAPIKey': 'AIzaSyA1ASOi0ETyuR9obKPHfQMosKSMYv6HUAc'
        },
        params: {
            startIndex: offset,
            maxResults: limit,
        },
    });
    const data1 = response.data;
    const totalItems = data1.totalItems;
    const books = data1.items;
    // const result=books.map((book:any)=>{
    //   const bookCode=book.id;
    //   const title=book.volumeInfo.title;
    //   const author=book.volumeInfo.authors;
    //   const description=book.volumeInfo.description;
    //   const publishedYear=book.volumeInfo.publishedDate;
    //   const price=600;
    const result = yield Promise.all(books.map((book) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const bookCode = book.id;
        const title = ((_a = book.volumeInfo) === null || _a === void 0 ? void 0 : _a.title) || 'No title available';
        const authors = ((_b = book.volumeInfo) === null || _b === void 0 ? void 0 : _b.authors) || ['Unknown author'];
        const description = ((_c = book.volumeInfo) === null || _c === void 0 ? void 0 : _c.description) || 'No description available';
        const publishedDate = ((_d = book.volumeInfo) === null || _d === void 0 ? void 0 : _d.publishedDate) || 'Unknown year';
        const price = 600;
        yield books_1.default.create({
            bookCode,
            title,
            authors: authors.join(', '), // Assuming authors is an array
            description,
            publishedDate: publishedDate,
            price,
        });
        return {
            bookCode,
            title,
            authors,
            description,
            publishedDate,
            price,
        };
    })));
    console.log("Length of displayed records:", books.length);
    res.json({ message: "Data Got Inserted",
        totalItems,
        books: result,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: parseInt(page),
    });
});
exports.getBooklist = getBooklist;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log("id is", id);
    const bookdata = yield books_1.default.findByPk(id);
    res.json(bookdata);
});
exports.getBook = getBook;
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookCode, title, authors, description, publishedDate, price } = req.body;
    try {
        const result = yield books_1.default.create({
            bookCode, title, authors, description, publishedDate, price
        });
        res.json({ message: "Record Added", result });
    }
    catch (error) {
        res.json({ message: "Internal server error", error });
    }
});
exports.addBook = addBook;
const booklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield books_1.default.findAll({
        order: [['id', 'ASC']] //If not specified it gives output but not in serialized order as in db
    });
    if (!data) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    const dataLength = data.length;
    console.log('length', dataLength);
    res.json({ data, length: dataLength });
});
exports.booklist = booklist;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const data = yield User_1.default.findByPk(id);
    res.json({ message: "User data", data });
});
exports.getUserData = getUserData;
const deletebook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield books_1.default.findByPk(id);
        if (!data) {
            res.json({ message: "Book not found" });
            return;
        }
        yield data.destroy();
        res.json({ message: "Book got deleted successfully" });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deletebook = deletebook;
