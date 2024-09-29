const { ApiError } = require('../utilities/ApiError');

const mapFieldTypeToPostgres = async function (type, config) {
  switch (type) {
    case 'number':
      // Additional conditions for 'number' type
      if (config.float) {
        return 'REAL';
      } else {
        return 'INTEGER';
      }
    case 'boolean':
      return 'BOOLEAN';
    case 'date':
      return 'DATE';
    case 'string':
      return 'TEXT';
    // Add more cases for other data types as needed
    default:
      return 'TEXT';
  }
};

const generateIndexQuery = async function (
  tableName,
  schemaName,
  indexName,
  columnName,
  indexType = 'BTREE'
) {
  return `CREATE INDEX IF NOT EXISTS ${indexName} ON ${schemaName}.${tableName} USING ${indexType} (${columnName});`;
};

const createTableWithKeys = async function (
    tenantID,
  tableName,
  mainTableName,
  schemaName,
  schemaConfig,
  creatingTableArray,
  objectLength,
  parentColumnName = null,
  fkey
) {
  let index = true;

  let query = '';

  if (tableName === mainTableName) {
    query = `CREATE TABLE IF NOT EXISTS  ${schemaName}.${tableName} (`;
  } else {
    query = `CREATE TABLE IF NOT EXISTS  ${schemaName}.${tableName} (id SERIAL PRIMARY KEY,`;
  }

  await Object.entries(schemaConfig).forEach(
    async ([fieldName, fieldConfig]) => {
      const fieldType = await mapFieldTypeToPostgres(
        fieldConfig.type,
        fieldConfig
      );

      // const columnName = `${fieldName.toLowerCase()}`;
      const columnName = `${fieldName}`;

      let f_KeyAndName = '';

      // Check for nested array and create a table
      if (fieldConfig.type === 'array' && fieldConfig.items) {
        let stringWithoutSpacesTable = fieldName.replace(/\s/g, '');

        stringWithoutSpacesTable = stringWithoutSpacesTable.toLowerCase();

        // Key to delete
        let keyToDelete = 'invoice_id';

        // Use the delete operator to remove the key and its associated value
        delete fieldConfig.items[keyToDelete];

        const subTableName = `${tableName}_${stringWithoutSpacesTable}`;
        createTableWithKeys(
            tenantID,
          subTableName,
          mainTableName,
          schemaName,
          fieldConfig.items,
          creatingTableArray,
          objectLength,
          columnName,
          `,invoice_id TEXT REFERENCES ${schemaName}.${tableName}(invoice_id),`
        );

        // Add a foreign key in the main table for the nested array
        // query += `${columnName} INTEGER REFERENCES ${subTableName}(id),`;
      } else {
        // Add a field to the query

        // const stringWithoutSpaces = columnName.replace(/\s/g, '');
        let stringWithoutSpaces
        if(fieldConfig.primarykey){
          stringWithoutSpaces = `${columnName}`;
        }else{
          stringWithoutSpaces = `"${columnName}"`;
        }


        if (!fieldConfig.fkey) {
          query += `${stringWithoutSpaces} ${fieldType}`;
        } else {
          f_KeyAndName = `${stringWithoutSpaces} ${fieldType}`;
        }

        /* Check for primary key and candidate key */
        if (fieldConfig.primarykey) {
          query += ` PRIMARY KEY,`;
        } else if (fieldConfig.ckey) {
          // Remove the trailing comma
          query = query.replace(/,\s*$/, '');
          query += ` UNIQUE,`;
        } else {
          if (index && fkey) {
            index = false;
            query = query + fkey;
          } else {
            query += `,`;
          }
        }

        /*  Check for relationships and foreign keys */
        if (fieldConfig.fkey) {
          const dynamicSchema = `${tenantID}_${fieldConfig.moduleName}`; // Assuming moduleName contains the referenced schema
          const referencedColumn = fieldConfig.primaryKey2 || 'id'; // Assuming primaryKey2 contains the referenced column
          const dynamicTable = fieldConfig.subModuleName;

          query += `${f_KeyAndName} REFERENCES ${dynamicSchema}.${dynamicTable}(${referencedColumn}),`;

          const modifiedSqlString = query.replace(/,+/g, ',');

          query = modifiedSqlString;
        }

        /*  Check for indexes and add them to the query*/
        if (fieldConfig.indexes) {
          const sanitizedIndexName = fieldConfig.indexType || 'BTREE'; // Default to B-tree if not specified

          const indexType = sanitizedIndexName.replace(/-/g, '');

          const indexQuery = generateIndexQuery(
            tableName,
            schemaName,
            `${stringWithoutSpaces}`,
              // `${stringWithoutSpaces}_index`,
            stringWithoutSpaces,
            indexType
          );

          creatingTableArray.push({ indexQuery });
        }
      }

      if (tableName === mainTableName || fieldConfig.type === 'array') {
        objectLength--;
      }
    }
  );
  query = query.slice(0, -1); // Remove the trailing comma
  query += ');';

  if (objectLength === 0) {
    creatingTableArray.push({ tableQuery: query });
    return creatingTableArray;
  } else {
    creatingTableArray.push({ tableQuery: query });
  }
};

