const express = require('express');
const {
  createTableData,
  getAllTableData,
  deleteAllTableData,
  deleteOneTableData,
  getOneTableData,
  updateTableData,
} = require('../../controllers/tenant-user/common.Data.controller');
const { verifyJWT } = require('../../middlewares/auth.middleware');

const commonData = express.Router();

commonData
  .route('/tenant-user/employee/employee/create-employee/:tenantID')
  .post(verifyJWT, createTableData);
commonData
  .route('/tenant-user/employee/employee/get-employee/:tenantID')
  .get(verifyJWT, getAllTableData);

commonData
  .route('/tenant-user/customer/customer/create-customer/:tenantID')
  .post(verifyJWT, createTableData);
commonData
  .route('/tenant-user/customer/customer/get-customer/:tenantID')
  .get(verifyJWT, getAllTableData);

commonData
  .route('/tenant-user/sale/sale_invoice/create-invoice/:tenantID')
  .post(verifyJWT, createTableData);
commonData
  .route('/tenant-user/sale/sale_invoice/get-invoice/one/test/:tenantID')
  .get(verifyJWT, getOneTableData);
commonData
  .route('/tenant-user/sale/sale_invoice/get-invoice/:tenantID')
  .get(verifyJWT, getAllTableData);
commonData
  .route('/tenant-user/sale/sale_invoice/update-invoice/:tenantID')
  .put(verifyJWT, updateTableData);
commonData
  .route('/tenant-user/sale/sale_invoice/delete-invoice/:tenantID')
  .delete(verifyJWT, deleteAllTableData);
commonData
  .route('/tenant-user/sale/sale_invoice/delete-invoice/one/:tenantID')
  .delete(verifyJWT, deleteOneTableData);

commonData
  .route('/tenant-user/sale/sale_quotation/create-quotation/:tenantID')
  .post(verifyJWT, createTableData);
commonData
  .route('/tenant-user/sale/sale_quotation/get-quotation/:tenantID')
  .get(verifyJWT, getAllTableData);
commonData
  .route('/tenant-user/sale/sale_transport/create-transport/:tenantID')
  .post(verifyJWT, createTableData);
commonData
  .route('/tenant-user/sale/sale_transport/get-transport/:tenantID')
  .get(verifyJWT, getAllTableData);

commonData
  .route('/tenant-user/purchase/create-invoice/:tenantID')
  .post(verifyJWT, createTableData);
commonData
  .route('/tenant-user/purchase/get-invoice/:tenantID')
  .get(verifyJWT, getAllTableData);
commonData
  .route('/tenant-user/purchase_quotation/create-quotation/:tenantID')
  .post(verifyJWT, createTableData);
commonData
  .route('/tenant-user/purchase_quotation/get-quotation/:tenantID')
  .get(verifyJWT, getAllTableData);

module.exports = commonData;
