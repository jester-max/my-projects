const { connectMongodb } = require('./db-connection.mongodb');

const tenantSchema = require('../models/create.tenant.schema');


const invoiceSchema = require('../models/sale.invoice.schema');
const quotationSchema = require('../models/salequatation.schema');
const transportSchema = require('../models/sale.transport.schema');
const invoicePurchaseSchema = require('../models/purchase.invoice.schema');
const quotationPurchaseSchema = require('../models/purchase.quatation.schema');
const employeeSchema = require('../models/employee.schema');
const customerSchema = require('../models/customer.schema');
const defaultAdminSchema = require('../models/admin/default.services.schema');
const defaultAdminStaticSchema = require('../models/admin/staticData.schema');

const mongoUrl = 'mongodb://localhost:27017';

const getMongodbTenantModel = async (tenantName) => {

  const dbName = `${tenantName}`;

  const db =  await connectMongodb(mongoUrl)

  const tenantDb = db.useDb(dbName, { useCache: true });

  return tenantDb;
}

const getTenantModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model("tenant", tenantSchema)

};

const getInvoiceModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('invoice', invoiceSchema);
};

const getQuotationModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('quotation', quotationSchema);
};

const getTransportModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('transport', transportSchema);
};

const getPurchaseInvoiceModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('purchase', invoicePurchaseSchema);
};

const getPurchaseQuotationModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('purchasequotation', quotationPurchaseSchema);
};

const getEmployeeModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('employee', employeeSchema);
};

const getCustomerModelMongodb = async (tenantName) => {

  const mongoUrl = `mongodb://localhost:27017/${tenantName}`;

  const tenantDb = await connectMongodb(mongoUrl);



  return tenantDb.model('customer', customerSchema);
};

const defaultMongodbAdminModel = async () => {

  const mongoUrl = 'mongodb://localhost:27017/HPUAdminDB';

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('DefaultAdminModel', defaultAdminSchema);
};

const defaultMongodbAdminStaticModel = async () => {

  const mongoUrl = 'mongodb://localhost:27017/HPUAdminDB';

  const tenantDb = await connectMongodb(mongoUrl);

  return tenantDb.model('DefaultAdminStaticModel', defaultAdminStaticSchema);
};

module.exports = {
  getInvoiceModelMongodb,
  getQuotationModelMongodb,
  getTransportModelMongodb,
  // invoice end

  getPurchaseInvoiceModelMongodb,
  getPurchaseQuotationModelMongodb,
  //purchase end
  getMongodbTenantModel,
  getTenantModelMongodb,

  getEmployeeModelMongodb,
  getCustomerModelMongodb,
  defaultMongodbAdminModel,
  defaultMongodbAdminStaticModel
};