const executeQueries = async function (queries, modelPostgresDB, res) {
  const tableCreationQueries = [];
  const indexCreationQueries = [];

  // Separate table and index creation queries
  await queries.forEach((queryObject) => {
    if (queryObject.tableQuery) {
      tableCreationQueries.push(queryObject.tableQuery);
    }

    if (queryObject.indexQuery) {
      indexCreationQueries.push(queryObject.indexQuery);
    }
  });

  // Execute table creation queries first
  for (const tableQuery of tableCreationQueries) {
    await modelPostgresDB.query(tableQuery);
  }

  // Execute index creation queries next
  for (const indexQuery of indexCreationQueries) {
    const sqlQuery = await indexQuery;

    const result = await modelPostgresDB.query(sqlQuery);
  }
};

const insertDataInPostgresDB1 = async function (
  storeObj,
  tablename,
  getPostgresDBRef,
  schemaName,
  res
) {
  try {
    let newStoreObj = {};
    const processArray = async (arrayData, parentKey, primaryID) => {
      for (const item of arrayData) {
        item.invoice_id = primaryID;

        const arrayColumns = Object.keys(item).join(', ');

        const arrayValues = Object.values(item);

        const arrayPlaceholders = arrayValues
          .map((_, i) => `$${i + 1}`)
          .join(', ');

        const arrayInsertQuery = `INSERT INTO ${schemaName}.${tablename}_${parentKey} (${arrayColumns}) VALUES (${arrayPlaceholders}) RETURNING *;`;

        await getPostgresDBRef.query(arrayInsertQuery, arrayValues);
      }
    };

    const processObject = async (modifiedData) => {
      await Object.entries(modifiedData).filter(([key, value]) => {
        if (!Array.isArray(value) && typeof value !== 'object') {
          newStoreObj[key] = value;
        } else if (!Array.isArray(value) && typeof value === 'object') {
          Object.entries(value).filter(([key, value]) => {
            newStoreObj[key] = value;
          });
        }
      });

      const columns = Object.keys(newStoreObj).join(', ');

      const values = Object.values(newStoreObj);

      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

      if (values.length !== 0) {
        const insertQuery = `INSERT INTO ${schemaName}.${tablename} (${columns}) VALUES (${placeholders}) RETURNING *;`;

        const saveObj = await getPostgresDBRef.query(insertQuery, values);

        const queryPrimaryKey = `
             SELECT column_name
             FROM information_schema.columns
             WHERE table_name = $1 AND table_schema = $2 AND column_name IN (
             SELECT column_name
             FROM information_schema.key_column_usage
             WHERE table_name = $1 AND table_schema = $2 );
        `;

        var parameter = [];

        const getPrimaryKeyArray = await getPostgresDBRef.query(
          queryPrimaryKey,
          [tablename, schemaName]
        );

        //  there is an 'id' column in the main table
        const mainObjectId = getPrimaryKeyArray.rows[0].column_name;

        const getPrimaryKeyValue = saveObj.rows[0][`${mainObjectId}`];

        // Check if the main object has arrays and process them
        for (const key in modifiedData) {
          if (Array.isArray(modifiedData[key])) {
            await processArray(modifiedData[key], key, getPrimaryKeyValue);
          }
        }
      } else {
        console.log(
          'YOU HAVE CREATED WRONG CONFIGURATION. ADD SOME FIELDS IN COLLECTION'
        );
      }
    };

    await processObject(storeObj);
  } catch (err) {
    if (err?.detail) {
      return res.json(new ApiError(400, err.detail, ''));
    }
    return res.json(new ApiError(400, err, ''));
  }
};

