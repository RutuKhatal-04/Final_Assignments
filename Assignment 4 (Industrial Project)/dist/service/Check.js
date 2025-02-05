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
exports.checkUser = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const CustOrgAssociation_1 = __importDefault(require("../models/CustOrgAssociation"));
//Logic applied:- If the customer is already there checked using email
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body;
    const orgid = req.user.id; // Extract orgid from the token
    const yes = yield Customer_1.default.findOne({
        where: {
            email: email
        }
    });
    if (yes) {
        const customerId = yes.id;
        const getorg = CustOrgAssociation_1.default.findOne({
            where: {
                CustomerId: customerId,
            }
        });
        return { getorg, customerId };
    }
});
exports.checkUser = checkUser;
