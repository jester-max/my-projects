
const { getTenantModelMongodb,getCustomerModelMongodb } = require('../../databases/tenant.mongodb.connection');
const {getPostgresDB} = require("../../databases/tenant.postgredb");
const {validateActualData,removeSpacesInKeys} = require('../../validators/common.validator')
const {asyncHandler} = require("../../utilities/asyncHandler");
const {createTableAndInsertData,generateTableQuery} = require("../../common/postgresDBQuery.common");
const { ApiResponse }  = require("../../utilities/ApiResponse")
const { ApiPending }  = require("../../utilities/ApiPending")
const {ApiError} = require("../../utilities/ApiError");



const createCustomerData = asyncHandler(async function (req, res) {

   /* Extract the common part of the URL (assuming it contains the schema name)*/
    const commonURLPart = req.originalUrl.split('/')[2];

   /* Array to store table creation details*/
    const creatingTableArray = [];

  /*  Extract request body data*/
    const requestData = req.body;

   /*  Get the tenant ID from the request parameters*/
    const tenantID = req.tenant.accountName;

    /*Fetch the MongoDB model for the tenant*/
    const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

    /*Find the tenant in MongoDB based on the username*/
    const tenant = await tenantModel.findOne({email: req.tenant.email });

   /* Check if the tenant exists*/
    if (tenant) {

        /*Fetch the MongoDB model for the customer*/
        const customerModel = await getCustomerModelMongodb(tenant.accountName);

       /* Fetch default values from the MongoDB collection*/
        const mongoSchema = await customerModel.findOne({}).sort({ _id: -1 });

        /*Validate actual data against the schema*/
        const validatedData = await validateActualData(mongoSchema, requestData);

        /*Call the function to remove spaces in keys for the given object*/
        const modifiedData = await removeSpacesInKeys(validatedData);

       /* Connect to the PostgreSQL database for the specific tenant*/
        const getPostgresDBRef = await getPostgresDB(tenantID);

        /*Dynamically create schema*/
        const schemaName = `${tenantID}_${commonURLPart}`;

        await getPostgresDBRef.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);

       /* Generate table creation query and related details*/
        const result = await generateTableQuery(
            commonURLPart,
            commonURLPart,
            modifiedData,
            null,
            null,
            modifiedData,
            creatingTableArray,
            null,
            schemaName
        );



        /*Create table and insert data into PostgreSQL*/
        const saveObj = await createTableAndInsertData(result, modifiedData, getPostgresDBRef, schemaName);


        /*Return a JSON response with a success message*/
        return res.json(new ApiResponse(200, null));
    } else {

        /*Return a JSON response indicating that the tenant ID is not correct*/
        return res.json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
    }
});






const getCustomerData = async function (req, res) {
    try {
        /*Extract the common part of the URL (assuming it contains the schema name)*/
        const commonURLPart = req.originalUrl.split('/')[2];

       /* Get the tenant ID from the request parameters*/
        const tenantID = req.params.tenantID;

        /*Construct the schema name using the common part of the URL and the tenant ID*/
        const schemaName = `${tenantID}_${commonURLPart}`;

       /* Construct the query to get all tables in the schema*/
        const tablesQuery = `
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = '${schemaName}' AND table_type = 'BASE TABLE';
        `;

       /* Connect to the PostgreSQL database for the specific tenant*/
        const getPostgresDBRef = await getPostgresDB(tenantID);

        /*Execute query to get all tables in the schema*/
        const tablesResult = await getPostgresDBRef.query(tablesQuery);

        /*Check if there are tables in the schema*/
        if (tablesResult.rows.length > 0) {

            /*Extract table names from the query result*/
            const tableNames = tablesResult.rows.map(row => row.table_name);

            /*Create an array to store data from each table*/
            const allTableData = [];

           /* Iterate through each table and retrieve data*/
            for (const tableName of tableNames) {

                /*Construct the query to retrieve all data from the current table*/
                const tableDataQuery = `SELECT * FROM ${schemaName}.${tableName}`;

                /*Execute query to get data from the current table*/
                const tableDataResult = await getPostgresDBRef.query(tableDataQuery);

                /*Store table name and data in the array*/
                const tableData = {
                    tableName,
                    data: tableDataResult.rows,
                };
                allTableData.push(tableData);
            }

            /*Return a JSON response with the collected data from all tables*/
            return res.json(new ApiResponse(200, allTableData));
        } else {

           /* Return a JSON response indicating no tables found in the schema*/
            return res.json(new ApiPending(300, 'No tables found in the schema.'));
        }
    } catch (error) {

       /* Handle any errors and return a 500 Internal Server Error response*/
        return res.status(500).json(new ApiError(500, 'Internal Server Error'));
    }
};





// const createCustomerData = asyncHandler( async function (req, res)  {
//
//     const commonURLPart = req.originalUrl.split('/')[2];
//
//     const creatingTableArray = [];
//
//     const requestData = req.body
//
//     const tenantID = req.params.tenantID;
//
//     const tenantModel = await getTenantModelMongodb(req.params.tenantID);
//
//     const tenant = await tenantModel.findOne({ userName: req.params.tenantID });
//
//     if(tenant){
//
//         const customerModel = await getCustomerModelMongodb(tenantID);
//
//         // Fetch default values from MongoDB collection
//         const mongoSchema = await customerModel.findOne({}).sort({_id:-1})
//
//         // Validate actual data against the schema
//         const validatedData = await validateActualData(mongoSchema, requestData);
//
//         // Call the function to remove spaces in keys for the given object
//         const modifiedData =  await removeSpacesInKeys(validatedData);
//
//         const getPostgresDBRef = await getPostgresDB(tenantID);
//
//         // Dynamically create schema
//         const schemaName = `${tenantID}_${commonURLPart}`;
//         await getPostgresDBRef.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
//
//         const result = await generateTableQuery(commonURLPart,commonURLPart, modifiedData, null,null,modifiedData,creatingTableArray,null,schemaName)
//
//         const saveObj = await createTableAndInsertData(result,modifiedData,getPostgresDBRef,schemaName)
//
//         return res
//             .json( new ApiResponse(200,null));
//
//     }else{
//         return res
//             .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT',));
//     }
// })
// const getCustomerData = async function (req,res) {
//
//         // Extract the common part of the URL (in this case, '/tenant')
//         const commonURLPart = req.originalUrl.split('/')[2];
//
//       // Construct the query for the main customer table
//         const sqpQuery = `select * from ${req.params.tenantID}_${commonURLPart}.${commonURLPart}`;
//
//         const tenantID = req.params.tenantID;
//
//         const tenantModel = await getTenantModelMongodb(tenantID);
//
//         const tenant = await tenantModel.findOne({ userName: tenantID });
//
//         if (tenant) {
//
//             const getPostgresDBRef = await getPostgresDB(tenantID);
//
//             // Execute query for the main customer table
//             const mainTableResult = await getPostgresDBRef.query(sqpQuery);
//
//
//             // const getArray = await getPostgresDBRef.query(sqpQuery);
//
//             console.log(mainTableResult)
//
//             // return res
//             //     .json( new ApiResponse(200,getArray.rows));
//
//
//         } else {
//             return res
//                 .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT',));
//         }
// }

module.exports = {getCustomerData,createCustomerData}




