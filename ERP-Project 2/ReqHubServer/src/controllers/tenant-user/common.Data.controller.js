const {
  getTenantModelMongodb,
  getMongodbModels,
} = require('../../databases/tenant.mongodb.connection');
const { getPostgresDB } = require('../../databases/tenant.postgredb');
const {
  validateActualData,
  removeSpacesInKeys,
} = require('../../validators/common.validator');
const { asyncHandler } = require('../../utilities/asyncHandler');
const { ApiResponse } = require('../../utilities/ApiResponse');
const { ApiError } = require('../../utilities/ApiError');
const {
  getRelatedDataDynamically,
  getAllTablesInSchema,
  executeQuery,
} = require('../../common/postgresDBQuery.common');
const {
  insertDataInPostgresDB2,
  updateDataInPostgresDB2,
} = require('../../common/postgresDB');
const util = require('util');

const calculateProductValues = async (product, parentKey, mongoSchema) => {
  const config = mongoSchema[parentKey];

  // Assuming 'type' is 'array', you can iterate through the items
  if (config.type === 'array' && config.hasOwnProperty('items')) {
    const items = config.items;

    for (const itemKey in items) {
      if (items.hasOwnProperty(itemKey)) {
        const fieldConfig = items[itemKey];

        const {
          key,
          fieldType,
          default: defaultValue,
          calculation,
        } = fieldConfig;

        product[key] = product[key] !== undefined ? product[key] : defaultValue;

        if (calculation !== '' && calculation !== undefined) {
          const dynamicCalculation = new Function(
            parentKey,
            `  return ${calculation}`
          );

          const result = await dynamicCalculation(product);

          product[key] = result;
        }
      }
    }
  }
};

// now only calculate single fields and  implement single fields logic
const calculateSingleFields = async (
  product,
  parentKey,
  configurationobject,
  mongoSchema
) => {
  const config = mongoSchema[parentKey];

  if (
    config?.calculation !== '' &&
    config?.calculation !== undefined &&
    config?.arrayWithCalculation !== '' &&
    config?.arrayWithCalculation !== undefined
  ) {
    const dynamicCalculation = new Function(
      config.arrayWithCalculation,
      `return ${config.calculation}`
    );

    const result = await dynamicCalculation(
      configurationobject[config.arrayWithCalculation]
    );

    configurationobject[config.key] = result;
  }
};

const calculateAllProductValues = async (configurationObj, mongoSchema) => {
  /* Iterate over the entries of the object*/
  for (const [key, value] of Object.entries(configurationObj)) {
    // Check if the value is an array
    if (Array.isArray(value)) {
      // Iterate over the array
      for (const item of value) {
        // Do something with each item in the array
        await calculateProductValues(item, key, mongoSchema);
      }
    }
  }

  /*now calculate only single fields for this loop*/
  for (const [key, value] of Object.entries(configurationObj)) {
    // Check if the value is an array
    if (!Array.isArray(value) && typeof value !== 'object') {
      await calculateSingleFields(value, key, configurationObj, mongoSchema);
    }
  }
};

const createTableData = asyncHandler(async function (req, res) {

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[3];

  /*  Extract request body data*/
  const requestData = req.body;

  console.log(req.body)

  /*  Get the tenant-user-user ID from the request parameters*/
  const tenantID = req.tenant.accountName;

  /*Fetch the MongoDB model for the tenant-user-user*/
  const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

  /*Find the tenant-user-user in MongoDB based on the username*/
  const tenant = await tenantModel.findOne({ email: req.tenant.email });

  /* Check if the tenant-user-user exists*/
  if (tenant) {
    /* Fetch the MongoDB model for the service */
    const getMongodbModel = await getMongodbModels(
      tenant.accountName,
      subModule
    );

    /* Fetch default values from the MongoDB collection*/
    const mongoSchema = await getMongodbModel.findOne({}).sort({ _id: -1 });

    await calculateAllProductValues(requestData, mongoSchema);

    /*Validate actual data against the schema*/
    const validatedData = await validateActualData(mongoSchema, requestData);

    /*Call the function to remove spaces in keys for the given object*/
   // const modifiedData = await removeSpacesInKeys(validatedData);

    /* Connect to the PostgreSQL database for the specific tenant-user-user*/
    const getPostgresDBRef = await getPostgresDB(tenantID);

    /*Dynamically create schema*/
    const schemaName = `${tenantID}_${commonURLPart}`;

    /* Insert data into PostgreSQL */
    await insertDataInPostgresDB2(
        validatedData,
      subModule,
      getPostgresDBRef,
      schemaName,
      res
    );

    /*Return a JSON response with a success message*/
    return res.json(new ApiResponse(200, null));
  } else {
    /*Return a JSON response indicating that the tenant-user-user ID is not correct*/
    return res.json(new ApiError(401, 'TENANT ID IS NOT CORRECT'));
  }
});

