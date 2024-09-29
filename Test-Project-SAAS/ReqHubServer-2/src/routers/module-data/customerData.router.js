
const express = require('express');
const {createCustomerData, getCustomerData} = require("../../controllers/module-data/customer.customerData.controller");
const {verifyJWT} = require("../../middlewares/auth.middleware");



const invoiceRoute = express.Router();



invoiceRoute.route('/tenant/customer/create-customer/:tenantID').post(verifyJWT,createCustomerData)
invoiceRoute.route('/tenant/customer/get-customer/:tenantID').get(verifyJWT,getCustomerData)


module.exports = invoiceRoute;

/*
const express = require('express');
const { getTenantModel } = require('../../databases/tenant.mongodb.connection');
const { getCustomerModel } = require('../../databases/tenant.mariadb');

const customerRoute = express.Router();

// Only  invoice dummy schema is Store
customerRoute
  .route('/module-data/create-customer/:module-data')
  .post(async function (req, res, next) {
    try {
      const customerData = req.body;

      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const customerModel = await getCustomerModel(tenantID);

        const customerModelObject = new customerModel({
          dynamicField: customerData,
        });

        const saveObj = await customerModelObject.save();

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
  });

customerRoute
  .route('/module-data/get-customer/:module-data')
  .get(async function (req, res, next) {
    try {
      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const customerModel = await getCustomerModel(tenantID);

        const getArray = await customerModel.find();

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
  });

customerRoute
  .route('/module-data/delete-customer/:module-data')
  .delete(async function (req, res, next) {
    try {
      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const customerModel = await getTenantModel(tenantID);

        const getArray = await customerModel.deleteMany();

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
  });

module.exports = customerRoute;
*/
