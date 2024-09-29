const adminCreateTenant = require('./module-definition/createTenant.router');
const adminCreatetestingInv = require('./module-definition/invoice.test.router');
const defaultAdminModule = require('./module-definition/default.services.router');

const teantCreateInv = require('./data-production/invoiceActual.router');
const teantCreatePurchase = require('./data-production/purchaseActual.router');
const teantCreateCustomer = require('./data-production/customerAtual.router');
const teantCreateEmployee = require('./data-production/employeeAtual.router');


const adminCreatetestingPurchase = require('./module-definition/purchase.test.router');

const adminCreatetestingCustomer = require('./module-definition/customer.router');
const adminCreatetestingEmployee = require('./module-definition/employee.router');
function connectRouters(app) {
  // module-definition route
  app.use('/', adminCreateTenant);
  app.use('/', adminCreatetestingInv);
  app.use('/', defaultAdminModule);
  app.use('/', adminCreatetestingPurchase);
  app.use('/', adminCreatetestingCustomer);
  app.use('/', adminCreatetestingEmployee);

  // app.use('/', require('./module-definition/tenantInvoice.router'));
  // app.use('/', require('./module-definition/invoice.test.router'));
  // app.use('/', require('./module-definition/tenantCustomer.router'));
  // app.use('/', require('./module-definition/tenantEmployee.router'));

  // data-production  route
  app.use('/', teantCreateInv);
  app.use('/', teantCreatePurchase);
  app.use('/', teantCreateCustomer);
  app.use('/', teantCreateEmployee);
}

module.exports = connectRouters;
