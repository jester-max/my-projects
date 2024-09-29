const express = require('express');
const {createInvocieStructure, getInvocieStructure, updateInvocieStructure} = require("../../controllers/sale/invoice.structure.controller");
const {schemaValidated} = require("../../validators/invoice.data.validator");
const {getquotationStructure, createQuotationStructure, updateQuotationStructure} = require("../../controllers/sale/quotation.structure.controller");
const {getTransportStructure, createTransportStructure, updateTransportStructure} = require("../../controllers/sale/transport.structure.controller");


const invoiceRouter = express.Router();

invoiceRouter.route('/tenant/sale/get-invoice/structure/:tenantID').
get(getInvocieStructure)

invoiceRouter.route('/tenant/sale/create-invoice/structure/:tenantID').
post(createInvocieStructure)

invoiceRouter.route('/tenant/sale/update-invoice/structure/:tenantID').
put(updateInvocieStructure)


invoiceRouter.route('/tenant/sale/get-quotation/structure/:tenantID').
get(getquotationStructure)

invoiceRouter.route('/tenant/sale/create-quotation/structure/:tenantID').
post(createQuotationStructure)

invoiceRouter.route('/tenant/sale/update-quotation/structure/:tenantID').
put(updateQuotationStructure)


invoiceRouter.route('/tenant/sale/get-transport/structure/:tenantID').
get(getTransportStructure)

invoiceRouter.route('/tenant/sale/create-transport/structure/:tenantID').
post(createTransportStructure)

invoiceRouter.route('/tenant/sale/update-transport/structure/:tenantID').
put(updateTransportStructure)









module.exports = invoiceRouter;




























/* const { getInvoiceModel, getTenantModel} = require('../../databases/tenant.mongodb.connection');*/

// Function to create a schema based on the provided array
// function createSchemaFromArray(array) {
//   const schema = {};
//
//   array.forEach(({ key, type, isArray, value }) => {
//     if (type === 'object') {
//       // Recursively create a schema for the nested object
//       schema[key] = createSchemaFromArray(value);
//     } else if (type === 'array' && Array.isArray(value)) {
//       // If it's an array and the 'value' property is an array, create an array of objects
//       schema[key] = [createSchemaFromArray(value)];
//     } else {
//       schema[key] = type;
//     }
//   });
//
//   return schema;
// }


// Function to create a schema based on the provided array
/*function generateSchema(properties) {

  const schemaObject = {};

  properties.forEach((property) => {
    const {
      key,
      type,
      isArray,
      value,
      ...otherProperties
    } = property;

    if (isArray && value) {

        schemaObject[key] = {
        type: 'array',
        items: generateSchema(value),
        // ...otherProperties,
      };
    } else if (!isArray && value) {

        schemaObject[key] = {
        type: 'object',
        properties: generateSchema(value),
        // ...otherProperties,
      };
    } else {

        schemaObject[key] = {
        type,
        ...otherProperties,
      };
    }
  });

  return schemaObject;
}*/


//  http://192.168.1.9:7070/add-invoice/test