const getOneTableData = asyncHandler(async function (req, res) {
  const pageNumber = 1;

  const pageSize = 2;

  const offset = (pageNumber - 1) * pageSize;

  const requestDataID = req.query.id;

  if (requestDataID === '') {
    return res.status(500).json(new ApiError(500, 'ID IS EMPTY'));
  }

  /*Extract the common part of the URL (assuming it contains the schema name)*/
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[3];

  /* Get the tenant-user-user  account ID from the request parameters*/
  const tenantID = req.tenant.accountName;

  /*Construct the schema name using the common part of the URL and the tenant-user-user ID*/
  const schemaName = `${tenantID}_${commonURLPart}`;

  /* Connect to the PostgreSQL database for the specific tenant-user-user*/
  const getPostgresDBRef = await getPostgresDB(tenantID);

  /* this function is create a dynamically query for table and return a query */
  const getData = await getRelatedDataDynamically(
    subModule,
    schemaName,
    requestDataID,
    getPostgresDBRef,
    pageSize,
    offset
  );

  /*Return a JSON response with the collected data from all tables*/
  return res.json(new ApiResponse(200, getData));
});

const getAllTableData = asyncHandler(async function (req, res) {
  const pageNumber = req.query.number || 1;

  const pageSize = req.query.size || 20;

  const requestDataID = req.query.search || '';

  const offset = (pageNumber - 1) * pageSize;

  /*Extract the common part of the URL (assuming it contains the schema name)*/
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[3];

  /* Get the tenant-user-user  account ID from the request parameters*/
  const tenantID = req.tenant.accountName;

  /*Construct the schema name using the common part of the URL and the tenant-user-user ID*/
  const schemaName = `${tenantID}_${commonURLPart}`;

  /* Connect to the PostgreSQL database for the specific tenant-user-user*/
  const getPostgresDBRef = await getPostgresDB(tenantID);

  /* this function is create a dynamically query for table and return a query */
  const getData = await getRelatedDataDynamically(
    subModule,
    schemaName,
    requestDataID,
    getPostgresDBRef,
    pageSize,
    offset
  );

  /* Use util.inspect with the depth option to increase the console output depth*/
  //  console.log(util.inspect(getData, { depth: null }));

  /*Return a JSON response with the collected data from all tables*/
  return res.json(new ApiResponse(200, getData));
});

const updateTableData = asyncHandler(async function (req, res) {

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[3];

  let requestData = req.body

  /*  Extract request body data*/
  /*const requestData = {
    invoice_id: '2',
    'New Field Number': '1',
    'New Field Email': 'ankit@gmail.com',
    'New Field Text': 'ankit',
    'New Array': [
      {
        'New Array Field Text': 'ankit',
        'New Array Field Number': '0',
        'New Array Field Date': '2024-12-12',
        'New Array Field Email': 'ankit@gmail.com'
      }
    ],
    'New AArray': [
      {
        'New Array Field Text': 'ankit-1',
        'New Array Field Number': '0',
        'New Array Field Date': '2024-12-12',
        'New Array Field Email': 'ankit@gmail.com'
      }
    ]
  }*/

  /*  Get the tenant-user-user ID from the request parameters*/
  const tenantID = req.tenant.accountName;

  console.log(requestData,req.query.id,tenantID)

  /*Fetch the MongoDB model for the tenant-user-user*/
  const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

  /*Find the tenant-user-user in MongoDB based on the username*/
  const tenant = await tenantModel.findOne({ email: req.tenant.email });

  /* Check if the tenant-user-user exists*/
  if (tenant) {
    /* Fetch the MongoDB model for the service */
    const getMongodbModel = await getMongodbModels(
      tenant.accountName,
      subModule
    );

    /* Fetch default values from the MongoDB collection*/
    const mongoSchema = await getMongodbModel.findOne({}).sort({ _id: -1 });

    /*Call the function to remove spaces in keys for the given object*/
    // const modifiedData = await removeSpacesInKeys(mongoSchema);

    /*Validate actual data against the schema*/
    const validatedData = await validateActualData(mongoSchema, requestData);

    /* Connect to the PostgreSQL database for the specific tenant-user-user*/
    const getPostgresDBRef = await getPostgresDB(tenantID);

    /*Dynamically create schema*/
    const schemaName = `${tenantID}_${commonURLPart}`;

    const conditionColunm = `invoice_id`;

    const conditionColunmData = '2';

    /* Insert data into PostgreSQL */
    const updatedData = await updateDataInPostgresDB2(
      validatedData,
      { conditionColunm, conditionColunmData },
      subModule,
      getPostgresDBRef,
      schemaName
    );

    /*Return a JSON response with a success message*/
    return res.json(new ApiResponse(200, null));
  } else {
    /*Return a JSON response indicating that the tenant-user-user ID is not correct*/
    return res.status(500).json(new ApiError(401, 'TENANT ID IS NOT CORRECT'));
  }
});

