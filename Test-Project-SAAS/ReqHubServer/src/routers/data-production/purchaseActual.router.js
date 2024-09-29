const express = require('express');

const {createPurchaseData, getPurchaseData} = require("../../controllers/purchase/invoice.data.controller");
const {createQuotationData, getQuotationData} = require("../../controllers/purchase/quotation.data.controller");

const invoiceRoute = express.Router();



invoiceRoute.route('/tenant/purchase/create-invoice/:tenantID').post(createPurchaseData)
invoiceRoute.route('/tenant/purchase/get-invoice/:tenantID').get(getPurchaseData)



invoiceRoute.route('/tenant/purchase/create-quotation/:tenantID').post(createQuotationData)
invoiceRoute.route('/tenant/purchase/get-quotation/:tenantID').get(getQuotationData)


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

/*invoiceRoute.route('/data-production/get-invoice/:data-production').get(async function (req, res, next) {
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


/*invoiceRoute.route('/data-production/delete-invoice/:data-production').delete(async function (req, res, next) {
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
