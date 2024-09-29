const { connect } = require('./db-connection.mariadb');

const getTenantDB = async (tenantId) => {
  const dbName = `${tenantId}`;

  const db = await connect(dbName);

  return db;
};

const getInvoiceModel = async (tenantId) => {
  const tenantDb = await getTenantDB(tenantId);

  return tenantDb;
};

const getEmployeeModel = async (tenantId) => {
  const tenantDb = await getTenantDB(tenantId);

  return tenantDb;
};

const getCustomerModel = async (tenantId) => {
  const tenantDb = await getTenantDB(tenantId);

  return tenantDb;
};

module.exports = {
  getInvoiceModel,
  getEmployeeModel,
  getCustomerModel,
};
