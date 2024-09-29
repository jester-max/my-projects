const {getMongodbModels, getTenantModelMongodb,} = require('../../databases/tenant.mongodb.connection');
const { getPostgresDB } = require('../../databases/tenant.postgredb');
const { validateSchema } = require('../../validators/common.validator');
const { generateSchema } = require('../../common/generateMongodbSchema.common');
const { asyncHandler } = require('../../utilities/asyncHandler');
const { ApiResponse } = require('../../utilities/ApiResponse');
const {createTableWithKeys, executeQueries,} = require('../../common/postgresDBQuery.common');
const { ApiError } = require('../../utilities/ApiError');
const lodash = require('lodash');
const util = require('util');

const createTenantServices = asyncHandler(async function (req, res) {

  const serviceNames = req.body.services;

  let modules = [];

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[2];

  /* Fetch the MongoDB model for the tenant-user-user */
  const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

  /* Find the tenant-user-user in MongoDB based on the username */
  const tenant = await tenantModel.findOne({ email: req.tenant.email });

  /* Check if the tenant-user-user exists */
  if (tenant) {
    /* Fetch the MongoDB model for the service */
    const getMongodbModel = await getMongodbModels(
        tenant.accountName,
        subModule
    );

    await serviceNames.forEach(async (serviceName) => {
      const tenantServiceInstance = new getMongodbModel({
        serviceName: serviceName,
        modules: modules,
      });

      await tenantServiceInstance.save();
    });


    /* Return a JSON response with a success message */
    return res.json(new ApiResponse(200, null));
  } else {
    /* Return a JSON response indicating that the tenant-user-user ID is not correct */
    return res.json(new ApiError(400, 'TENANT email IS NOT CORRECT', 'email'));
  }
});

const updateTenantModule = asyncHandler(async function (req, res) {

  console.log(req.body)

      /* Extract the common part of the URL (assuming it contains the schema name)*/
      const subModule = req.originalUrl.split('/')[2];

      /* Fetch the MongoDB model for the tenant-user-user */
      const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

      /* Find the tenant-user-user in MongoDB based on the username */
      const tenant = await tenantModel.findOne({ email: req.tenant.email });

      /* Check if the tenant-user-user exists */
      if (tenant) {
        /* Fetch the MongoDB model for the service */
        const getMongodbModel = await getMongodbModels(
            tenant.accountName,
            subModule
        );

        let getTenantServices = await getMongodbModel.findOne({
          serviceName: req.body.serviceName,
        });

        if (getTenantServices === null) {

          return res.json(new ApiError(400, 'SERVICE NOT FOUND ', 'serviceName'));
        }
        if (req.body.modules.length === 0) {

          return res.json(new ApiError(400, 'CREATE AT LEAT ONE MODULE', 'modules'));
        }

        const updateData = await getMongodbModel.findOneAndUpdate(
            { serviceName: req.body.serviceName },
            { $set: { modules: req.body.modules } }, // Use $set to update specific fields
            { new: true } // Return the updated document
        );

        console.log(updateData);

        /* Return a JSON response with a success message */
        return res.json(new ApiResponse(200, updateData));

      } else {
        /* Return a JSON response indicating that the tenant-user-user ID is not correct */
        return res.json(new ApiError(400, 'TENANT email IS NOT CORRECT', 'email'));
      }
});

