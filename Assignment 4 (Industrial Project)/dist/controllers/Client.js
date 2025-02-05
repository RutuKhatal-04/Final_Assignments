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
exports.lineitem = exports.createplan = exports.getClient = exports.makesow = exports.addClient = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const CustOrgAssociation_1 = __importDefault(require("../models/CustOrgAssociation"));
const Sow_1 = __importDefault(require("../models/Sow"));
const paymentPlan_1 = __importDefault(require("../models/paymentPlan"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../service/email");
const lineItems_1 = __importDefault(require("../models/lineItems"));
// To add client by organization
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { legalName, shortName, addressId, displayName, email, ndaSignedOn } = req.body;
    const orgid = req.user.id; // Extract orgid from the token
    //check if the client exist if yes then only the organization id and customer id gets added in the custorgAid table if client doesnt exits then data gets added in customer table of new client and checking is done on the basis of "email"
    try {
        const existingCustomer = yield Customer_1.default.findOne({
            where: {
                email: email
            }
        });
        if (existingCustomer) {
            const clientId = existingCustomer.id;
            //customer already exist thus checked wether for that organization is it there if yes then directly url of sow creation is passed if not then gets added in custorg table with that organization id and custid
            const existingAssociation = yield CustOrgAssociation_1.default.findOne({
                where: {
                    OrganizationId: orgid,
                    CustomerId: clientId
                }
            });
            if (existingAssociation) {
                const url = `http://localhost:8000/home/addClient/sow/${clientId}`;
                return res.status(201).json(`To create a sow for ${clientId} click here ${url}`);
            }
            else {
                yield CustOrgAssociation_1.default.create({
                    OrganizationId: orgid,
                    CustomerId: clientId
                });
                const url = `http://localhost:8000/home/addClient/sow/${clientId}`;
                return res.status(201).json(`To create a sow for ${clientId} click here ${url}`);
            }
        }
        else {
            const password = passCreation(7);
            //Email of password created for customer is send
            (0, email_1.sendCustEmail)(email, password);
            //if customer doesnt exist then get added in customer table
            const customer = yield Customer_1.default.create({
                orgid,
                legalName,
                shortName,
                addressId,
                displayName,
                email,
                ndaSignedOn,
                password
            });
            const clientId = customer.id;
            //and then both ids get added in custorga table
            yield CustOrgAssociation_1.default.create({
                OrganizationId: orgid,
                CustomerId: clientId
            });
            const url = `http://localhost:8000/home/addClient/sow/${clientId}`;
            return res.status(201).json(`To create a sow for ${clientId} click here ${url}`);
        }
    }
    catch (error) {
        console.error('Error adding client:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addClient = addClient;
//password creation password send by emial to customer for its login
const passCreation = (length) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
//Sow creation of the added customer
const makesow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const custId = req.params.id;
    const orgid = req.user.id;
    //custorgid taken for particular organization and customer of which sow to be created
    try {
        const orgcustid = yield CustOrgAssociation_1.default.findOne({
            where: {
                OrganizationId: orgid,
                CustomerId: custId
            }
        });
        if (!orgcustid) {
            return res.status(404).json({ error: 'Association not found' });
        }
        //destructing data from the payload passed
        const { title, installment, validityPeriod, totalValue, signedOn } = req.body;
        //sow data added
        const sow = yield Sow_1.default.create({
            CustOrgAId: orgcustid.id,
            title,
            installment,
            validityPeriod,
            totalValue,
            signedOn
        });
        //url paased for making payment plan for that sow
        const url = `http://localhost:8000/home/sow/makepay/${sow.id}`;
        return res.status(201).json({ message: `Now you can make payment plans for ${installment} installments here is the link :${url} ` });
    }
    catch (error) {
        console.error('Error creating SOW:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.makesow = makesow;
//getting all clients of that particular loggedin organization
const getClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgid = req.user.id;
    const customers = yield Customer_1.default.findAll({});
    res.json({ message: "All customers list", customers });
});
exports.getClient = getClient;
//Payment plan creation 
const createplan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //data destructed from payload
        const { particular, amount, dueDate, status } = req.body;
        //sow id was passed in params
        const sowid = req.params.id;
        //get data of sow with installement and custorgid as attribute
        const pay = yield Sow_1.default.findOne({
            attributes: ['installment', "CustOrgAId"],
            where: {
                id: sowid,
            }
        });
        console.log("pay", pay);
        console.log(sowid);
        //Installment no is extracted
        const installment = pay === null || pay === void 0 ? void 0 : pay.dataValues.installment;
        //Counted payment plan made using sow id to verify how many more paymentplan can we make 
        const countSowid = yield paymentPlan_1.default.count({ where: {
                SOWId: sowid
            } });
        console.log(countSowid);
        const custorgid = pay === null || pay === void 0 ? void 0 : pay.dataValues.CustOrgAId;
        const cust_id = yield CustOrgAssociation_1.default.findByPk(custorgid, { attributes: ["CustomerId", "OrganizationId"] });
        console.log("Custorgid", custorgid);
        console.log("Customer id", cust_id === null || cust_id === void 0 ? void 0 : cust_id.dataValues.CustomerId);
        //here is the verification done , payment plan will be made according to no of installment for each sow thus we count the existing one above and then compare if less then create plan if crosses the limit then we cant create paymentplan more than installment no  
        if (countSowid < installment) {
            const paymentplan = yield paymentPlan_1.default.create({
                SOWId: sowid,
                particular,
                amount,
                dueDate,
                status,
                balance: amount,
                Customer_Id: cust_id === null || cust_id === void 0 ? void 0 : cust_id.dataValues.CustomerId,
                Organization_Id: cust_id === null || cust_id === void 0 ? void 0 : cust_id.dataValues.OrganizationId
            });
            const planid = paymentplan.dataValues.id;
            console.log(planid);
            const url = `http://localhost:8000/home/addClient/sow/makelineit/${planid}`;
            res.status(201).json({ message: `Payment plan created ${url}` });
        }
        else {
            res.send("Cannot create a payment plan ");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the payment plan." });
    }
});
exports.createplan = createplan;
const lineitem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const planid = req.params.id;
    const { amount, particular } = req.body;
    const lineitems = yield lineItems_1.default.create({
        amount: amount,
        particular: particular,
        plan_id: planid
    });
    res.json({ message: "line item created" });
});
exports.lineitem = lineitem;
exports.default = { addClient: exports.addClient, getClient: exports.getClient, createplan: exports.createplan };
