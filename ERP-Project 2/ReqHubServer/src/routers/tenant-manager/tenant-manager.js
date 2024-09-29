const express = require('express');
const {
  addUser,
  getUser,
} = require('../../controllers/testing-user/test-user.controller');

const {
  createAdminServices,
  getAdminServices,
  updateModuleAdminServices, getDefaulterServices, createDefaulterServices,
  getDefaulterData, createDefaulterData,
} = require('../../controllers/teant-manager/teantManager.services.controller');


const testRouter = express.Router();




/* admin or tenant-manager create and get ,update apis start */
testRouter.route('/tenant-manager/services').post(createAdminServices);

testRouter.route('/tenant-manager/services').get(getAdminServices);

testRouter.route('/tenant-manager/services/module').put(updateModuleAdminServices);
/* admin or tenant-manager create and get ,update apis end */



/* admin or tenant-manager create and get , default data start */
testRouter
    .route('/tenant-manager/sell/sale_invoice_data/get-invoice')
    .get(getDefaulterData);
testRouter
    .route('/tenant-manager/sell/sale_invoice_data/create-invoice')
    .post(createDefaulterData);
/* admin or tenant-manager create and get , default data end */



/* admin or tenant-manager create and get , default structure start */
testRouter
  .route('/tenant-manager/sell/sale_invoice/get-invoice/structure')
  .get(getDefaulterServices);
testRouter
  .route('/tenant-manager/sell/sale_invoice/create-invoice/structure')
  .post(createDefaulterServices);
testRouter
  .route('/tenant-manager/purchase/purchase_invoice/get-invoice/structure')
  .get(getDefaulterServices);
testRouter
  .route('/tenant-manager/purchase/purchase_invoice/create-invoice/structure')
  .post(createDefaulterServices);
testRouter
  .route('/tenant-manager/customer/customer/get-customer/structure')
  .get(getDefaulterServices);
testRouter
  .route('/tenant-manager/customer/customer/create-customer/structure')
  .post(createDefaulterServices);
testRouter
  .route('/tenant-manager/employee/employee/get-employee/structure')
  .get(getDefaulterServices);
testRouter
  .route('/tenant-manager/employee/employee/create-employee/structure')
  .post(createDefaulterServices);
/* admin or tenant-manager create and get , default structure end */

module.exports = testRouter;
