const express = require('express');
const {addUser, getUser} = require("../../controllers/testing/test-user.controller");





const testRouter = express.Router();

testRouter.route('/test/user').
get(getUser)

testRouter.route('/test/user').
post(addUser)



module.exports = testRouter;

