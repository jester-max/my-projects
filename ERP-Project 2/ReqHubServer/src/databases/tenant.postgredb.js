const { connect } = require('./db-connection.postgredb');

const getTenantPostgresDB = async (tenantId) => {
  const dbName = `${tenantId}`;

  const db = await connect(dbName);

  return db;
};

const getPostgresDB = async (tenantId) => {
  const tenantDb = await getTenantPostgresDB(tenantId);

  return tenantDb;
};

module.exports = {
  getPostgresDB,
};
