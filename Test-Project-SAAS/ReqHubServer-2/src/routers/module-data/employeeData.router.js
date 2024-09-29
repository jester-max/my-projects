const express = require('express');
const {createEmployeeData, getEmployeeData} = require("../../controllers/module-data/employee.employeeData.controller");



const invoiceRoute = express.Router();



invoiceRoute.route('/tenant/employee/create-employee/:tenantID').post(createEmployeeData)
invoiceRoute.route('/tenant/employee/get-employee/:tenantID').get(getEmployeeData)



module.exports = invoiceRoute;

/*
const express = require('express');

const { getTenantModel } = require('../../databases/tenant.mongodb.connection');
const { getEmployeeModel } = require('../../databases/tenant.mariadb');

const employeeRoute = express.Router();

// Only  invoice dummy schema is Store
employeeRoute
  .route('/module-data/create-employee/:module-data')
  .post(async function (req, res, next) {
    try {
      const employeeData = req.body;

      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const employeeModel = await getEmployeeModel(tenantID);

        const employeeModelObject = new employeeModel({
          dynamicField: employeeData,
        });

        const saveObj = await employeeModelObject.save();

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

employeeRoute
  .route('/module-data/get-employee/:module-data')
  .get(async function (req, res, next) {
    try {
      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const employeeModel = await getEmployeeModel(tenantID);

        const getArray = await employeeModel.find();

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

employeeRoute
  .route('/module-data/delete-employee/:module-data')
  .delete(async function (req, res, next) {
    try {
      const tenantID = req.params.tenant;

      const tenantModel = await getTenantModel();

      const tenant = await tenantModel.findOne({ tenantID: tenantID });

      if (tenant) {
        const employeeModel = await employeeModel(tenantID);

        const getArray = await employeeModel.deleteMany();

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

module.exports = employeeRoute;
*/
