
const { getTenantModelMongodb,getQuotationModelMongodb } = require('../../databases/tenant.mongodb.connection');
const { getPostgresDB} = require("../../databases/tenant.postgredb");
const {validateActualData,removeSpacesInKeys} = require('../../validators/common.validator')
const {generateTableQuery, createTableAndInsertData} = require("../../common/postgresDBQuery.common");
const {asyncHandler} = require("../../utilities/asyncHandler");
const {ApiResponse} = require("../../utilities/ApiResponse");
const {ApiPending} = require("../../utilities/ApiPending");


// Only  invoice dummy schema is Store
const createQuotationData = asyncHandler( async function (req, res)  {

        const commonURLPart = req.originalUrl.split('/')[2];

        // Example usage
        const creatingTableArray = [];

        const actualData = req.body

        const tenantID = req.params.tenantID;

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID });

        if(tenant){

            const quotationModel = await getQuotationModelMongodb(tenantID);

            // Fetch default values from MongoDB collection
            const mongoSchema = await quotationModel.findOne({}).sort({_id:-1})

            // Validate actual data against the schema
            const validatedData = await validateActualData(mongoSchema, actualData);

            // Call the function to remove spaces in keys for the given object
            const modifiedData =  await removeSpacesInKeys(validatedData);

            const getPostgresDBRef = await getPostgresDB(tenantID);

            const result = await generateTableQuery(commonURLPart,commonURLPart, modifiedData, null,null,modifiedData,creatingTableArray);

            const saveObj = await createTableAndInsertData(result,modifiedData,getPostgresDBRef)


            return res
                .json( new ApiResponse(200,null));

        }else{
            return res
                .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT',));
        }
})


const getQuotationData = asyncHandler( async function (req, res)  {

        const commonURLPart = req.originalUrl.split('/')[2];

        const sqpQuery = `select * from ${commonURLPart}`;

        const tenantID = req.params.tenantID;

        const tenantModel = await getTenantModelMongodb(tenantID);

        const tenant = await tenantModel.findOne({ tenantID: tenantID });

        if (tenant) {
            const getPostgresDBRef = await getPostgresDB(tenantID);

            const getArray = await getPostgresDBRef.query(sqpQuery);

            return res
                .json( new ApiResponse(200,getArray.rows));


        } else {
            return res
                .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT',));
        }

})

module.exports = {getQuotationData,createQuotationData}