/*invoiceRouter.route('/tenant/create-invoice/structure/:tenantID').post(async function (req, res) {
  try {

    const formData = req.body

    /!*const formData = [
  { key: 'invNum', type: 'string', isArray: false, "primarykey":false,
    "fkey":false,
    "ckey":false,
    "uppercase": true,
    "default": "NA",
    "required":true,
    "enum":true,
    "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"] },
  { key: 'invDate', type: 'string', isArray: false, "primarykey":false,
    "fkey":false,
    "ckey":false,
    "uppercase": true,
    "default": "NA",
    "required":true,
    "enum":true,
    "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"] },
  { key: 'buyerOrder', type: 'string', isArray: false, "primarykey":false,
    "fkey":false,
    "ckey":false,
    "uppercase": true,
    "default": "NA",
    "required":true,
    "enum":true,
    "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"] },
  {
    key: 'proDetails2',
    type: 'array',
    isArray: true,
    value: [
      // {},
      { key: 'proName', type: 'string', isArray: false, "primarykey":false,
        "fkey":false,
        "ckey":false,
        "uppercase": true,
        "default": "NA",
        "required":true,
        "enum":true,
        "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"] },
      { key: 'proHsnCode', type: 'number', isArray: false , "primarykey":false,
        "fkey":false,
        "ckey":false,
        "uppercase": true,
        "default": "NA",
        "required":true,
        "enum":true,
        "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"]},
      // ... other properties inside proDetails2 array
    ]
  },
  {
    key: 'customerInfo',
    type: 'object',
    isArray: false,
    value: [
      {},
      { key: 'custName', type: 'string', isArray: false, "primarykey":false,
        "fkey":false,
        "ckey":false,
        "uppercase": true,
        "default": "NA",
        "required":true,
        "enum":true,
        "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"] },
      { key: 'custGST', type: 'string', isArray: false, "primarykey":false,
        "fkey":false,
        "ckey":false,
        "uppercase": true,
        "default": "NA",
        "required":true,
        "enum":true,
        "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"] },
      { key: 'custName1', type: 'string', isArray: false, "primarykey":false,
        "fkey":false,
        "ckey":false,
        "uppercase": true,
        "default": "NA",
        "required":true,
        "enum":true,
        "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"] },
      { key: 'custGST2', type: 'string', isArray: false , "primarykey":false,
        "fkey":false,
        "ckey":false,
        "uppercase": true,
        "default": "NA",
        "required":true,
        "enum":true,
        "enumValues": ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"]},
      // ... other properties inside customerInfo object
    ]
  }
];*!/

    const generatedSchema = await generateSchema(formData);

    const tenantModel = await getTenantModel(req.params.tenantID);

    const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

    if(tenant){

      const invoiceModel = await getInvoiceModel(tenant.tenantID);

      const saveObj = await invoiceModel.create(generatedSchema);


      res.json({
        Status: "SUCCESS",
        language: "en_US",
        StatusCode:res.StatusCode,
        data: null,
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
    console.log(err)
    res.json({
      Status: 'ERROR',
      language: 'en_US',
      StatusCode: res.StatusCode,
      data: null,
      error: err.message,
    });
  }
});*/



/*invoiceRouter.route('/tenant/get-invoice/structure/:tenantID').get(async function (req, res) {
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
    });*/


/*module.exports = invoiceRouter;*/












/*const formData = [
  { key: 'invNum', type: 'string', isArray: false },
  { key: 'invDate', type: 'string', isArray: false },
  { key: 'buyerOrder', type: 'string', isArray: false },
  {
    key: 'proDetails2',
    type: 'array',
    isArray: true,
    value: [
      { key: 'proName', type: 'string', isArray: false },
      { key: 'proHsnCode', type: 'number', isArray: false },
      // ... other properties inside proDetails2 array
    ]
  },
  {
    key: 'customerInfo',
    type: 'object',
    isArray: false,
    value: [
      { key: 'custName', type: 'string', isArray: false },
      { key: 'custGST', type: 'string', isArray: false },
      { key: 'custName1', type: 'string', isArray: false },
      { key: 'custGST2', type: 'string', isArray: false },
      // ... other properties inside customerInfo object
    ]
  }
];*/

// const generatedSchema = createSchemaFromArray(formData);

// Function to create a schema based on the provided array
/* function createSchemaFromArray(array) {
  const schema = {};

  array.forEach(({ key, type, isArray, value }) => {
    if (type === 'object') {
      // Recursively create a schema for the nested object
      schema[key] = createSchemaFromArray(value);
    } else if (type === 'array') {
      // If it's an array, create an array of objects
      schema[key] = [createSchemaFromArray(value)[0]];
    } else {
      schema[key] = type;
    }
  });

  return schema;
} */
