const express = require('express');
const {getEmployeeStructure, createEmployeeStructure, updateEmployeeStructure} = require("../../controllers/module-structure/employee.employeeStructure.controller");





const employeeRouter = express.Router();

employeeRouter.route('/tenant/employee/get-employee/structure/:tenantID').
get(getEmployeeStructure)

employeeRouter.route('/tenant/employee/create-employee/structure/:tenantID').
post(createEmployeeStructure)

employeeRouter.route('/tenant/employee/update-employee/structure/:tenantID').
put(updateEmployeeStructure)


module.exports = employeeRouter;
