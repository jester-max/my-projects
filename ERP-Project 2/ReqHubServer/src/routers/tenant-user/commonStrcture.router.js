const express = require('express');
const {
  getCustomerStructure,
  createCustomerStructure,
  updateCustomerStructure
} = require('../../controllers/tenant-user/common.Structure.controller');
const { verifyJWT } = require('../../middlewares/auth.middleware');
const {
  validateStructureFields,
} = require('../../validators/structure.fieldsWith.validator');
const {
  getTenantServices,createTenantServices,updateModuleTenantServices
} = require('../../controllers/tenant-user/tenant.services.controller');

const commonStructureRouter = express.Router();




commonStructureRouter
  .route('/tenant-user/validate/custom/fields/:tenantID')
  .post(verifyJWT, validateStructureFields);



commonStructureRouter
  .route('/tenant-user/customer/customer/get-customer/structure/:tenantID')
  .get(verifyJWT, getCustomerStructure);
commonStructureRouter
  .route('/tenant-user/customer/customer/create-customer/structure/:tenantID')
  .post(verifyJWT, createCustomerStructure);
commonStructureRouter
  .route('/tenant-user/customer/customer/update-customer/structure')
  .put(verifyJWT, updateCustomerStructure);

commonStructureRouter
  .route('/tenant-user/employee/employee/get-employee/structure/:tenantID')
  .get(verifyJWT, getCustomerStructure);
commonStructureRouter
  .route('/tenant-user/employee/employee/create-employee/structure/:tenantID')
  .post(verifyJWT, createCustomerStructure);
commonStructureRouter
  .route('/tenant-user/employee/employee/update-employee/structure/:tenantID')
  .put(verifyJWT, updateCustomerStructure);

commonStructureRouter
  .route('/tenant-user/purchase/invoice/get-invoice/structure/:tenantID')
  .get(verifyJWT, getCustomerStructure);
commonStructureRouter
  .route('/tenant-user/purchase/invoice/create-invoice/structure/:tenantID')
  .post(verifyJWT, createCustomerStructure);
commonStructureRouter
  .route('/tenant-user/purchase/invoice/update-invoice/structure/:tenantID')
  .put(verifyJWT, updateCustomerStructure);
commonStructureRouter
  .route(
    '/tenant-user/purchase/purchase_quotation/get-quotation/structure/:tenantID'
  )
  .get(verifyJWT, getCustomerStructure);
commonStructureRouter
  .route(
    '/tenant-user/purchase/purchase_quotation/create-quotation/structure/:tenantID'
  )
  .post(verifyJWT, createCustomerStructure);
commonStructureRouter
  .route(
    '/tenant-user/purchase/purchase_quotation/update-quotation/structure/:tenantID'
  )
  .put(verifyJWT, updateCustomerStructure);

commonStructureRouter
  .route('/tenant-user/sale/sale_invoice/get-invoice/structure/:tenantID')
  .get(verifyJWT, getCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_invoice/create-invoice/structure/:tenantID')
  .post(verifyJWT, createCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_invoice/update-invoice/structure/:tenantID')
  .put(verifyJWT, updateCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_quotation/get-quotation/structure/:tenantID')
  .get(verifyJWT, getCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_quotation/create-quotation/structure/:tenantID')
  .post(verifyJWT, createCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_quotation/update-quotation/structure/:tenantID')
  .put(verifyJWT, updateCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_transport/get-transport/structure/:tenantID')
  .get(verifyJWT, getCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_transport/create-transport/structure/:tenantID')
  .post(verifyJWT, createCustomerStructure);
commonStructureRouter
  .route('/tenant-user/sale/sale_transport/update-transport/structure/:tenantID')
  .put(verifyJWT, updateCustomerStructure);



commonStructureRouter
  .route('/tenant-user/services/structure/:tenantID')
  .post(verifyJWT, createTenantServices);
commonStructureRouter
  .route('/tenant-user/services/structure/:tenantID')
  .get(verifyJWT, getTenantServices);
commonStructureRouter
  .route('/tenant-user/services/structure/:tenantID')
  .put(verifyJWT, updateModuleTenantServices);

module.exports = commonStructureRouter;
