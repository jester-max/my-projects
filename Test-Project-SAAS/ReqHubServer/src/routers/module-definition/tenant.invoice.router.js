const express = require('express');
const { getInvoiceModel, getTenantModel} = require('../../databases/tenant.mongodb.connection');

const invoiceRouter = express.Router();



// Function to create a schema based on the provided array
function createSchemaFromArray(array) {
  const schema = {};

  array.forEach(({ key, type, isArray, value }) => {
    if (type === 'object') {
      // Recursively create a schema for the nested object
      schema[key] = createSchemaFromArray(value);
    } else if (type === 'array' && Array.isArray(value)) {
      // If it's an array and the 'value' property is an array, create an array of objects
      schema[key] = [createSchemaFromArray(value)];
    } else {
      schema[key] = type;
    }
  });

  return schema;
}



// function createDynamicSchema(fields) {
//   const dynamicSchemaDefinition = {};
//
//   fields.forEach(field => {
//     dynamicSchemaDefinition[field.keyName] = {
//       type: field.type,
//       default: field.defaultValue,
//     };
//   });
//
//
//
//   return dynamicSchemaDefinition;
// }





//  http://192.168.1.9:7070/add-invoice/test
invoiceRouter.
route('/tenant/create-invoice/structure/:tenantID').
post(async function (req, res) {
  try {

// const formData = [
//   { key: 'invNum', type: 'string', isArray: false },
//   { key: 'invDate', type: 'string', isArray: false },
//   { key: 'buyerOrder', type: 'string', isArray: false },
//   {
//     key: 'proDetails2',
//     type: 'array',
//     isArray: true,
//     value: [
//       { key: 'proName', type: 'string', isArray: false },
//       { key: 'proHsnCode', type: 'number', isArray: false },
//       // ... other properties inside proDetails2 array
//     ]
//   },
//   {
//     key: 'customerInfo',
//     type: 'object',
//     isArray: false,
//     value: [
//       { key: 'custName', type: 'string', isArray: false },
//       { key: 'custGST', type: 'string', isArray: false },
//       { key: 'custName1', type: 'string', isArray: false },
//       { key: 'custGST2', type: 'string', isArray: false },
//       // ... other properties inside customerInfo object
//     ]
//   }
// ];

    console.log(req.body)


    const generatedSchema = await createSchemaFromArray(req.body);



    // const tenantModel = await getTenantModel(req.params.tenantID);
    //
    // const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })
    //
    // if(tenant){
    //
    //   const invoiceModel = await getInvoiceModel(tenant.tenantID);
    //
    //   const saveObj = await invoiceModel.create(generatedSchema);
    //
    //   res.json({
    //     Status: "SUCCESS",
    //     language: "en_US",
    //     StatusCode:res.StatusCode,
    //     data: saveObj,
    //     error:null
    //   })
    // }else{
    //   res.json({
    //     Status: "PENDING",
    //     language: "en_US",
    //     StatusCode:res.StatusCode,
    //     data: null,
    //     error:null,
    //     message:'TENANT ID IS NOT CORRECT'
    //   })
    // }
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



invoiceRouter
    .route('/tenant/get-invoice/structure/:tenantID')
    .get(async function (req, res) {
      try {

        const tenantModel = await getTenantModel(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

          const invoiceModel = await getInvoiceModel(tenant.tenantID);

          const getObj = await invoiceModel.findOne({}).sort({_id:-1}).limit(1)

          res.json({
            Status: "SUCCESS",
            language: "en_US",
            StatusCode:res.StatusCode,
            data: getObj,
            error:null
          })
        }else{
          res.json({
            Status: "PENDING",
            language: "en_US",
            StatusCode:res.StatusCode,
            data: null,
            error:null,
            message:'TENANT ID IS NOT CORRECT'
          })
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


module.exports = invoiceRouter;












// const formData = [
//   { key: 'invNum', type: 'string', isArray: false },
//   { key: 'invDate', type: 'string', isArray: false },
//   { key: 'buyerOrder', type: 'string', isArray: false },
//   {
//     key: 'proDetails2',
//     type: 'array',
//     isArray: true,
//     value: [
//       { key: 'proName', type: 'string', isArray: false },
//       { key: 'proHsnCode', type: 'number', isArray: false },
//       // ... other properties inside proDetails2 array
//     ]
//   },
//   {
//     key: 'customerInfo',
//     type: 'object',
//     isArray: false,
//     value: [
//       { key: 'custName', type: 'string', isArray: false },
//       { key: 'custGST', type: 'string', isArray: false },
//       { key: 'custName1', type: 'string', isArray: false },
//       { key: 'custGST2', type: 'string', isArray: false },
//       // ... other properties inside customerInfo object
//     ]
//   }
// ];

// const generatedSchema = createSchemaFromArray(formData);



// Function to create a schema based on the provided array
// function createSchemaFromArray(array) {
//   const schema = {};
//
//   array.forEach(({ key, type, isArray, value }) => {
//     if (type === 'object') {
//       // Recursively create a schema for the nested object
//       schema[key] = createSchemaFromArray(value);
//     } else if (type === 'array') {
//       // If it's an array, create an array of objects
//       schema[key] = [createSchemaFromArray(value)[0]];
//     } else {
//       schema[key] = type;
//     }
//   });
//
//   return schema;
// }
