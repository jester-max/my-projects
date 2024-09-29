
const { getCustomerModelMongodb, getTenantModelMongodb} = require('../../databases/tenant.mongodb.connection');
const {getPostgresDB} = require("../../databases/tenant.postgredb");
const {validateSchema} = require('../../validators/common.validator')
const {generateSchema} = require('../../common/generateMongodbSchema.common')
const {asyncHandler} = require("../../utilities/asyncHandler");
const { ApiResponse }  = require("../../utilities/ApiResponse")
const { ApiPending }  = require("../../utilities/ApiPending")


const createCustomerStructure = asyncHandler(async function (req, res) {

    /*Extract request body data*/
    const requestData = req.body;

    /* Generate schema based on the request data*/
    const generatedSchema = await generateSchema(requestData);

    /* Validate the generated schema*/
    await validateSchema(generatedSchema);

    /* Fetch the MongoDB model for the tenant*/
    const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

    /* Find the tenant in MongoDB based on the username*/
    const tenant = await tenantModel.findOne({ email: req.tenant.email });

    /* Check if the tenant exists*/
    if (tenant) {

        /*Fetch the MongoDB model for the customer*/
        const customerModel = await getCustomerModelMongodb(tenant.accountName);

        /* Create the generated schema in the MongoDB customer collection*/
        await customerModel.create(generatedSchema);

        /* Return a JSON response with a success message*/
        return res.json(new ApiResponse(200, null));
    } else {

        /*  Return a JSON response indicating that the tenant ID is not correct*/
        return res.json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
    }
});

const getCustomerStructure = asyncHandler(async function (req, res) {

    /*  Fetch the MongoDB model for the tenant*/
    const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

    /* Find the tenant in MongoDB based on the email*/
    const tenant = await tenantModel.findOne({ email: req.tenant.email });

    /* Check if the tenant exists*/
    if (tenant) {

        /* Fetch the MongoDB model for the customer*/
        const customerModel = await getCustomerModelMongodb(tenant.accountName);

        /* Fetch the latest document from the customer collection*/
        const getObj = await customerModel.findOne({}).sort({ _id: -1 }).limit(1);

        /* Fetch all documents from the customer collection*/
        const getArray = await customerModel.find();

        /* Return a JSON response with the latest document and the total number of documents*/
        return res.json(new ApiResponse(200, getObj, getArray.length));
    } else {

        /*  Return a JSON response indicating that the tenant ID is not correct*/
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

    /* Fetch the MongoDB model for the tenant*/
    const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

    /* Find the tenant in MongoDB based on the tenant ID*/
    const tenant = await tenantModel.findOne({ email: req.tenant.email });

    /* Check if the tenant exists*/
    if (tenant) {

        /* Fetch the MongoDB model for the customer*/
        const customerModel = await getCustomerModelMongodb(tenant.accountName);

        /* Create a document with the generated schema in the MongoDB customer collection*/
        const saveObj = await customerModel.create(generatedSchema);

        /*Connect to the PostgreSQL database for the specific tenant*/
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

        /* Return a JSON response indicating that the tenant ID is not correct*/

        return res.json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
    }
});




const createCustomerStructure1 = asyncHandler( async function (req, res)  {

    const requestData = req.body

    const generatedSchema = await generateSchema(requestData);

    await validateSchema(generatedSchema);

    const tenantModel = await getTenantModelMongodb(req.params.tenantID);

    const tenant = await tenantModel.findOne({ userName: req.params.tenantID })

    if(tenant){

        const customerModel = await getCustomerModelMongodb(tenant.userName);

        await customerModel.create(generatedSchema);

        return res
            .json( new ApiResponse(200,null));


    } else {
        return res
            .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT',));
    }
})


const getCustomerStructure1 = asyncHandler( async function (req, res)  {

    const tenantModel = await getTenantModelMongodb(req.params.tenantID);

    const tenant = await tenantModel.findOne({ email: req.tenant.email })

    if(tenant){

        const customerModel = await getCustomerModelMongodb(tenant.userName);

        const getObj = await customerModel.findOne({}).sort({_id:-1}).limit(1)

        const getArray = await customerModel.find()

        return res
            .json(new ApiResponse( 200,getObj,getArray.length));

    }else{

        return res
            .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT',));
    }
})


const updateCustomerStructure1 = asyncHandler( async function (req, res)  {

    const commonURLPart = req.originalUrl.split('/')[2];

    const formData = req.body

    const generatedSchema = await generateSchema(formData);

    const validSchemaData = await validateSchema(generatedSchema);

    const tenantModel = await getTenantModelMongodb(req.params.tenantID);

    const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

    if(tenant){

        const customerModel = await getCustomerModelMongodb(tenant.tenantID);

        const saveObj = await customerModel.create(generatedSchema);

        const getPostgresDBRef = await getPostgresDB(req.params.tenantID);

        var  updateQuery

        for (const field of formData) {
            if(field.hasFeilds === 'new'){

                // const { key, default } = field;
                var key  = field.key
                var value  = field.default

                var newKey = key.replace(/\s/g, '');

                // Generate and execute dynamic SQL query
                updateQuery = `ALTER TABLE ${commonURLPart} ADD COLUMN IF NOT EXISTS ${newKey} TEXT DEFAULT '${value}';`;

                await getPostgresDBRef.query(updateQuery);

            }

        }

        return res
            .json( new ApiResponse(200,null));

    }else{
        return res
            .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT',));
    }
})


module.exports = {getCustomerStructure,createCustomerStructure,updateCustomerStructure}
