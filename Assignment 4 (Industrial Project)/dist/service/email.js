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
exports.sendInvoiceMail = exports.sendCustEmail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
//To send Payment Due Emails
const sendEmail = (orgname, custemail, particular, amt) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: 'rutukhatal13@gmail.com',
            pass: 'cxln gzjg amrs vmji'
        }
    });
    const mailOptions = {
        from: 'rutukhatal13@gmail.com',
        to: custemail,
        subject: 'Payment plans',
        text: `Hello , Pls pay the payment for ${particular} of organization ${orgname} of Rs. ${amt}`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Mail Sent", info.response);
        }
    });
});
exports.sendEmail = sendEmail;
//To send customer passowrd for login
const sendCustEmail = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'rutukhatal13@gmail.com',
            pass: 'cxln gzjg amrs vmji'
        }
    });
    const mailOptions = {
        from: 'rutukhatal13@gmail.com',
        to: email,
        subject: 'Password details',
        text: `Hello , here is your password to login ${password}`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Mail Sent", info.response);
        }
    });
});
exports.sendCustEmail = sendCustEmail;
//To send invoice of payment for due payments
const sendInvoiceMail = (custemail, orgemail, amt, particulars, custname, orgname) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'rutukhatal13@gmail.com',
            pass: 'cxln gzjg amrs vmji'
        }
    });
    const mailOptions = {
        from: 'rutukhatal13@gmail.com',
        to: [orgemail, custemail],
        subject: 'Password details',
        text: `Congratulations ${custname} you have successfully paid Rs.${amt} for ${particulars} of Organization ${orgname},`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Mail Sent", info.response);
        }
    });
};
exports.sendInvoiceMail = sendInvoiceMail;
