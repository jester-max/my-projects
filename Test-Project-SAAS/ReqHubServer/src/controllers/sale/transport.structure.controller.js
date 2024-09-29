
const { getTransportModelMongodb, getTenantModelMongodb, getQuotationModelMongodb} = require('../../databases/tenant.mongodb.connection');
const {getInvoiceModelPostgres} = require("../../databases/tenant.postgredb");
const {generateSchema,validateSchema} = require('../../validators/common.validator')

exports.createTransportStructure = async function (req,res) {
    try {

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const transportModel = await getTransportModelMongodb(tenant.tenantID);

            const saveObj = await transportModel.create(generatedSchema);

            // const UpdatetenantData = await tenantModel.findByIdAndUpdate(tenant._id, { $set: { completeConfiguration: 'complete' } },)

            res.json({
                Status: "SUCCESS",
                language: "en_US",
                StatusCode:res.StatusCode,
                data: saveObj,
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
}


exports.getTransportStructure = async function (req,res) {
    try {

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const transportModel = await getTransportModelMongodb(tenant.tenantID);

            const getObj = await transportModel.findOne({}).sort({_id:-1}).limit(1)

            const getArray = await transportModel.find()

            res.json({
                Status: "SUCCESS",
                language: "en_US",
                StatusCode:res.StatusCode,
                data: getObj,
                version:getArray.length,
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
}


exports.updateTransportStructure = async function (req,res) {
    try {

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const transportModel = await getTransportModelMongodb(tenant.tenantID);

            const saveObj = await transportModel.create(generatedSchema);

            const invoiceModelPostgresDB = await getInvoiceModelPostgres(req.params.tenantID);

            var  updateQuery

            for (const field of formData) {
                if(field.hasFeilds === 'new'){

                    // const { key, default } = field;
                    var key  = field.key
                    var value  = field.default

                    var newKey = key.replace(/\s/g, '');

                    // Generate and execute dynamic SQL query
                    updateQuery = `ALTER TABLE sale_transport ADD COLUMN IF NOT EXISTS ${newKey} TEXT DEFAULT '${value}';`;

                    await invoiceModelPostgresDB.query(updateQuery);

                }

            }

            res.json({
                Status: "SUCCESS",
                language: "en_US",
                StatusCode:res.StatusCode,
                data: saveObj,
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
}