const insertDataInPostgresDB = async function (
  storeObj,
  tablename,
  getPostgresDBRef,
  schemaName,
  res
) {
  try {
    let newStoreObj = {};
    const processArray = async (arrayData, parentKey, primaryID) => {
      await processArrayItems(0, arrayData, parentKey, primaryID);
    };

    const processArrayItems = async (
      index,
      arrayData,
      parentKey,
      primaryID
    ) => {
      if (index < arrayData.length) {
        const item = arrayData[index];

        item.invoice_id = primaryID;

        const arrayColumns = Object.keys(item).join(', ');

        const arrayValues = Object.values(item);

        const arrayPlaceholders = arrayValues
          .map((_, i) => `$${i + 1}`)
          .join(', ');

        const arrayInsertQuery = `INSERT INTO ${schemaName}.${tablename}_${parentKey} (${arrayColumns}) VALUES (${arrayPlaceholders}) RETURNING *;`;

        const saveObj = await getPostgresDBRef.query(
          arrayInsertQuery,
          arrayValues
        );

        // Process the next array item recursively
        await processArrayItems(index + 1, arrayData, parentKey, primaryID);
      }
    };

    const processObject = async (modifiedData) => {
      await Object.entries(modifiedData).filter(([key, value]) => {
        if (!Array.isArray(value) && typeof value !== 'object') {
          newStoreObj[key] = value;
        } else if (!Array.isArray(value) && typeof value === 'object') {
          Object.entries(value).filter(([key, value]) => {
            newStoreObj[key] = value;
          });
        }
      });

      const columns = Object.keys(newStoreObj).join(', ');
      const values = Object.values(newStoreObj);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

      if (values.length !== 0) {
        const insertQuery = `INSERT INTO ${schemaName}.${tablename} (${columns}) VALUES (${placeholders}) RETURNING *;`;

        const saveObj = await executeQuery(
          insertQuery,
          getPostgresDBRef,
          values,
          res
        );

        const queryPrimaryKey = `
                    SELECT column_name
                    FROM information_schema.columns
                    WHERE table_name = $1 AND table_schema = $2 AND column_name IN (
                    SELECT column_name
                    FROM information_schema.key_column_usage
                    WHERE table_name = $1 AND table_schema = $2 );
                `;

        const parameter = [];
        const getPrimaryKeyArray = await getPostgresDBRef.query(
          queryPrimaryKey,
          [tablename, schemaName]
        );

        //  there is an 'id' column in the main table
        const mainObjectId = getPrimaryKeyArray.rows[0].column_name;
        const getPrimaryKeyValue = saveObj.rows[0][`${mainObjectId}`];

        // Check if the main object has arrays and process them
        const keys = Object.keys(modifiedData);

        await processNextStep(0, keys, modifiedData, null, getPrimaryKeyValue);
      } else {
        console.log(
          'YOU HAVE CREATED WRONG CONFIGURATION. ADD SOME FIELDS IN COLLECTION'
        );
      }
    };

    const processNextStep = async (
      index,
      keys,
      modifiedData,
      parentKey,
      getPrimaryKeyValue
    ) => {
      if (index < keys.length) {
        const key = keys[index];
        if (Array.isArray(modifiedData[key])) {
          await processArray(modifiedData[key], key, getPrimaryKeyValue);
        } else if (
          typeof modifiedData[key] === 'object' &&
          modifiedData[key] !== null
        ) {
          await processNextStep(
            0,
            Object.keys(modifiedData[key]),
            modifiedData[key],
            key,
            getPrimaryKeyValue
          );
        }

        // Process the next key recursively
        await processNextStep(
          index + 1,
          keys,
          modifiedData,
          parentKey,
          getPrimaryKeyValue
        );
      }
    };
    await processObject(storeObj);
  } catch (err) {
    console.log('hyhyhy error');
    if (err?.detail) {
      return res.json(new ApiError(400, err.detail, ''));
    }
    return res.json(new ApiError(400, err, ''));
  }
};

