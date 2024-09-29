
const { getInvoiceModelMongodb, getTenantModelMongodb} = require('../../databases/tenant.mongodb.connection');
const {getInvoiceModelPostgres} = require("../../databases/tenant.postgredb");
const {generateSchema,validateSchema, removeSpacesInKeys} = require('../../validators/common.validator')

exports.createInvocieStructure = async function (req,res) {
    try {

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const invoiceModel = await getInvoiceModelMongodb(tenant.tenantID);

            const saveObj = await invoiceModel.create(generatedSchema);

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


exports.getInvocieStructure = async function (req,res) {
    try {

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const invoiceModel = await getInvoiceModelMongodb(tenant.tenantID);

            const getObj = await invoiceModel.findOne({}).sort({_id:-1}).limit(1)

            const getArray = await invoiceModel.find()

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

exports.updateInvocieStructure = async function (req,res) {
    try {

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const invoiceModel = await getInvoiceModelMongodb(tenant.tenantID);

            const saveObj = await invoiceModel.create(generatedSchema);

            const invoiceModelPostgresDB = await getInvoiceModelPostgres(req.params.tenantID);

            var  updateQuery

            for (const field of formData) {
                if(field.hasFeilds === 'new'){

                    // const { key, default } = field;
                    var key  = field.key
                    var value  = field.default

                    var newKey = key.replace(/\s/g, '');

                    // Generate and execute dynamic SQL query
                      updateQuery = `ALTER TABLE sale_invoice ADD COLUMN IF NOT EXISTS ${newKey} TEXT DEFAULT '${value}';`;

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





exports.updateInvocieStructure1 = async function (req,res) {
    try {

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const invoiceModel = await getInvoiceModelMongodb(tenant.tenantID);

            const saveObj = await invoiceModel.create(generatedSchema);

            const invoiceModelPostgresDB = await getInvoiceModelPostgres(req.params.tenantID);

            var updateNewFields = {};

            // Assuming formData is an array of objects with keys like
            // { key: 'fieldName', hasFeilds: 'new', default: 'someDefaultValue' }
            for (const obj of formData) {
                var objkey = obj.key;
                if (obj.hasFeilds === 'new') {
                    updateNewFields[objkey] = obj.default;
                }
            }

            // Define your SQL query
            const sqlQuery = ` select * from Invoice;`;



            const result = await invoiceModelPostgresDB.query(sqlQuery);

            result.rows.forEach((obj)=>{
                console.log(obj)
            })



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


exports.updateInvocieStructure2 = async function (req,res) {
    try {

        const formData = req.body

        const generatedSchema = await generateSchema(formData);

        const validSchemaData = await validateSchema(generatedSchema);

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID })

        if(tenant){

            const invoiceModel = await getInvoiceModelMongodb(tenant.tenantID);

            const saveObj = await invoiceModel.create(generatedSchema);

            const invoiceModelPostgresDB = await getInvoiceModelPostgres(req.params.tenantID);

            const tableName = 'invoice';
            const jsonColumnName = 'json_data';

            var updateNewFieldsArray = []

// Assuming formData is an array of objects with keys like { key: 'fieldName', hasFeilds: 'new', default: 'someDefaultValue' }
            for (const obj of formData) {
                if (obj.hasFeilds === 'new') {
                    updateNewFieldsArray.push({name: obj.key, defaultValue: obj.default })

                }
            }

            // Construct and execute the SQL queries
            updateNewFieldsArray.forEach(async (field) => {
                const updateQuery = {
                    text: `
      UPDATE ${tableName}
      SET ${jsonColumnName} = jsonb_object(
          array['${field.name}'],
          array[${JSON.stringify(field.defaultValue)}],
          ${jsonColumnName}
      )
    `,
                };

                try {
                    const result = await invoiceModelPostgresDB.query(updateQuery);

                } catch (error) {
                    console.error(`Error updating field ${field.name}:`, error);
                }
            });


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