const deleteOneTableData = asyncHandler(async function (req, res) {
  /* Extract the common part of the URL (assuming it contains the schema name) */
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract the common part of the URL (assuming it contains the schema name) */
  const subModule = req.originalUrl.split('/')[3];

  const requestDeleteID = req.query.id;

  /* Get the tenant-user-user account ID from the request parameters */
  const tenantID = req.tenant.accountName;

  /* Construct the schema name using the common part of the URL and the tenant-user-user ID */
  const schemaName = `${tenantID}_${commonURLPart}`;

  /* Connect to the PostgreSQL database for the specific tenant-user-user */
  const getPostgresDBRef = await getPostgresDB(tenantID);

  /* Step 1: Get all tables in the main schema */
  const tables = await getAllTablesInSchema(schemaName, getPostgresDBRef);

  const queryPrimaryKeyGetColumns = `
             SELECT column_name
             FROM information_schema.columns
             WHERE table_name = $1 AND table_schema = $2 AND column_name IN (
             SELECT column_name
             FROM information_schema.key_column_usage
             WHERE table_name = $1 AND table_schema = $2
    );
        `;

  const columns = await executeQuery(
    queryPrimaryKeyGetColumns,
    getPostgresDBRef,
    [subModule, schemaName]
  );

  const primaryKeyColumnname = columns[0].column_name;

  // Loop through each table to delete rows based on the condition
  for (let i = tables.length - 1; i >= 0; i--) {
    /* Construct the query to delete rows from each table based on the condition */
    const deleteQuery =
      i === 0
        ? `DELETE FROM ${schemaName}.${tables[i].table_name} WHERE ${primaryKeyColumnname} = '${requestDeleteID}';`
        : `DELETE FROM ${schemaName}.${tables[i].table_name} WHERE invoice_id = '${requestDeleteID}';`;

    await executeQuery(deleteQuery, getPostgresDBRef);
  }

  /* Return a JSON response with the collected data from all tables */
  return res.json(new ApiResponse(200, ''));
});

const deleteAllTableData = asyncHandler(async function (req, res) {
  /*Extract the common part of the URL (assuming it contains the schema name)*/
  const commonURLPart = req.originalUrl.split('/')[2];

  /* Extract the common part of the URL (assuming it contains the schema name)*/
  const subModule = req.originalUrl.split('/')[3];

  /* Get the tenant-user-user  account ID from the request parameters*/
  const tenantID = req.tenant.accountName;

  /*Construct the schema name using the common part of the URL and the tenant-user-user ID*/
  const schemaName = `${tenantID}_${commonURLPart}`;

  /* Connect to the PostgreSQL database for the specific tenant-user-user*/
  const getPostgresDBRef = await getPostgresDB(tenantID);

  /* Step 1: Get all tables in the main schema*/
  const tables = await getAllTablesInSchema(schemaName, getPostgresDBRef);

  // Assuming 'tables' is your array
  for (let i = tables.length - 1; i >= 0; i--) {
    /* Construct the query to get all tables in the schema*/
    const tablesQuery = `
           DELETE FROM ${schemaName}.${tables[i].table_name};`;

    await executeQuery(tablesQuery, getPostgresDBRef);
  }

  /*Return a JSON response with the collected data from all tables*/
  return res.json(new ApiResponse(200, ''));
});

module.exports = {
  getAllTableData,
  getOneTableData,
  createTableData,
  deleteAllTableData,
  deleteOneTableData,
  updateTableData,
};