const updateDataInPostgresDB = async function (
  updateObj,
  condition,
  tablename,
  getPostgresDBRef,
  schemaName
) {
  try {
    var newStoreObj = {};
    // Process object to get columns, values, and placeholders
    const processObjectForUpdate = async (modifiedData) => {
      await Object.entries(modifiedData).filter(([key, value]) => {
        if (!Array.isArray(value) && typeof value !== 'object') {
          if (key !== condition.conditionColunm) {
            newStoreObj[key] = value;
          }
        } else if (!Array.isArray(value) && typeof value === 'object') {
          Object.entries(value).filter(([key, value]) => {
            newStoreObj[key] = value;
          });
        }
      });

      const updateColumns = Object.keys(newStoreObj).join(', ');

      const updateColumnsArray = Object.keys(newStoreObj);

      const updateValues = Object.values(newStoreObj);

      newStoreObj = {};

      return { updateColumns, updateValues, updateColumnsArray };
    };

    let updatedMainTable = '';

    // Update the main table
    const { updateColumns, updateValues, updateColumnsArray } =
      await processObjectForUpdate(updateObj);

    if (updateValues.length !== 0) {
      let conditionTwo = `${condition.conditionColunm} = '${condition.conditionColunmData}'`;

      // Construct the SET part of the query without commas
      const setClauseTwo = updateColumnsArray
        .map((col, index) => `${col} = $${index + 1}`)
        .join(', ');

      const updateQuery = `UPDATE ${schemaName}.${tablename} SET ${setClauseTwo} WHERE ${conditionTwo} RETURNING *;`;

      updatedMainTable = await getPostgresDBRef.query(
        updateQuery,
        updateValues
      );
    }

    const processArrayForUpdate = async (
      arrayData,
      parentKey,
      arrayCondition
    ) => {
      for (const item of arrayData) {
        item.invoice_id = condition.conditionColunmData;

        const { updateColumns, updateValues, updateColumnsArray } =
          await processObjectForUpdate(item);

        // Construct the SET part of the query without commas
        const setClause = updateColumnsArray
          .map((col, index) => `${col} = $${index + 1}`)
          .join(', ');

        // Construct the full UPDATE query
        const arrayUpdateQuery = `UPDATE ${schemaName}.${tablename}_${parentKey} SET ${setClause} WHERE ${arrayCondition} RETURNING *;`;

        await getPostgresDBRef.query(arrayUpdateQuery, [...updateValues]);
      }
    };

    // Check if the main object has arrays and process them
    for (const key in updateObj) {
      if (Array.isArray(updateObj[key])) {
        var createCondition = `invoice_id = '${condition.conditionColunmData}'`;

        await processArrayForUpdate(updateObj[key], key, createCondition);
      }
    }

    return updatedMainTable.rows;
  } catch (err) {
    console.log(err);
  }
};

async function executeQuery(query, getPostgresDBRef, values = []) {
  try {
    /*Execute the SQL query using the provided PostgreSQL database reference and optional values.*/
    const result = await getPostgresDBRef.query(query, values);

    /*  Return the rows from the query result.*/
    return result.rows;
  } catch (error) {
    /* Handle any errors that occur during the query execution.*/
    console.log('executeQuery Error:', error);

    /* Re-throw the error to be caught by the caller. */
    throw error;
  }
}

