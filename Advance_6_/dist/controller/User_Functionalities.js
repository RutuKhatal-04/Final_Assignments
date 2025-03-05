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
exports.getorder = exports.createPayment = exports.payment = exports.getRating = exports.addRating = exports.deletereview = exports.getreview = exports.addReview = void 0;
const client_1 = require("gocardless-nodejs/client");
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const ratingModel_1 = __importDefault(require("../models/ratingModel"));
const constants_1 = require("gocardless-nodejs/constants");
const userModel_1 = __importDefault(require("../models/userModel"));
const booksModel_1 = __importDefault(require("../models/booksModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
//Logged in user can add review to book using bookid passed in params
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.user.id;
    const { id } = req.params;
    const { review } = req.body;
    try {
        const data = yield reviewModel_1.default.create({
            userid,
            bookid: id,
            content: review
        });
        console.log(userid, id, review);
        res.json({ message: "Data inserted successfully", data });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.addReview = addReview;
//retrive the review of the book using id
const getreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield reviewModel_1.default.findAll({
            where: {
                bookid: id
            }
        });
        if (!data) {
            res.json({ message: "No review for this book id" });
            return;
        }
        res.json({ message: "All reviews for this book", data });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.getreview = getreview;
//Logged in user can delete the review of the book id passed in params
const deletereview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield reviewModel_1.default.findByPk(id);
        if (!data) {
            res.json({ message: "No review exist" });
            return;
        }
        yield data.destroy();
        res.json({ message: "Data deleted successfully" });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.deletereview = deletereview;
//Logges in user can add ratings to the book
const addRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; //bookid
    const { rating } = req.body;
    const userid = req.user.id;
    try {
        const data = yield ratingModel_1.default.create({
            userid,
            bookid: id,
            rating
        });
        res.json({ message: "Rating added successfully", data });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.addRating = addRating;
//Retrieve the rating of the particular book
const getRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield ratingModel_1.default.findAll({ where: {
                bookid: id
            } });
        if (!data) {
            res.json({ message: "Data not found" });
            return;
        }
        res.json({ message: "Rating data for book", data });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.getRating = getRating;
////Payment Gocardless
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = process.env.GoCardlessAccessToken;
    const client = new client_1.GoCardlessClient(accessToken, constants_1.Environments.Sandbox);
    //gocardless code for customer retrieval
    try {
        const listResponse = yield client.customers.list({
            limit: '10',
        });
        const customers = listResponse.customers;
        console.log(customers);
        res.status(200).json(customers);
    }
    catch (error) {
        console.error('Error listing customers:', error);
        res.status(500).json({ error: 'Failed to list customers' });
    }
});
exports.payment = payment;
//Create customer,mandate for that customer and make payment for the bookid passed in params
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = process.env.GoCardlessAccessToken;
    const client = new client_1.GoCardlessClient(accessToken, constants_1.Environments.Sandbox);
    const { id } = req.user;
    const { bookId } = req.params;
    try {
        //user data retrived for that loggedin user id
        const user = yield userModel_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        //book data retrieved for that bookid which passed in params
        const book = yield booksModel_1.default.findByPk(bookId);
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }
        //  Create a customer 
        const customerResponse = yield client.customers.create({
            given_name: user.dataValues.name,
            family_name: "Singh", // Ensure this field is available
            email: user.dataValues.email,
            address_line1: '123 Main Street',
            city: 'London',
            postal_code: 'E1 8QS',
            country_code: 'GB',
        });
        //return data
        const customerData = {
            id: customerResponse.id,
            given_name: customerResponse.given_name,
            email: customerResponse.email,
        };
        //  Create a customer bank account
        const bankAccountResponse = yield client.customerBankAccounts.create({
            account_number: '55779911',
            branch_code: '200000',
            account_holder_name: user.dataValues.name,
            country_code: 'GB',
            links: {
                customer: customerResponse.id, // Ensure it's a string
            },
        });
        //  Create a mandate
        const mandateResponse = yield client.mandates.create({
            scheme: 'bacs',
            links: {
                customer_bank_account: bankAccountResponse.id, // Ensure it's a string
            },
        });
        //  Create a payment for book id passed in params
        const paymentResponse = yield client.payments.create({
            amount: book.dataValues.price,
            currency: 'GBP',
            links: {
                mandate: mandateResponse.id,
            },
            description: `Purchase of book: ${book.dataValues.title}`,
        });
        if (!paymentResponse) {
            res.json({ message: "Payment not done" });
            return;
        }
        //if payment successfully done then order get created and added in payment table
        const order = yield paymentModel_1.default.create({
            bookid: bookId, userid: id, amount: book.dataValues.price, status: 'Paid'
        });
        res.json({
            message: "Customer, mandate, and payment created successfully",
            customer: customerData,
            mandate: mandateResponse,
            payment: paymentResponse,
            order: order
        });
    }
    catch (error) {
        console.error('Error creating customer, mandate, or payment:', error);
        res.status(500).json({ error: 'Failed to create customer, mandate, or payment' });
    }
});
exports.createPayment = createPayment;
// Retrieval of all order of logged in customer
const getorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    try {
        const data = yield paymentModel_1.default.findAll({
            where: {
                userid: id
            }
        });
        if (!data) {
            res.json({ message: "Data not found" });
            return;
        }
        res.json({ message: "Order data", data });
        return;
    }
    catch (error) {
        res.json({ error });
        return;
    }
});
exports.getorder = getorder;
//# sourceMappingURL=User_Functionalities.js.map