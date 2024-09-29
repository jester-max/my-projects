
const { getQuotationModelMongodb, getTenantModelMongodb, getInvoiceModelMongodb} = require('../../databases/tenant.mongodb.connection');
const {getInvoiceModelPostgres, getPostgresDB} = require("../../databases/tenant.postgredb");
const {generateSchema,validateSchema} = require('../../validators/common.validator')
const {asyncHandler} = require("../../utilities/asyncHandler");
const {ApiResponse} = require("../../utilities/ApiResponse");
const {ApiPending} = require("../../utilities/ApiPending");

const createQuotationStructure =  asyncHandler( async function (req, res) {

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const quotationModel = await getQuotationModelMongodb(tenant.tenantID);

            const saveObj = await quotationModel.create(generatedSchema);

            return res
                .json( new ApiResponse(200,null));


        } else {
            return res
                .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
        }

})


const getquotationStructure = asyncHandler( async function (req, res) {

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const quotationModel = await getQuotationModelMongodb(tenant.tenantID);

            const getObj = await quotationModel.findOne({}).sort({_id:-1}).limit(1)

            const getArray = await quotationModel.find()

            return res
                .json( new ApiResponse(200,null));


        } else {
            return res
                .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
        }

})

const updateQuotationStructure = asyncHandler( async function (req, res) {

        const commonURLPart = req.originalUrl.split('/')[2];

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const quotationModel = await getQuotationModelMongodb(tenant.tenantID);

            const saveObj = await quotationModel.create(generatedSchema);

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


        } else {
            return res
                .json(new ApiPending(300, 'TENANT ID IS NOT CORRECT'));
        }
})

module.exports = {getquotationStructure,createQuotationStructure,updateQuotationStructure}