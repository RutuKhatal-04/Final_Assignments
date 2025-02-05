import Organization from './Organization';
import Customer from './Customer';
import CustOrgA from './CustOrgAssociation';
import SOW from './Sow';
import paymentPlan from './paymentPlan';
import Invoice from './Invoice';
import lineItem from './lineItems';
<<<<<<< HEAD
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
=======

>>>>>>> b7cb7d21f2a486a794a4d4fb950f86c107b2679c
Organization.belongsToMany(Customer, {
  through: CustOrgA,
});

Customer.belongsToMany(Organization, {
  through: CustOrgA,
});

CustOrgA.hasOne(SOW, { foreignKey: 'CustOrgAId' });
SOW.belongsTo(CustOrgA, { foreignKey: 'CustOrgAId' });

SOW.hasMany(paymentPlan, { foreignKey: 'SOWId' });
paymentPlan.belongsTo(SOW, { foreignKey: 'SOWId' });

CustOrgA.belongsTo(Organization, { foreignKey: 'OrganizationId' });
CustOrgA.belongsTo(Customer, { foreignKey: 'CustomerId' });

paymentPlan.hasOne(Invoice,{foreignKey:'plan_id'})
Invoice.belongsTo(paymentPlan,{
  foreignKey:'plan_id'
})

paymentPlan.hasMany(lineItem,{foreignKey:'plan_id'})
lineItem.belongsTo(paymentPlan,{foreignKey:'plan_id'})