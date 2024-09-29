
/*Function to create a table and handle nested objects and arrays*/
const generateTableQuery = async (mainTableName, tableName, dataObject, parentColumnName = null, dataObject2, mainObj, tableArray, fkey,schemaName) => {
  /*  Flag to ensure fkey is added only once */
    let index = true;

   /* Columns for the current table*/
    const columns = await Promise.all(Object.keys(dataObject).map(async key => {
       /* Handle the case where the key is an array of objects*/
        if (Array.isArray(dataObject[key]) && dataObject[key].length > 0 && typeof dataObject[key][0] === 'object') {
            /*Create a separate table for arrays of objects*/
            const subTableName = `${mainTableName}_${key}`;
            await generateTableQuery(mainTableName, subTableName, dataObject[key][0], null, dataObject[key], dataObject, tableArray, `invoice_id INTEGER REFERENCES ${schemaName}.${mainTableName}(id)`,schemaName);
        } else if (typeof dataObject[key] === 'object' && !Array.isArray(dataObject[key])) {
          /*  Handle nested objects and add their properties as columns*/
            return await Promise.all(Object.keys(dataObject[key]).map(async innerKey => {
                const innerColumnName = innerKey;
                return `${innerColumnName} TEXT`;
            }));
        } else {
          /*  Handle simple key-value pairs*/
            if (index && fkey) {
                /*If fkey is provided and it's the first column, add it*/
                index = false;
                return `${key} TEXT, ${fkey}`;
            } else {
               /* Otherwise, just add the column*/
                return `${key} TEXT`;
            }
        }
    }));

   /* Check if it's the main table and create the table with all columns*/
    if (!parentColumnName) {

        const resultArray = columns.filter(value => value !== undefined);

        let createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${schemaName}.${tableName} (
                id SERIAL PRIMARY KEY, ${resultArray}
            )`;
        /*Modify the create table query for better formatting*/
        createTableQuery = await createTableQuery.replace(/,+/g, ',').replace(/( ,)+/g, '');

        // console.log(newCreateTableQuery)
       /* Add the table information to the array*/
        tableArray.push({ table: tableName, query: createTableQuery });
    }

    return tableArray;
};


const insertDataInPostgresDB = async (storeObj,tablename,getPostgresDBRef,schemaName) => {

    let isFirstCall = true; // Variable to track the first call

    const column = Object.keys(storeObj).join(', ');

    const values = Object.values(storeObj);

    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

    if(values.length!==0){

        const insertQuery = `INSERT INTO ${schemaName}.${tablename} (${column}) VALUES (${placeholders}) RETURNING *;`;

        const saveObj = await getPostgresDBRef.query(insertQuery, values);

        if (isFirstCall) {
            isFirstCall = false; // Set to false for subsequent calls
            return  saveObj.rows[0].id
        }

    }else{
       console.log('YOU ARE CREATED WRONGE CONFIGURATION ADD SOME FIELDS IN COLLECTION')
    }

}



/*Define a function to process the result set*/
const createTableAndInsertData = async (result, modifiedData,getPostgresDBRef,schemaName) => {

   /* Initialize primary key to 0*/
    let primarykey = 0;

   /* Iterate over the result set in reverse order*/
    for (let i = result.length - 1; i >= 0; i--) {
        try {

            let storeObj = {}
            /*Extract the original create table query and modify it*/
            const charToRemove = ',)';

            let newCreateTableQuery = result[i].query.split(charToRemove).join(')');

            newCreateTableQuery = newCreateTableQuery.replace(/,+/g, ',').replace(/( ,)+/g, '');

            /*  Execute the query to create a table*/
            const tableCreated = await getPostgresDBRef.query(newCreateTableQuery);

            if(i===result.length-1){

                await Object.entries(modifiedData).filter(([key, value]) => {
                    if(!Array.isArray(value) && typeof value !== 'object'){
                        storeObj[key] = value
                    }else if(!Array.isArray(value) && typeof value === 'object'){

                        Object.entries(value).filter(([key, value]) => {
                            storeObj[key] = value
                        })
                    }

                });

                primarykey = await insertDataInPostgresDB(storeObj,result[i].table,getPostgresDBRef,schemaName)

            }else{


                const originalTableString = result[i].table

                const substringToRemove = `${result[result.length-1].table}_`;

                const modifiedTableString = originalTableString.replace(substringToRemove, '');

                storeObj =  modifiedData[modifiedTableString][0];

                // Add the foreign key value to the prodetailData
                storeObj.invoice_id = primarykey;

                for (let j = 0; j < modifiedData[modifiedTableString].length; j++) {

                    modifiedData[modifiedTableString][j].invoice_id = primarykey;

                   await insertDataInPostgresDB(storeObj,result[i].table,getPostgresDBRef,schemaName)

                }

            }
        } catch (error) {
          /*  Log any errors during the iteration*/
            throw new Error(`Error processing table data: ${error.message}`);
            /*Handle the error as needed*/
        }
    }
};


module.exports = {createTableAndInsertData,generateTableQuery}