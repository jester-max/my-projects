const express = require('express');
const {createInvocieStructure, getInvocieStructure, updateInvocieStructure} = require("../../controllers/module-structure/sale.invoiceStructure.controller");

const {getQuotationStructure, createQuotationStructure, updateQuotationStructure} = require("../../controllers/module-structure/purchase.quotationStructure.controller");
const {getPurchaseStructure, createPurchaseStructure, updatePurchaseStructure} = require("../../controllers/module-structure/purchase.invoiceStructure.controller");



const purchaseRouter = express.Router();

purchaseRouter.route('/tenant/purchase/get-invoice/structure/:tenantID').
get(getPurchaseStructure)

purchaseRouter.route('/tenant/purchase/create-invoice/structure/:tenantID').
post(createPurchaseStructure)

purchaseRouter.route('/tenant/purchase/update-invoice/structure/:tenantID').
put(updatePurchaseStructure)

purchaseRouter.route('/tenant/purchase/get-quotation/structure/:tenantID').
get(getQuotationStructure)

purchaseRouter.route('/tenant/purchase/create-quotation/structure/:tenantID').
post(createQuotationStructure)

purchaseRouter.route('/tenant/purchase/update-quotation/structure/:tenantID').
put(updateQuotationStructure)











module.exports = purchaseRouter;




























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

/*purchaseRouter.route('/tenant/create-invoice/structure/:tenantID').post(async function (req, res) {
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



/*purchaseRouter.route('/tenant/get-invoice/structure/:tenantID').get(async function (req, res) {
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


/*module.exports = purchaseRouter;*/












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
