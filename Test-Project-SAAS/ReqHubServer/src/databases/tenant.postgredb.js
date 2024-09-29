const { connect } = require('./db-connection.postgredb');

const getTenantPostgresDB = async (tenantId) => {
    const dbName = `${tenantId}`;

    const db = await connect(dbName);

    return db;
};

const getInvoiceModelPostgres = async (tenantId) => {

    const tenantDb = await getTenantPostgresDB(tenantId);

    return tenantDb;
};

const getEmployeeModelPostgres = async (tenantId) => {
    const tenantDb = await getTenantPostgresDB(tenantId);

    return tenantDb;
};

const getCustomerModelPostgres = async (tenantId) => {
    const tenantDb = await getTenantPostgresDB(tenantId);

    return tenantDb;
};

module.exports = {
    getInvoiceModelPostgres,
    getEmployeeModelPostgres,
    getCustomerModelPostgres,
};
