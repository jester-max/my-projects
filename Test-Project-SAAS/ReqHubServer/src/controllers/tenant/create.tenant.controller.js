

const { getTenantModelMongodb } = require('../../databases/tenant.mongodb.connection');



exports.createTeantData = async function (req,res) {
    try {

        const { tenantID, tenantName, tenantDate } = req.body;

        if (
            [tenantID, tenantName].some((field) => field?.trim() === "")
        ) {
            throw new Error ( `All fields are required`)
        }

        const mongodbTenantModel = await getTenantModelMongodb(tenantID);

        const tenantExist = await mongodbTenantModel.findOne({tenantID:tenantID})

        if(tenantExist){

            if(tenantExist.completeConfiguration==='complete'){
                return  res.json({
                    Status: 'SUCCESS',
                    language: 'en_US',
                    StatusCode: res.StatusCode,
                    data: tenantExist,
                    error: null,
                    page:'home'
                });
            }else{
                return  res.json({
                    Status: 'SUCCESS',
                    language: 'en_US',
                    StatusCode: res.StatusCode,
                    data: tenantExist,
                    error: null,
                    page:'configuration'
                })
            }
        }else{
            const tenant = new mongodbTenantModel({
                tenantID,
                tenantName,
                tenantDate,
                tenantDatabase: tenantID,
            });

            const saveObj = await tenant.save();

            return  res.json({
                Status: 'SUCCESS',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: saveObj,
                error: null,
                page:'configuration'
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


exports.getTenantData = async function (req,res) {

    try {
        const mongodbTenantModel = await getTenantModelMongodb(req.params.tenantid);

        const getObj = await mongodbTenantModel.find();

        res.json({
            Status: 'SUCCESS',
            language: 'en_US',
            StatusCode: res.StatusCode,
            data: getObj,
            error: null,
            page:'home'
        });
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

exports.updateTenantData = async function (req,res) {

    try {
        const mongodbTenantModel = await getTenantModelMongodb(req.params.tenantid);

        const UpdatetenantData = await mongodbTenantModel.
        findOneAndUpdate({tenantID:req.params.tenantid}, { $set: { completeConfiguration: 'complete' } },)


        res.json({
            Status: 'SUCCESS',
            language: 'en_US',
            StatusCode: res.StatusCode,
            data: UpdatetenantData,
            error: null,
        });
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


