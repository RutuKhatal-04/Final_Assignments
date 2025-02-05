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
exports.payment = exports.PaymentPlan = exports.Sowdetails = exports.custOrgdetails = exports.Custdetails = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
const CustOrgAssociation_1 = __importDefault(require("../models/CustOrgAssociation"));
const paymentPlan_1 = __importDefault(require("../models/paymentPlan"));
const Sow_1 = __importDefault(require("../models/Sow"));
const Organization_1 = __importDefault(require("../models/Organization"));
const moment_1 = __importDefault(require("moment"));
const Invoice_1 = __importDefault(require("../models/Invoice"));
const email_1 = require("../service/email");
// For cutomer to get its own profile details
const Custdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user.id);
        const cust_id = req.user.id;
        //Find customer using id
        const cust = yield Customer_1.default.findByPk(cust_id, {
            attributes: ['id', 'legalName', 'email', 'ndaSignedOn']
        });
        if (!cust) {
            res.json({ message: "Customer not found" });
        }
        else {
            const response = `<html>
    <head>
        <title>Customer Details</title>
    </head>
    <body>
        <h1>Customer Details</h1>
        <table border="1">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Signed On</th>
            </tr>
            <tr>
                <td>${cust.id}</td>
                <td>${cust.legalName}</td>
                <td>${cust.email}</td>
                <td>${cust.ndaSignedOn}</td>
            </tr>
        </table>
    </body>
</html>
`;
            res.send(response);
        }
    }
    catch (err) {
        console.error("Cannot fetch customer details");
    }
});
exports.Custdetails = Custdetails;
// For customer to get all details related to which orgnization it belongs with its sow url for getting sow in that registered organization
const custOrgdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cust_id = req.user.id;
    //get custorg data using customer id
    const orgid = yield CustOrgAssociation_1.default.findAll({ where: {
            CustomerId: cust_id
        }, attributes: ["id", "OrganizationId"] });
    //organization id extracted from above data
    const CustOrgids = orgid.map(id => id.dataValues.OrganizationId); // comes in array
    //fetch the display names of the organizations , bcz in array we map it 
    const orgname = yield Promise.all(CustOrgids.map((id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Organization_1.default.findOne({
            attributes: ["displayname"],
            where: {
                id: id
            }
        });
    })));
    console.log(CustOrgids);
    console.log("orgname", orgname);
    //organization name extracted
    const name = orgname.map(name => name === null || name === void 0 ? void 0 : name.dataValues.displayname);
    console.log(name);
    // custorg id extracted 
    const custorgid = orgid.map(id => id.dataValues.id);
    console.log("custorgid", custorgid);
    //response whihc shows org name , sow url of that customer in that specific organization ,index will iterated at same index in both array of custorgid and orgdata at same time this will help for matching 
    const result = orgname.map((org, index) => {
        return {
            OrgName: org,
            Sow_url: `http://localhost:8000/customer/sowdetails/${CustOrgids[index]}`,
        };
    });
    res.json(result);
});
exports.custOrgdetails = custOrgdetails;
//to get details for sow in that organization using custorgid  passed in url as params
const Sowdetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cust_id = req.user.id;
    const custorgid = req.params.id;
    console.log(custorgid);
    try {
        const sow = yield Sow_1.default.findAll({
            attributes: ["id", "title", "installment", "validityPeriod", "totalValue", "signedOn"],
            where: {
                CustOrgAId: custorgid,
            }
        });
        if (sow.length === 0) {
            res.json({ message: "No SOW found for this customer" });
        }
        else {
            const rows = sow.map(s => `
                <tr>
                    <td>${s.title}</td>
                    <td>${s.installment}</td>
                    <td>${s.validityPeriod}</td>
                    <td>${s.totalValue}</td>
                    <td>${s.signedOn}</td>
                    <td>http://localhost:/8000/customer/payplandetails/${s.id}</td>
                </tr>
            `).join('');
            const response = `
                <html>
                <head>
                    <title>SOW Details</title>
                </head>
                <body>
                    <h1>SOW Details</h1>
                    <table border="1">
                        <tr>
                            <th>Title</th>
                            <th>Installment</th>
                            <th>Validity Period</th>
                            <th>Total Value</th>
                            <th>Signed On</th>
                            <th>Url to paymentplan </th>
                        </tr>
                        ${rows}
                    </table>
                </body>
                </html>
            `;
            res.send(response);
        }
    }
    catch (err) {
        console.error("Cannot fetch SOW details", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.Sowdetails = Sowdetails;
//to get paymentplan details of that sow , sowid passed in url as params, so find using sowid in paymentplan table
const PaymentPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cust_id = req.user.id;
    const sow_id = req.params.id;
    const payplan = yield paymentPlan_1.default.findAll({
        where: {
            SOWId: sow_id
        }
    });
    if (payplan.length === 0) {
        res.json({ message: "No SOW found for this customer" });
        return;
    }
    const rows = payplan.map(plan => `
        <tr>
            <td>${plan.particular}</td>
            <td>${plan.amount}</td>
            <td>${plan.status}</td>
            <td>${plan.balance}</td>
            <td>${cust_id}</td>
            <td>http://localhost:8000/customer/pay/${plan.id}</td>
        </tr>
    `).join('');
    const response = `
        <html>
        <head>
            <title>Payment Plan Details</title>
        </head>
        <body>
            <h1>Payment Plan Details</h1>
            <table border="1">
                <tr>
                    <th>Particulars</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Balance</th>
                    <th>Customer ID</th>
                    <th>Payment Link</th>
                </tr>
                ${rows}
            </table>
        </body>
        </html>
    `;
    res.send(response);
});
exports.PaymentPlan = PaymentPlan;
//To update the paid value for each payment plan , in body amt to be paid is passed which gets deducted from the actual amount and new column is there of balance whose default value is actual amount and as payment is done that value gets deducted and if balance is 0 then status updated as "paid" else "partially paid" by default is "pending"
const payment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amt } = req.body;
    const pid = parseInt(req.params.id);
    console.log(pid);
    console.log(amt);
    const cust_id = req.user.id;
    const data = yield paymentPlan_1.default.findByPk(pid);
    //logic implemented for amt deduction and status updation
    if (data) {
        const actual_amt = data.balance;
        const pending = actual_amt - amt;
        data.balance = pending;
        if (pending === 0) {
            data.status = "Paid";
        }
        else {
            data.status = "Partially Paid";
        }
        yield data.save();
    }
    const today = (0, moment_1.default)().format('YYYY-MM-DD');
    //Invoice is created for each paid amt for specific paymentplan and data gets inserted in invoice table along with the mail is send to customer as well as organization of invoice data 
    const invoice = yield Invoice_1.default.create({
        value: amt,
        customer_id: cust_id,
        pay_received: today,
        plan_id: pid,
        organization_id: data === null || data === void 0 ? void 0 : data.Organization_Id
    });
    //data extracted for passing parameters to sendemail function
    const orgdata = yield Organization_1.default.findByPk(data === null || data === void 0 ? void 0 : data.Organization_Id);
    console.log(orgdata);
    const orgname = orgdata === null || orgdata === void 0 ? void 0 : orgdata.dataValues.displayName;
    console.log(orgname);
    const orgemail = orgdata === null || orgdata === void 0 ? void 0 : orgdata.dataValues.email;
    const custdata = yield Customer_1.default.findByPk(cust_id);
    const custname = custdata === null || custdata === void 0 ? void 0 : custdata.dataValues.legalName;
    const custemail = custdata === null || custdata === void 0 ? void 0 : custdata.dataValues.email;
    const particulars = data === null || data === void 0 ? void 0 : data.dataValues.particular;
    //Invoice send mail function called
    (0, email_1.sendInvoiceMail)(custemail, orgemail, amt, particulars, custname, orgname);
    res.json(invoice);
});
exports.payment = payment;
