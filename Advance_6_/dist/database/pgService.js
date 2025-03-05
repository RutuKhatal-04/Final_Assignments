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
exports.PgService = void 0;
const booksModel_1 = __importDefault(require("../models/booksModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const authorModel_1 = __importDefault(require("../models/authorModel"));
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const ratingModel_1 = __importDefault(require("../models/ratingModel"));
class PgService {
    findBookByUuid(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield booksModel_1.default.findOne({
                where: { uId: uId, active: true, archive: false },
            });
        });
    }
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield booksModel_1.default.create(bookData.get({ plain: true }));
            return book;
        });
    }
    updateBook(uuid, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedCount] = yield booksModel_1.default.update(updatedData, { where: { uId: uuid } });
            if (affectedCount === 0) {
                return null;
            }
            const newBook = yield booksModel_1.default.findOne({ where: { uId: uuid } });
            return newBook;
        });
    }
    booklist(limit, offset, requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield booksModel_1.default.findAll({
                attributes: requestBody,
                limit: limit,
                offset: offset,
                order: [["id", "ASC"]]
            });
            return data;
        });
    }
    filterdata(limit, offset, filterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield booksModel_1.default.findAll({
                    where: filterDto.filter,
                    attributes: filterDto.columns,
                    limit: limit,
                    offset: offset,
                    order: [["id", filterDto.sort]],
                });
                // const books = await Book.findAll({
                //   where: {
                //     title: "Flowers for Algernon",
                //     authors: "Daniel Keyes",
                //   },
                // });
                return data;
            }
            catch (error) {
                console.error("Error fetching book list:", error);
                throw error;
            }
        });
    }
    extractAndInsertAuthors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield booksModel_1.default.findAll();
                const authorsSet = new Set();
                books.forEach((book) => {
                    console.log(`Processing book: ${book.title}`);
                    const authors = book.authors.split(","); // Assuming authors are stored as a comma-separated string
                    authors.forEach((author) => __awaiter(this, void 0, void 0, function* () {
                        const trimmedAuthor = author.trim();
                        console.log(`Extracted author: ${trimmedAuthor}`);
                        authorsSet.add(trimmedAuthor);
                        const data = yield authorModel_1.default.create({
                            name: trimmedAuthor,
                        });
                    }));
                });
                // Convert the Set to an array before sending it in the response
                const authorsArray = Array.from(authorsSet);
                console.log("Authors have been successfully extracted ");
                return authorsArray;
            }
            catch (error) {
                console.error("An error occurred:", error);
            }
        });
    }
    getauthor() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield authorModel_1.default.findAll();
            return data;
        });
    }
    getauthordata(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield authorModel_1.default.findByPk(id);
            if (!data) {
                return null;
            }
            return data;
        });
    }
    addauthor(authordata) {
        return __awaiter(this, void 0, void 0, function* () {
            const newdata = yield authorModel_1.default.create(authordata.get({ plain: true }));
            return newdata;
        });
    }
    deleteauthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield author.destroy();
        });
    }
    getUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield userModel_1.default.findByPk(id);
            return data;
        });
    }
    addReview(userid, id, review) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield reviewModel_1.default.create({ userid, bookid: id, content: review });
            return data;
        });
    }
    getReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield reviewModel_1.default.findAll({
                where: {
                    bookid: id,
                },
            });
            return data;
        });
    }
    deleteReview(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield reviewModel_1.default.findByPk(id);
            if (!data) {
                return null;
            }
            yield data.destroy();
            return data;
        });
    }
    addRating(userid, id, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ratingModel_1.default.create({
                userid,
                id,
                rating,
            });
            return data;
        });
    }
    getRating(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ratingModel_1.default.findAll({
                where: {
                    bookid: id,
                },
            });
            return data;
        });
    }
    userRegister(userdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const newdata = yield userModel_1.default.create(userdata.get({ plain: true }));
            return newdata;
        });
    }
    userLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userdata = yield userModel_1.default.findOne({ where: { email: email } });
            if (!userdata) {
                return null;
            }
            return userdata;
        });
    }
}
exports.PgService = PgService;
//# sourceMappingURL=pgService.js.map