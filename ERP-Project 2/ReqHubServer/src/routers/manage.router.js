const tenatRoute = require('./tenant-user/createTenant.router');
const tenantActaulDataRoute = require('./tenant-user/commonData.router');
const tenantStructureRoute = require('./tenant-user/commonStrcture.router');

const adminRoute = require('./tenant-manager/tenant-manager');
function connectRouters(app) {

  // tenant-user route
  app.use('/', tenatRoute);

  // module-structure route
  app.use('/', tenantStructureRoute);

  // module-data  route
  app.use('/', tenantActaulDataRoute);

  // test-data  route
  app.use('/', adminRoute);

}

module.exports = connectRouters;
