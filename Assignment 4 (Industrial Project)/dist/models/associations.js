"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Organization_1 = __importDefault(require("./Organization"));
const Customer_1 = __importDefault(require("./Customer"));
const CustOrgAssociation_1 = __importDefault(require("./CustOrgAssociation"));
const Sow_1 = __importDefault(require("./Sow"));
const paymentPlan_1 = __importDefault(require("./paymentPlan"));
const Invoice_1 = __importDefault(require("./Invoice"));
const lineItems_1 = __importDefault(require("./lineItems"));
// import { PaymentPlan } from '../controllers/Customer_get';
// // Define associations
// Organization.belongsToMany(Customer, {
//   through:CustOrgA,
// });
// Customer.belongsToMany(Organization, {
//   through:CustOrgA,
// });
// CustOrgA.hasOne(SOW);
// SOW.belongsTo(CustOrgA,{foreignKey:'CustOrgAId'});
// SOW.hasMany(paymentPlan);
// paymentPlan.belongsTo(SOW, { foreignKey: 'SOWId' });
// CustOrgA.belongsTo(Organization, { foreignKey: 'OrganizationId' });
// CustOrgA.belongsTo(Customer, { foreignKey: 'CustomerId' });
// CustOrgA.hasOne(SOW, { foreignKey: 'CustOrgAId' });
// Define associations
Organization_1.default.belongsToMany(Customer_1.default, {
    through: CustOrgAssociation_1.default,
});
Customer_1.default.belongsToMany(Organization_1.default, {
    through: CustOrgAssociation_1.default,
});
CustOrgAssociation_1.default.hasOne(Sow_1.default, { foreignKey: 'CustOrgAId' });
Sow_1.default.belongsTo(CustOrgAssociation_1.default, { foreignKey: 'CustOrgAId' });
Sow_1.default.hasMany(paymentPlan_1.default, { foreignKey: 'SOWId' });
paymentPlan_1.default.belongsTo(Sow_1.default, { foreignKey: 'SOWId' });
CustOrgAssociation_1.default.belongsTo(Organization_1.default, { foreignKey: 'OrganizationId' });
CustOrgAssociation_1.default.belongsTo(Customer_1.default, { foreignKey: 'CustomerId' });
paymentPlan_1.default.hasOne(Invoice_1.default, { foreignKey: 'plan_id' });
Invoice_1.default.belongsTo(paymentPlan_1.default, {
    foreignKey: 'plan_id'
});
paymentPlan_1.default.hasMany(lineItems_1.default, { foreignKey: 'plan_id' });
lineItems_1.default.belongsTo(paymentPlan_1.default, { foreignKey: 'plan_id' });
