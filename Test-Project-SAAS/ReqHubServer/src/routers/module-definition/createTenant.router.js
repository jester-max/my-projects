const express = require('express');


const {createTeantData, getTenantData, updateTenantData} = require("../../controllers/tenant/create.tenant.controller");

const routerAdmin = express.Router();



routerAdmin.route('/tenant').post(createTeantData)
routerAdmin.route('/tenant/:tenantid').get(getTenantData)
routerAdmin.route('/tenant/:tenantid').put(updateTenantData)

module.exports = routerAdmin;

















/* const { getTenantModel } = require('../../databases/tenant.mongodb.connection');*/

/*
routerAdmin.route('/tenant').post(async (req, res) => {
  try {

    const { tenantID, tenantName, tenantDate } = req.body;

    const tenantModel = await getTenantModel(tenantID);

   const tenantExist = await tenantModel.findOne({tenantID:tenantID})

   if(tenantExist){
       return   res.json({
           Status: 'SUCCESS',
           language: 'en_US',
           StatusCode: res.StatusCode,
           data: tenantExist,
           error: null,
         });
    }else{

     const tenant = new tenantModel({
       tenantID,
       tenantName,
       tenantDate,
       tenantDatabase: tenantID,
     });

     const saveObj = await tenant.save();

     res.json({
       Status: 'SUCCESS',
       language: 'en_US',
       StatusCode: res.StatusCode,
       data: saveObj,
       error: null,
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

 */

/*
routerAdmin.route('/tenant').get(async function (req, res) {
  try {
    const tenantModel = await getTenantModel();

    const getObj = await tenantModel.find();

    res.json({
      Status: 'SUCCESS',
      language: 'en_US',
      StatusCode: res.StatusCode,
      data: getObj,
      error: null,
    });
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
*/

/*module.exports = routerAdmin;*/