async function getAllTablesInSchema(schemaName, getPostgresDBRef) {
  /* SQL query to select table names in the specified schema from the information_schema.tables.*/
  const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = $1;`;

  try {
    /*Execute the SQL query using the provided PostgreSQL database reference and schema name and Return the array of tables*/
    return await executeQuery(query, getPostgresDBRef, [schemaName]);
  } catch (error) {
    /*  Handle any errors that occur during the query execution.*/
    console.error('getAllTablesInSchema Error:', error);

    /*Re-throw the error to be caught by the caller.*/
    throw error;
  }
}
async function getRelatedDataDynamically(
  mainTable,
  mainSchema,
  conditionValue,
  getPostgresDBRef,
  pageSize,
  offset
) {
  try {
    // Step 1: Get all tables in the main schema
    const tables = await getAllTablesInSchema(mainSchema, getPostgresDBRef);

    if (tables.length === 0) {
      console.error(`No tables found in schema ${mainSchema}`);
      return;
    }

    // Step 2: Identify the main table
    const mainTableName = mainTable;

    // Filter tables that start with the main table name
    const constraints1 = tables.filter((obj) =>
      obj.table_name.startsWith(mainTable)
    );

    // Remove the first occurrence of the main table
    const indexToRemove = constraints1.findIndex(
      (obj) => obj.table_name === mainTable
    );
    if (indexToRemove !== -1) {
      constraints1.splice(indexToRemove, 1);
    }

    // Build a string of table names for SELECT clause
    const tableNamesString =
      constraints1.map((obj) => obj.table_name).join('.*,') + '.*';

    // Get column information for the main table
    const queryColumns = `
             SELECT column_name
             FROM information_schema.columns
             WHERE table_name = $1 AND table_schema = $2 AND column_name IN (
             SELECT column_name
             FROM information_schema.key_column_usage
             WHERE table_name = $1 AND table_schema = $2
    );
        `;

    const columns = await executeQuery(queryColumns, getPostgresDBRef, [
      mainTableName,
      mainSchema,
    ]);

    const mainIdColumn = columns[0];
    const fkeyIdColumn = { column_name: 'invoice_id' };

    // Initialize the WHERE condition as an empty string
    let whereCondition = '';

    // Add a WHERE condition if columnName and columnValue are provided
    if (conditionValue !== '') {
      whereCondition = ` WHERE ${mainIdColumn.column_name} = '${conditionValue}'`;
    }

    // Construct the query to get main table data with pagination
    const mainTableQuery = `
            SELECT * FROM ${mainSchema}.${mainTableName}  ${whereCondition} LIMIT $1 OFFSET $2;
        `;

    const mainTableResult = await executeQuery(
      mainTableQuery,
      getPostgresDBRef,
      [pageSize, offset]
    );

    // Initialize an array to store the final result
    const finalResult = [];

    // Iterate through each main table row
    for (const mainTableRow of mainTableResult) {
      // Create an object for the main table row
      const resultObject = { ...mainTableRow };

      // Iterate through each related table
      for (const relatedTable of constraints1) {
        // Construct the query to get related table data
        const relatedTableQuery = `
                    SELECT * FROM ${mainSchema}.${relatedTable.table_name}
                    WHERE ${mainSchema}.${relatedTable.table_name}.${fkeyIdColumn.column_name} = $1;
                `;

        // Execute the query for the related table
        const relatedTableResult = await executeQuery(
          relatedTableQuery,
          getPostgresDBRef,
          [mainTableRow[mainIdColumn.column_name]]
        );

        // Add the related table data to the result object
        resultObject[`${relatedTable.table_name}`] = relatedTableResult;
      }

      // Push the result object to the final result array
      finalResult.push(resultObject);
    }

    return finalResult;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  executeQuery,
  getAllTablesInSchema,
  getRelatedDataDynamically,
  mapFieldTypeToPostgres,
  generateIndexQuery,
  createTableWithKeys,
  executeQueries,
  insertDataInPostgresDB,
  updateDataInPostgresDB,
};
