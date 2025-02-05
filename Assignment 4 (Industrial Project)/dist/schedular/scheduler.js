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
exports.checkPaymentPlans = void 0;
const paymentPlan_1 = __importDefault(require("../models/paymentPlan"));
// Function to check payment plans
const moment_1 = __importDefault(require("moment"));
const sequelize_1 = require("sequelize");
const Sow_1 = __importDefault(require("../models/Sow"));
const CustOrgAssociation_1 = __importDefault(require("../models/CustOrgAssociation"));
const Customer_1 = __importDefault(require("../models/Customer"));
const Organization_1 = __importDefault(require("../models/Organization"));
const email_1 = require("../service/email");
const sequelize_2 = __importDefault(require("sequelize"));
// Function to check payment plans
//Logic applied:- To check for a due paymentplan having date as today or any before today with status and pending or partially pending
const checkPaymentPlans = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = (0, moment_1.default)().format('YYYY-MM-DD'); // Format today's date as YYYY-MM-DD
    try {
        const plansDueToday = yield paymentPlan_1.default.findAll({
            where: { [sequelize_1.Op.and]: [
                    sequelize_2.default.where(sequelize_2.default.fn('DATE', sequelize_2.default.col('dueDate')), '<=', today),
                    {
                        status: {
                            [sequelize_1.Op.or]: ["Pending", "Partially Paid"]
                        }
                    }
                ] }
        });
        console.log("Plans data", plansDueToday);
        if (plansDueToday.length > 0) {
            console.log(plansDueToday);
            // Extract SOWId, particular, and amount from each plan.
            const CustomerDetails = plansDueToday.map((plan) => __awaiter(void 0, void 0, void 0, function* () {
                const sowId = plan.dataValues.SOWId;
                const particular = plan.dataValues.particular;
                const amt = plan.dataValues.amount;
                // Retrieve CustOrgAId using SOWId
                const cusorgIdData = yield Sow_1.default.findByPk(sowId);
                console.log(cusorgIdData === null || cusorgIdData === void 0 ? void 0 : cusorgIdData.dataValues.CustOrgAId);
                // Fetch CustomerId and OrganizationId from CustOrgA.
                const custOrgId = yield CustOrgAssociation_1.default.findByPk(cusorgIdData === null || cusorgIdData === void 0 ? void 0 : cusorgIdData.dataValues.CustOrgAId);
                const custId = custOrgId === null || custOrgId === void 0 ? void 0 : custOrgId.dataValues.CustomerId;
                const orgId = custOrgId === null || custOrgId === void 0 ? void 0 : custOrgId.dataValues.OrganizationId;
                // Get customer and organization details using their IDs.
                const custData = yield Customer_1.default.findByPk(custId);
                const orgData = yield Organization_1.default.findByPk(orgId);
                // Extract organization name and customer email.
                const orgname = orgData === null || orgData === void 0 ? void 0 : orgData.dataValues.displayName;
                const custemail = custData === null || custData === void 0 ? void 0 : custData.dataValues.email;
                console.log(`Organization email : ${orgname} , customer email: ${custemail}`);
                console.log('Email function called');
                // Called sendEmail function with the extracted details.
                (0, email_1.sendEmail)(orgname, custemail, particular, amt);
            }));
        }
        else {
            console.log('No payment plans due today.');
        }
    }
    catch (error) {
        console.error('Error checking payment plans:', error);
    }
});
exports.checkPaymentPlans = checkPaymentPlans;
// Above working but new methods 
// export const checkPaymentPlans = async (req:Request, res:Response) => {
//         const today = moment().format('YYYY-MM-DD'); // Format today's date as YYYY-MM-DD
//         try {
//             const plansDueToday = await paymentPlan.findAll({
//                 where: where(fn('DATE', col('dueDate')), today),
//                 attributes:['id'],
//                 include: [{
//                     model: Sow,
//                     attributes:['id','CustOrgAId'],
//                     include: [{
//                         model: CustOrgA,
//                         attributes:['id','CustomerId']
//                         // include: [Customer] // Include Customer within CustOrgA
//                     }]
//                 }]
//             });
//             // const customerIds = plansDueToday.map(plan => plan.SOW?.CustOrgA?.CustomerId).filter(id => id !== undefined);
//             const customerIds=plansDueToday.map(plan=>plan.SOWId);
//             console.log(plansDueToday);
//             res.json(customerIds);
//         } catch (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//     };
exports.default = exports.checkPaymentPlans;