const createCustomerStructure = asyncHandler(async function (req, res) {

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[3];

  /* Array to store table creation details*/
  const creatingTableArray = [];

  /* Extract request body data */
  const requestData = req.body;

  // const requestData = [
  //   {
  //     key: 'invoice_id',
  //     type: 'string',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: true,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 'text',
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: true,
  //     min: 0,
  //     max: 0,
  //     sign: false,
  //     unsign: false,
  //     float: false,
  //     int: false,
  //     floor: false,
  //     celling: false,
  //     steps: 0,
  //     indexes: true,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: 'BTREE',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation: '',
  //     arrayWithCalculation: '',
  //   },
  //   {
  //     key: 'invoicenumber',
  //     type: 'number',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 0,
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 1,
  //     max: 1000,
  //     sign: false,
  //     unsign: false,
  //     float: false,
  //     int: false,
  //     floor: false,
  //     celling: false,
  //     steps: 0,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation: '',
  //     arrayWithCalculation: '',
  //   },
  //   {
  //     key: 'invoicedate',
  //     type: 'date',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: '2024-01-09',
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 0,
  //     max: 0,
  //     sign: false,
  //     unsign: false,
  //     float: false,
  //     int: false,
  //     floor: false,
  //     celling: false,
  //     steps: 0,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: 'utcDate',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation: '',
  //     arrayWithCalculation: '',
  //   },
  //   {
  //     key: 'productdetails',
  //     value: [
  //       {
  //         key: 'productname',
  //         type: 'string',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 'text',
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 0,
  //         max: 0,
  //         sign: false,
  //         unsign: false,
  //         float: false,
  //         int: false,
  //         floor: false,
  //         celling: false,
  //         steps: 0,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation: '',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'productquantity',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 0,
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 1,
  //         max: 1000,
  //         sign: false,
  //         unsign: false,
  //         float: false,
  //         int: false,
  //         floor: false,
  //         celling: false,
  //         steps: 0,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation: '',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'productrate',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 0,
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 1,
  //         max: 10000,
  //         sign: false,
  //         unsign: false,
  //         float: false,
  //         int: false,
  //         floor: false,
  //         celling: false,
  //         steps: 0,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation: '',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'productdiscount',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 0,
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 1,
  //         max: 10000,
  //         sign: false,
  //         unsign: false,
  //         float: false,
  //         int: false,
  //         floor: false,
  //         celling: false,
  //         steps: 0,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation: '',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'productdiscountamount',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 0,
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 1,
  //         max: 10000,
  //         sign: false,
  //         unsign: false,
  //         float: true,
  //         int: false,
  //         floor: false,
  //         celling: true,
  //         steps: 2,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation:
  //           '(productdetails.productquantity * productdetails.productrate) * productdetails.productdiscount / 100',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'productamount',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 'xyz@gmail.com',
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 1,
  //         max: 10000,
  //         sign: false,
  //         unsign: false,
  //         float: true,
  //         int: false,
  //         floor: false,
  //         celling: true,
  //         steps: 2,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation:
  //           'productdetails.productquantity * productdetails.productrate-((productdetails.productquantity * productdetails.productrate)*productdetails.productdiscount/100)',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'CGST',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 0,
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 1,
  //         max: 1000,
  //         sign: false,
  //         unsign: false,
  //         float: false,
  //         int: false,
  //         floor: false,
  //         celling: false,
  //         steps: 0,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation: '',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'SGST',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 0,
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 1,
  //         max: 10000,
  //         sign: false,
  //         unsign: false,
  //         float: false,
  //         int: false,
  //         floor: false,
  //         celling: false,
  //         steps: 0,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation: '',
  //         arrayWithCalculation: '',
  //       },
  //       {
  //         key: 'IGST',
  //         type: 'number',
  //         relation: 'array',
  //         belong: 'New Array',
  //         isArray: false,
  //         primarykey: false,
  //         fkey: false,
  //         ckey: false,
  //         uppercase: false,
  //         default: 0,
  //         required: true,
  //         enum: false,
  //         enumValues: [
  //           'BANK OF INDIA',
  //           'STATE BANK',
  //           'PUNJAB BANK',
  //           'ICICI BANK',
  //         ],
  //         minlength: '1',
  //         maxlength: '100',
  //         boolean: true,
  //         autoIncrement: false,
  //         lowercase: false,
  //         trim: false,
  //         unique: false,
  //         min: 0,
  //         max: 10000,
  //         sign: false,
  //         unsign: false,
  //         float: false,
  //         int: false,
  //         floor: false,
  //         celling: false,
  //         steps: 0,
  //         indexes: false,
  //         hasFeilds: 'new',
  //         dateToFormat: '',
  //         indexType: '',
  //         moduleName: '',
  //         subModuleName: '',
  //         primaryKey2: '',
  //         operation: '',
  //         calculation: '',
  //         arrayWithCalculation: '',
  //       },
  //     ],
  //     type: 'array',
  //     relation: 'array',
  //     belong: 'New Array',
  //     isArray: true,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 'NA',
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 0,
  //     max: 0,
  //     sign: false,
  //     unsign: false,
  //     float: false,
  //     int: false,
  //     floor: false,
  //     celling: false,
  //     steps: 0,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation: '',
  //     arrayWithCalculation: '',
  //   },
  //   {
  //     key: 'totaldiscountamount',
  //     type: 'number',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 0,
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 1,
  //     max: 1000,
  //     sign: false,
  //     unsign: false,
  //     float: true,
  //     int: false,
  //     floor: false,
  //     celling: true,
  //     steps: 2,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation:
  //       'productdetails.reduce((total, product) => total + (product.productquantity * product.productrate * product.productdiscount / 100), 0)',
  //     arrayWithCalculation: 'productdetails',
  //   },
  //   {
  //     key: 'totalCGST',
  //     type: 'number',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 0,
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 1,
  //     max: 1000,
  //     sign: false,
  //     unsign: false,
  //     float: true,
  //     int: false,
  //     floor: false,
  //     celling: true,
  //     steps: 2,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation:
  //       'productdetails.reduce((total, product) => total + (((product.productquantity * product.productrate)-product.productdiscount) * product.CGST / 100), 0)',
  //     arrayWithCalculation: 'productdetails',
  //   },
  //   {
  //     key: 'totalSGST',
  //     type: 'number',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 0,
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 1,
  //     max: 1000,
  //     sign: false,
  //     unsign: false,
  //     float: true,
  //     int: false,
  //     floor: false,
  //     celling: true,
  //     steps: 2,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation:
  //       'productdetails.reduce((total, product) => total + (((product.productquantity * product.productrate)-product.productdiscount) * product.SGST / 100), 0)',
  //     arrayWithCalculation: 'productdetails',
  //   },
  //   {
  //     key: 'totalIGST',
  //     type: 'number',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 0,
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 0,
  //     max: 1000,
  //     sign: false,
  //     unsign: false,
  //     float: true,
  //     int: false,
  //     floor: false,
  //     celling: true,
  //     steps: 2,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation:
  //       'productdetails.reduce((total, product) => total + (((product.productquantity * product.productrate)-product.productdiscount) * product.IGST / 100), 0)',
  //     arrayWithCalculation: 'productdetails',
  //   },
  //   {
  //     key: 'totalproductamount',
  //     type: 'number',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 0,
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 1,
  //     max: 1000,
  //     sign: false,
  //     unsign: false,
  //     float: true,
  //     int: false,
  //     floor: false,
  //     celling: true,
  //     steps: 2,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation:
  //       'productdetails.reduce((total, product) => total + product.productamount, 0)',
  //     arrayWithCalculation: 'productdetails',
  //   },
  //   {
  //     key: 'totalinvoiceamount',
  //     type: 'number',
  //     relation: 'no',
  //     isArray: false,
  //     primarykey: false,
  //     fkey: false,
  //     ckey: false,
  //     uppercase: false,
  //     default: 0,
  //     required: true,
  //     enum: false,
  //     enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
  //     minlength: '1',
  //     maxlength: '100',
  //     boolean: true,
  //     autoIncrement: false,
  //     lowercase: false,
  //     trim: false,
  //     unique: false,
  //     min: 1,
  //     max: 1000,
  //     sign: false,
  //     unsign: false,
  //     float: true,
  //     int: false,
  //     floor: false,
  //     celling: true,
  //     steps: 2,
  //     indexes: false,
  //     hasFeilds: 'new',
  //     dateToFormat: '',
  //     indexType: '',
  //     moduleName: '',
  //     subModuleName: '',
  //     primaryKey2: '',
  //     operation: '',
  //     calculation:
  //       'productdetails.reduce((total, product) => total + product.productamount, 0) + productdetails.reduce((total, product) => total + (((product.productquantity * product.productrate)-product.productdiscount) * product.SGST / 100), 0) + productdetails.reduce((total, product) => total + (((product.productquantity * product.productrate)-product.productdiscount) * product.CGST / 100), 0) + productdetails.reduce((total, product) => total + (((product.productquantity * product.productrate)-product.productdiscount) * product.IGST / 100), 0)',
  //     arrayWithCalculation: 'productdetails',
  //   },
  // ];

  /* Generate schema based on the request data */
  const generatedSchema = await generateSchema(requestData);

  // Create a deep copy of the original object using lodash because object is copy
  let copiedGeneratedSchema = lodash.cloneDeep(generatedSchema);

  /* Validate the generated schema */
  const validSchemaData = await validateSchema(generatedSchema);

  /* Get the tenant-user-user ID from the request parameters */
  const tenantID = req.tenant.accountName;

  /* Fetch the MongoDB model for the tenant-user-user */
  const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

  /* Find the tenant-user-user in MongoDB based on the username */
  const tenant = await tenantModel.findOne({ email: req.tenant.email });

  /* Check if the tenant-user-user exists */
  if (tenant) {
    /* Fetch the MongoDB model for the service */
    const getMongodbModel = await getMongodbModels(
      tenant.accountName,
      subModule
    );

    /* Connect to the PostgreSQL database for the specific tenant-user-user */
    const getPostgresDBRef = await getPostgresDB(tenantID);

    /* Dynamically create schema */
    const schemaName = `${tenantID}_${commonURLPart}`;

    await getPostgresDBRef.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);

    /* Get the keys from the generated schema */
    const keys = Object.keys(generatedSchema);

    /* Calculate the length of the object */
    const objectLength = keys.length;

    /* Generate table creation queries */
    const generatingTablequeries = await createTableWithKeys(
        tenantID,
      subModule,
      subModule,
      schemaName,
      generatedSchema,
      creatingTableArray,
      objectLength
    );

    console.log(generatingTablequeries)

    /* Execute table creation queries */
    await executeQueries(generatingTablequeries, getPostgresDBRef, res);

    /* Use the MongoDB customerModel to create a new document with the generatedSchema */
    await getMongodbModel.create(copiedGeneratedSchema);

    /* Return a JSON response with a success message */
    return res.json(new ApiResponse(200, null));
  } else {
    /* Return a JSON response indicating that the tenant-user-user ID is not correct */
    return res.json(new ApiError(400, 'TENANT email IS NOT CORRECT', 'email'));
  }
});

