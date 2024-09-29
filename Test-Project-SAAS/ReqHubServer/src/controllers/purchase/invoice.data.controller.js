
const { getTenantModelMongodb,getPurchaseInvoiceModelMongodb } = require('../../databases/tenant.mongodb.connection');
const {getInvoiceModelPostgres} = require("../../databases/tenant.postgredb");
const {validateActualData,removeSpacesInKeys} = require('../../validators/common.validator')


const createTable =
    async (mainTableName,tableName, dataObject, parentColumnName
        = null,dataObject2,mainObj,tableArray,fkey) => {
        var index = true
        const columns = await Promise.all(Object.keys(dataObject).map(async key => {

            // const columnName = parentColumnName ? `${parentColumnName}_${key.toLowerCase()}` : key;
            const columnName =  key;

            if (Array.isArray(dataObject[key]) && dataObject[key].length > 0 && typeof dataObject[key][0] === 'object') {

                // Create a separate table for arrays of objects
                // const subTableName = `${tableName}_${key.toLowerCase()}`;
                const subTableName = `${mainTableName}_${key}`;
                await createTable(mainTableName,subTableName, dataObject[key][0],null, dataObject[key],dataObject,tableArray,`invoice_id INTEGER REFERENCES ${mainTableName}(id)`);
                // return `${key} INTEGER REFERENCES ${subTableName}(id)`;
            } else if (typeof dataObject[key] === 'object' && !Array.isArray(dataObject[key])) {

                // Handle custDetails object separately and add its properties as columns
                // const custDetailsColumns = await createTable(mainTableName,tableName, dataObject[key], columnName,dataObject[key],dataObject,tableArray);
                //
                // return custDetailsColumns;

                return  await Promise.all(Object.keys(dataObject[key]).map(async innerKey => {

                    // const columnName = parentColumnName ? `${parentColumnName}_${key.toLowerCase()}` : key;
                    const innerColumnName =  innerKey;

                    return `${innerColumnName} TEXT`;
                }))

            } else {
                if(index&&fkey){
                    index = false
                    return `${columnName} TEXT,${fkey}`;
                }else{
                    return `${columnName} TEXT`;
                }
            }
        }));

        if (!parentColumnName) {

            // If it's the main table, create the table with all columns

            const createTableQuery = `
              CREATE TABLE IF NOT EXISTS ${tableName} (
                  id SERIAL PRIMARY KEY,${columns})`;

            let charToRemove = ",)";

            let newCreateTableQuery = await createTableQuery.split(charToRemove).join(')');

            newCreateTableQuery = await newCreateTableQuery.replace(/,+/g, ',').replace(/( ,)+/g, '');

            tableArray.push({table:tableName,query:newCreateTableQuery})

            // await invoiceModelPostgresDB.query(newCreateTableQuery);
            //
            // if(Array.isArray(dataObject2) && dataObject2.length > 0 && typeof dataObject2 === 'object'){
            //     const firstData = dataObject2[0];
            //
            //     const column = Object.keys(firstData).join(', ');
            //
            //     for (let i = 0; i < dataObject2.length; i++) {
            //         const values = Object.values(dataObject2[i]);
            //         const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
            //
            //         const insertQuery = `
            //         INSERT INTO ${tableName} (${column})
            //          VALUES (${placeholders})
            //          RETURNING *;
            //          `;
            //
            //         const result = await invoiceModelPostgresDB.query(insertQuery, values);
            //
            //         delete mainObj[tableName];
            //
            //     }
            //
            // }else{
            //
            //     var i = 0
            //
            //     const column = Object.keys(mainObj).join(', ');
            //
            //     const values = Object.values(mainObj);
            //
            //     const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
            //
            //     const insertQuery = `
            //         INSERT INTO ${tableName} (${column})
            //          VALUES (${placeholders})
            //          RETURNING *;
            //          `;
            //
            //     const result = await invoiceModelPostgresDB.query(insertQuery, values);
            // }
        }
        return tableArray
    }

