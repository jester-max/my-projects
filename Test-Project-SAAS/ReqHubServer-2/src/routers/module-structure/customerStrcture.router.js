const express = require('express');
const {getCustomerStructure, createCustomerStructure, updateCustomerStructure} = require("../../controllers/module-structure/customer.customerStructure.controller");
const {verifyJWT} = require("../../middlewares/auth.middleware");




const customerRouter = express.Router();

customerRouter.route('/tenant/customer/get-customer/structure/:tenantID').
get(verifyJWT,getCustomerStructure)

customerRouter.route('/tenant/customer/create-customer/structure/:tenantID').
post(verifyJWT,createCustomerStructure)

customerRouter.route('/tenant/customer/update-customer/structure').
put(verifyJWT,updateCustomerStructure)

module.exports = customerRouter;

