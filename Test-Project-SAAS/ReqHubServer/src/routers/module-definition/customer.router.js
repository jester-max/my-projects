const express = require('express');
const {getCustomerStructure, createCustomerStructure, updateCustomerStructure} = require("../../controllers/customer/customer.structure.controller");




const customerRouter = express.Router();

customerRouter.route('/tenant/customer/get-customer/structure/:tenantID').
get(getCustomerStructure)

customerRouter.route('/tenant/customer/create-customer/structure/:tenantID').
post(createCustomerStructure)

customerRouter.route('/tenant/customer/update-customer/structure/:tenantID').
put(updateCustomerStructure)

module.exports = customerRouter;

