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
exports.addClient = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { legalName, shortName, addressId, displayName, email, ndaSignedOn } = req.body;
    const orgid = req.user.id; // Extract orgid from the token
    try {
        const customer = yield Customer_1.default.create({
            orgid,
            legalName,
            shortName,
            addressId,
            displayName,
            email,
            ndaSignedOn,
        });
        res.status(201).json(customer);
    }
    catch (error) {
        console.error('Error adding client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addClient = addClient;
exports.default = exports.addClient;
