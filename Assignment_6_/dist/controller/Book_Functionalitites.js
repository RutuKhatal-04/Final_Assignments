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
exports.deleteauthor = exports.updateauthor = exports.addauthor = exports.getauthordata = exports.getauthor = exports.extractAndInsertAuthors = exports.updatebook = exports.deletebook = exports.getUserData = exports.booklist = exports.addBook = exports.getBook = exports.getBooklist = void 0;
const axios_1 = __importDefault(require("axios"));
const books_1 = __importDefault(require("../models/books"));
const User_1 = __importDefault(require("../models/User"));
const Author_1 = __importDefault(require("../models/Author"));
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
    const { page = '1', size = '10' } = req.query; // Default to page 1 and size 10 if not provided
    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;
    try {
        const data = yield books_1.default.findAll({
            order: [['id', 'ASC']], // Order by ID in ascending order
            limit: limit,
            offset: offset,
        });
        if (!data) {
            res.status(404).json({ message: "Books not found" });
            return;
        }
        const totalBooks = yield books_1.default.count(); // Get the total number of books
        const totalPages = Math.ceil(totalBooks / limit); // Calculate the total number of pages
        res.json({
            data,
            totalBooks,
            totalPages,
            currentPage: parseInt(page),
            pageSize: limit,
        });
    }
    catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
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
const updatebook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const updateData = req.body;
    try {
        const book = yield books_1.default.findByPk(bookId);
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }
        // Use Object.assign to update only the fields present in updateData
        Object.assign(book, updateData);
        yield book.save();
        res.status(200).json(book);
        return;
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
        return;
    }
});
exports.updatebook = updatebook;
const extractAndInsertAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all books
        const books = yield books_1.default.findAll();
        // Extract authors' names
        const authorsSet = new Set();
        books.forEach(book => {
            console.log(`Processing book: ${book.title}`);
            const authors = book.authors.split(','); // Assuming authors are stored as a comma-separated string
            authors.forEach((author) => __awaiter(void 0, void 0, void 0, function* () {
                const trimmedAuthor = author.trim();
                console.log(`Extracted author: ${trimmedAuthor}`);
                authorsSet.add(trimmedAuthor);
                const data = yield Author_1.default.create({
                    name: trimmedAuthor
                });
            }));
        });
        // Convert the Set to an array before sending it in the response
        const authorsArray = Array.from(authorsSet);
        // // Insert authors' names into the new Author table
        // for (const authorName of authorsArray) {
        //     await Author.findOrCreate({ where: { name: authorName } });
        // }
        console.log('Authors have been successfully extracted and inserted.');
        res.json({ authors: authorsArray });
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred while extracting and inserting authors' });
    }
});
exports.extractAndInsertAuthors = extractAndInsertAuthors;
const getauthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Author_1.default.findAll();
        if (!data) {
            res.json({ message: "No data found" });
            return;
        }
        res.json({ message: "Author data", data });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.getauthor = getauthor;
const getauthordata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield Author_1.default.findByPk(id);
        if (!data) {
            res.json({ message: "No data found" });
            return;
        }
        res.json({ message: "Author data", data });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.getauthordata = getauthordata;
const addauthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, birthdate, isSystemUser } = req.body;
    try {
        const data = yield Author_1.default.create({
            name,
            bio, birthdate, isSystemUser
        });
        res.json({ message: "Record added successfully" });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.addauthor = addauthor;
const updateauthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedata = req.body;
    try {
        const data = yield Author_1.default.findByPk(id);
        if (!data) {
            res.json({ message: "Data not found" });
            return;
        }
        Object.assign(data, updatedata);
        yield data.save();
        res.json({ message: "Data updated successfully" });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.updateauthor = updateauthor;
const deleteauthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield Author_1.default.findByPk(id);
        if (!data) {
            res.json({ message: "Author not found" });
            return;
        }
        yield data.destroy();
        res.json({ message: "Author got deleted successfully" });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteauthor = deleteauthor;
