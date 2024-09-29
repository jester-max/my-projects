const express = require('express');

const {
  getTenantData,
  updateTenantConfiStatus,
  sendAndCheckVerificationCode,
  updateTenantData,
  loginTenant,
  saleRendering,
} = require('../../controllers/tenant-user/create.tenant.controller');
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
  validateContactInfo,
} = require('../../validators/auth.validator');
const { verifyJWT } = require('../../middlewares/auth.middleware');

const routerAdmin = express.Router();

routerAdmin.route('/tenant-user/test/ejs').get(saleRendering);

routerAdmin.route('/tenant-user/:tenantID').get(getTenantData);
routerAdmin.route('/tenant-user/:tenantID').put(verifyJWT, updateTenantConfiStatus);
routerAdmin
  .route('/tenant-user/updatedata/:accountname')
  .put(validateContactInfo, isRequestValidated, updateTenantData);
routerAdmin
  .route('/sendmailfortenant')
  .post(
    validateSignupRequest,
    isRequestValidated,
    sendAndCheckVerificationCode
  );
routerAdmin
  .route('/tenant-user/login')
  .post(validateSigninRequest, isRequestValidated, loginTenant);

module.exports = routerAdmin;

