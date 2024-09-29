const { connectMongodb } = require('./db-connection.mongodb');

const tenantSchema = require('../models/create.tenant.schema');
const tenantServiceSchema = require('../models/tenant.services.schema');
const customerSchema = require('../models/common.schema');

const mongoUrl = 'mongodb://localhost:27017';

const getMongodbTenantModel = async (tenantName) => {
  const dbName = `${tenantName}`;

  const db = await connectMongodb(mongoUrl);

  const tenantDb = db.useDb(dbName, { useCache: true });

  return tenantDb;
};

const getTenantModelMongodb = async (tenantName) => {
  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('tenant', tenantSchema);
};

const getMongodbModels = async (tenantName, modelName) => {
  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model(modelName, customerSchema);
};

const getTenantServiceModelMongodb = async (tenantName) => {
  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('tenantService', tenantServiceSchema);
};

module.exports = {
  getMongodbTenantModel,
  getTenantModelMongodb,
  getMongodbModels,
  getTenantServiceModelMongodb,
};
