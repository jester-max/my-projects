const adminCreateTenant = require('./tenant/createTenant.router');
const adminCreatetestingInv = require('./module-structure/saleStructure.router');
const defaultAdminModule = require('./module-structure/default.services.router');

const teantCreateInv = require('./module-data/invoiceData.router');
const teantCreatePurchase = require('./module-data/purchaseData.router');
const teantCreateCustomer = require('./module-data/customerData.router');
const teantCreateEmployee = require('./module-data/employeeData.router');


const adminCreatetestingPurchase = require('./module-structure/purchaseStructure.router');

const adminCreatetestingCustomer = require('./module-structure/customerStrcture.router');
const adminCreatetestingEmployee = require('./module-structure/employeeStructure.router');
const testRouter = require("./testing/test-user");
function connectRouters(app) {
  // module-structure route
  app.use('/', adminCreateTenant);
  app.use('/', adminCreatetestingInv);
  app.use('/', defaultAdminModule);
  app.use('/', adminCreatetestingPurchase);
  app.use('/', adminCreatetestingCustomer);
  app.use('/', adminCreatetestingEmployee);

  // app.use('/', require('./module-structure/tenantInvoice.router'));


  // module-data  route
  app.use('/', teantCreateInv);
  app.use('/', teantCreatePurchase);
  app.use('/', teantCreateCustomer);
  app.use('/', teantCreateEmployee);

  // test-data  route
  app.use('/', testRouter);

}

module.exports = connectRouters;
