
const express = require('express');
const {createCustomerData, getCustomerData} = require("../../controllers/customer/customer.data.controller");



const invoiceRoute = express.Router();



invoiceRoute.route('/tenant/customer/create-customer/:tenantID').post(createCustomerData)
invoiceRoute.route('/tenant/customer/get-customer/:tenantID').get(getCustomerData)


module.exports = invoiceRoute;

/*
const express = require('express');
const { getTenantModel } = require('../../databases/tenant.mongodb.connection');
const { getCustomerModel } = require('../../databases/tenant.mariadb');

const customerRoute = express.Router();

// Only  invoice dummy schema is Store
customerRoute
  .route('/data-production/create-customer/:data-production')
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
  .route('/data-production/get-customer/:data-production')
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
  .route('/data-production/delete-customer/:data-production')
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
