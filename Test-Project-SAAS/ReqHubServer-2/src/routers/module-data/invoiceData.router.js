const express = require('express');

const {createInvocieData, getInvocieData,deleteInvoiceData} =
    require("../../controllers/module-data/sale.invoiceData.controller");
const {createQuotationData, getQuotationData} = require("../../controllers/module-data/sale.quotationData.controller");
const {createTeantData} = require("../../controllers/tenant/create.tenant.controller");
const {createTransportData, getTransportData} = require("../../controllers/module-data/sale.transportData.controller");

const invoiceRoute = express.Router();



invoiceRoute.route('/tenant/sale/create-invoice/:tenantID').post(createInvocieData)
invoiceRoute.route('/tenant/sale/get-invoice/:tenantID').get(getInvocieData)



invoiceRoute.route('/tenant/sale_quotation/create-quotation/:tenantID').post(createQuotationData)
invoiceRoute.route('/tenant/sale_quotation/get-quotation/:tenantID').get(getQuotationData)

invoiceRoute.route('/tenant/sale_transport/create-transport/:tenantID').post(createTransportData)
invoiceRoute.route('/tenant/sale_transport/get-transport/:tenantID').get(getTransportData)

module.exports = invoiceRoute;

































/*const { getTenantModel } = require('../../databases/tenant.mongodb.connection');
const { getInvoiceModel } = require('../../databases/tenant.postgredb');*/

// Only  invoice dummy schema is Store

/*invoiceRoute.route('/tenant/create-invoice/:tenantID').post(async function (req, res, next) {
    try {

      const invoiceData = req.body;

      const tenantID = req.params.tenantID;

      const tenantModel = await getTenantModel(req.params.tenantID);

      const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID });

      if (tenant) {

        const invoiceModel = await getInvoiceModel(tenantID);

        console.log(invoiceData)

        // const sqlCreateTable =
        //     'CREATE TABLE IF NOT EXISTS Invoice (id SERIAL PRIMARY KEY, json_data JSON);';
        //
        // const result = await invoiceModel.query(sqlCreateTable);
        //
        // const sqlQuery = 'INSERT INTO Invoice (json_data) VALUES ($1) RETURNING *';
        //
        // const result2 = await invoiceModel.query(sqlQuery, [invoiceData]);

        res.json({
          Status: 'SUCCESS',
          language: 'en_US',
          StatusCode: res.StatusCode,
          data: null,
          error: null,
        });
      } else {
        res.json({
          Status: 'PENDING',
          language: 'en_US',
          StatusCode: res.StatusCode,
          data: null,
          error: null,
          message: 'TENANT ID IS NOT CORRECT',
        });
      }
    } catch (err) {
      res.json({
        Status: 'ERROR',
        language: 'en_US',
        StatusCode: res.StatusCode,
        data: null,
        error: err.message,
      });
    }
  });*/

/*invoiceRoute.route('/module-data/get-invoice/:module-data').get(async function (req, res, next) {
    try {
      const sqpQuery = `select * from Invoice`;

      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const invoiceModel = await getInvoiceModel(tenantID);

        const getArray = await invoiceModel.query(sqpQuery);

        res.json({
          Status: 'SUCCESS',
          language: 'en_US',
          StatusCode: res.StatusCode,
          data: getArray,
          error: null,
        });
      } else {
        res.json({
          Status: 'PENDING',
          language: 'en_US',
          StatusCode: res.StatusCode,
          data: null,
          error: null,
          message: 'TENANT ID IS NOT CORRECT',
        });
      }
    } catch (err) {
      res.json({
        Status: 'ERROR',
        language: 'en_US',
        StatusCode: res.StatusCode,
        data: null,
        error: err.message,
      });
    }
  });*/


/*invoiceRoute.route('/module-data/delete-invoice/:module-data').delete(async function (req, res, next) {
    try {
      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const invoiceModel = await getInvoiceModel(tenantID);

        const getArray = await invoiceModel.deleteMany();

        res.json({
          Status: 'SUCCESS',
          language: 'en_US',
          StatusCode: res.StatusCode,
          data: getArray,
          error: null,
        });
      } else {
        res.json({
          Status: 'PENDING',
          language: 'en_US',
          StatusCode: res.StatusCode,
          data: null,
          error: null,
          message: 'TENANT ID IS NOT CORRECT',
        });
      }
    } catch (err) {
      res.json({
        Status: 'ERROR',
        language: 'en_US',
        StatusCode: res.StatusCode,
        data: null,
        error: err.message,
      });
    }
  });*/


/*module.exports = invoiceRoute;*/