const getCustomerStructure = asyncHandler(async function (req, res) {
  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[3];

  /*  Fetch the MongoDB model for the tenant-user-user*/
  const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

  /* Find the tenant-user-user in MongoDB based on the email*/
  const tenant = await tenantModel.findOne({ email: req.tenant.email });

  /* Check if the tenant-user-user exists*/
  if (tenant) {
    /* Fetch the MongoDB model for the service */
    const getMongodbModel = await getMongodbModels(
      tenant.accountName,
      subModule
    );

    /* Fetch the latest document from the customer collection*/
    const getObj = await getMongodbModel.findOne({}).sort({ _id: -1 }).limit(1);

    /* Fetch all documents from the customer collection*/
    const getArray = await getMongodbModel.find();

    /* Return a JSON response with the latest document and the total number of documents*/
    return res.json(new ApiResponse(200, getObj, getArray.length));
  } else {
    /*  Return a JSON response indicating that the tenant-user-user ID is not correct*/
    return res.json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
  }
});

const updateCustomerStructure = asyncHandler(async function (req, res) {
  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract form data from the request body*/
  const formData = req.body;

  /*  Generate a schema based on the form data*/
  const generatedSchema = await generateSchema(formData);

  /*Validate the generated schema data*/
  const validSchemaData = await validateSchema(generatedSchema);

  /* Fetch the MongoDB model for the tenant-user-user*/
  const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

  /* Find the tenant-user-user in MongoDB based on the tenant-user-user ID */
  const tenant = await tenantModel.findOne({ email: req.tenant.email });

  /* Check if the tenant-user-user exists */
  if (tenant) {
    /* Fetch the MongoDB model for the customer*/
    const customerModel = await getCustomerModelMongodb(tenant.accountName);

    /* Create a document with the generated schema in the MongoDB customer collection*/
    const saveObj = await customerModel.create(generatedSchema);

    /*Connect to the PostgreSQL database for the specific tenant-user-user*/
    const getPostgresDBRef = await getPostgresDB(tenant.accountName);

    /* Variable to store the dynamic SQL update query*/
    var updateQuery;

    /* Iterate through each field in the form data*/
    for (const field of formData) {
      if (field.hasFeilds === 'new') {
        /*  Extract key and default values from the field*/
        var key = field.key;
        var value = field.default;

        /* Remove spaces from the key to generate a valid column name*/
        var newKey = key.replace(/\s/g, '');

        /*     Generate and execute a dynamic SQL query to add a new column to the table*/
        updateQuery = `ALTER TABLE ${commonURLPart} ADD COLUMN IF NOT EXISTS ${newKey} TEXT DEFAULT '${value}';`;
        await getPostgresDBRef.query(updateQuery);
      }
    }

    /* Return a JSON response with a success message*/
    return res.json(new ApiResponse(200, null));
  } else {
    /* Return a JSON response indicating that the tenant-user-user ID is not correct*/
    return res.json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
  }
});

module.exports = {
  getCustomerStructure,
  createCustomerStructure,
  updateCustomerStructure,
  createTenantServices,
  updateTenantModule
};