// Only  invoice dummy schema is Store
exports.createPurchaseData = async function (req,res,next) {
    try {

        // Example usage
        const creatingTableArray = [];

        const actualData = req.body

        const tenantID = req.params.tenantID;

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID });

        if(tenant){

            const invoiceModel = await getPurchaseInvoiceModelMongodb(tenantID);

            // Fetch default values from MongoDB collection
            const mongoSchema = await invoiceModel.findOne({}).sort({_id:-1})


            // Validate actual data against the schema
            const validatedData = await validateActualData(mongoSchema, actualData);

            // Call the function to remove spaces in keys for the given object
            const modifiedData =  await removeSpacesInKeys(validatedData);

            const invoiceModelPostgresDB = await getInvoiceModelPostgres(tenantID);

            const result = await createTable('purchase_invoice','purchase_invoice', modifiedData, null,null,modifiedData,creatingTableArray);

            var primarykey = 0

            for (let i = result.length-1; i >= 0 ; i--) {

                let charToRemove = ",)";

                let newCreateTableQuery = await result[i].query.split(charToRemove).join(')');

                newCreateTableQuery = await newCreateTableQuery.replace(/,+/g, ',').replace(/( ,)+/g, '');

                let tableCreated = await invoiceModelPostgresDB.query(newCreateTableQuery)

                if(i===result.length-1){
                    var obj = {}

                    await Object.entries(modifiedData).filter(([key, value]) => {
                        if(!Array.isArray(value) && typeof value !== 'object'){
                            obj[key] = value
                        }else if(!Array.isArray(value) && typeof value === 'object'){

                            Object.entries(value).filter(([key, value]) => {
                                obj[key] = value
                            })
                        }

                    });

                    const column = Object.keys(obj).join(', ');

                    const values = Object.values(obj);

                    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

                    if(values.length!==0){
                        const insertQuery = `
                             INSERT INTO ${result[i].table} (${column})
                              VALUES (${placeholders})
                              RETURNING *;
                              `;

                        const saveObj = await invoiceModelPostgresDB.query(insertQuery, values);

                        primarykey = saveObj.rows[0].id
                    }else{
                        return res.json({
                            Status: 'ERROR',
                            language: 'en_US',
                            StatusCode: res.StatusCode,
                            data: null,
                            error: 'YOU ARE CREATED WRONGE CONFIGURATION ADD SOME FIELDS IN COLLECTION',
                        });
                    }

                }else{

                    const originalString = result[i].table

                    const substringToRemove = "purchase_invoice_";

                    const modifiedString = originalString.replace(substringToRemove, '');

                    var firstData = modifiedData[modifiedString][0];

                    // Add the foreign key value to the prodetailData
                    firstData.invoice_id = primarykey;


                    const column = Object.keys(firstData).join(', ');

                    for (let j = 0; j < modifiedData[modifiedString].length; j++) {
                        modifiedData[modifiedString][j].invoice_id = primarykey;

                        var values = Object.values(modifiedData[modifiedString][j]);

                        if(values.length!==0){

                            const placeholders = values.map((_, j) => `$${j + 1}`).join(', ');

                            const insertQuery = `
                             INSERT INTO ${result[i].table.toLowerCase()} (${column})
                              VALUES (${placeholders})
                              RETURNING *;
                              `;

                            const result23 = await invoiceModelPostgresDB.query(insertQuery, values);
                        }else{
                            return res.json({
                                Status: 'ERROR',
                                language: 'en_US',
                                StatusCode: res.StatusCode,
                                data: null,
                                error: 'YOU ARE CREATED WRONGE CONFIGURATION ADD SOME FIELDS IN COLLECTION',
                            });
                        }
                    }
                }
            }

            res.json({
                Status: 'SUCCESS',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: null,
                error: null,
            });

        }else{
            res.json({
                Status: 'PENDING',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: null,
                error: null,
                message: 'TENANT ID IS NOT CORRECT',
            });
        }
    }catch (err) {

        res.json({
            Status: 'ERROR12345',
            language: 'en_US',
            StatusCode: res.StatusCode,
            data: null,
            error: err.message,
        });
    }
}



exports.getPurchaseData = async function (req,res) {
    try {

        const sqpQuery = `select * from purchase_invoice`;

        const tenantID = req.params.tenantID;

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID });


        if (tenant) {
            const invoiceModel = await getInvoiceModelPostgres(tenantID);

            const getArray = await invoiceModel.query(sqpQuery);



            res.json({
                Status: 'SUCCESS',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: getArray.rows,
                error: null,
            });
        } else {
            res.json({
                Status: 'PENDING',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: null,
                error: null,
                message: 'TENANT ID IS NOT CORRECT',
            });
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

exports.deleteInvoiceData = async function (req,res) {
    try {
        const tenantID = req.params.tenant;

        const tenantModel = await getMongodbTenantModel();

        const tenant = await tenantModel.findOne({ tenantID: tenantID });

        if (tenant) {
            const invoiceModel = await getInvoiceModel(tenantID);

            const getArray = await invoiceModel.deleteMany();

            res.json({
                Status: 'SUCCESS',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: getArray,
                error: null,
            });
        } else {
            res.json({
                Status: 'PENDING',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: null,
                error: null,
                message: 'TENANT ID IS NOT CORRECT',
            });
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

// Only  invoice dummy schema is Store
exports.createInvocieData1 = async function (req,res,next) {
    try {
        const actualData = req.body

        const tenantID = req.params.tenantID;

        const tenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenant = await tenantModel.findOne({ tenantID: req.params.tenantID });

        if(tenant){

            const invoiceModel = await getPurchaseInvoiceModelMongodb(tenantID);

            // Fetch default values from MongoDB collection
            const mongoSchema = await invoiceModel.findOne({}).sort({_id:-1})

            // Validate actual data against the schema
            const validatedData = await validateActualData(mongoSchema, actualData);

            const invoiceModelPostgresDB = await getInvoiceModelPostgres(tenantID);

            const tableCreationQuery = await createTable(invoiceModelPostgresDB,'purchase_invoice', validatedData);


            res.json({
                Status: 'SUCCESS',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: null,
                error: null,
            });

        }else{
            res.json({
                Status: 'PENDING',
                language: 'en_US',
                StatusCode: res.StatusCode,
                data: null,
                error: null,
                message: 'TENANT ID IS NOT CORRECT',
            });
        }
    }catch (err) {
        console.log(err)
        res.json({
            Status: 'ERROR12345',
            language: 'en_US',
            StatusCode: res.StatusCode,
            data: null,
            error: err.message,
        });
    }
}