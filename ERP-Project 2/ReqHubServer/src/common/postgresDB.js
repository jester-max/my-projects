/* Define an asynchronous function to execute a database query */
async function executeQuery(query, getPostgresDBRef, values = []) {
  /*Execute the query using the provided PostgreSQL database reference */
  const result = await getPostgresDBRef.query(query, values);

  /*  Return the rows from the query result*/
  return result.rows;
}

/*
   Define another asynchronous function for inserting data into the PostgreSQL database
   Initialize an empty object to store data
*/
const insertDataInPostgresDB2 = async function (
  storeObj,
  tablename,
  getPostgresDBRef,
  schemaName,
  res
) {
  let newStoreObj = {};

  /*
        Define an asynchronous function to process an array of data
        Start processing array items from index 0
    */
  const processArray = async (arrayData, parentKey, primaryID) => {
    await processArrayItems(0, arrayData, parentKey, primaryID);
  };

  /*
        Define an asynchronous function to process individual array items
        Check if there are more items to process
    */
  const processArrayItems = async (index, arrayData, parentKey, primaryID) => {
    if (index < arrayData.length) {
      /* Get the current array item*/
      const item = arrayData[index];

      /* Add the invoice_id property to the current array item*/
      item.invoice_id = primaryID;

      /*Create a string of column names for the INSERT query*/
      const arrayColumns = Object.keys(item).map(key => `"${key}"`).join(', ');
      // const arrayColumns = Object.keys(item).join(', ');

      /*Create an array of values for the INSERT query*/
      const arrayValues = Object.values(item);

      /* Create a string of placeholders for the INSERT query*/
      const arrayPlaceholders = arrayValues
        .map((_, i) => `$${i + 1}`)
        .join(', ');

       let parentKeySub = parentKey.replace(/\s/g, '');

       parentKeySub = parentKeySub.toLowerCase();

      /*Create the INSERT query for the array item*/
      const arrayInsertQuery = `INSERT INTO ${schemaName}.${tablename}_${parentKeySub} (${arrayColumns}) VALUES (${arrayPlaceholders}) RETURNING *;`;

      /* Execute the INSERT query for the array item*/
      const saveObj = await executeQuery(
        arrayInsertQuery,
        getPostgresDBRef,
        arrayValues
      );

      /*Process the next array item recursively*/
      await processArrayItems(index + 1, arrayData, parentKey, primaryID);
    }
  };

  /*
        Define an asynchronous function to process an object of modified data
        Filter and iterate over key-value pairs of modifiedData
    */
  const processObject = async (modifiedData) => {
    await Object.entries(modifiedData).filter(([key, value]) => {
      if (!Array.isArray(value) && typeof value !== 'object') {
        /*  Add the key-value pair to newStoreObj*/
        newStoreObj[key] = value;
      } else if (!Array.isArray(value) && typeof value === 'object') {
        /* If the value is an object, iterate over its key-value pairs*/
        Object.entries(value).filter(([key, value]) => {
          /* Add the key-value pair to newStoreObj*/
          newStoreObj[key] = value;
        });
      }
    });

    /* Create a string of column names for the main INSERT query*/
    const columns = Object.keys(newStoreObj).map(key => `"${key}"`).join(', ');
    // const columns = Object.keys(newStoreObj).join(', ');
    // const columns = Object.keys(newStoreObj)
    //     .map(key => `"${key.toLowerCase()}"`)
    //     .join(', ');

    /*Create an array of values for the main INSERT query*/
    const values = Object.values(newStoreObj);
    /*Create a string of placeholders for the main INSERT query*/
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');



    /*Check if there are values to insert*/
    if (values.length !== 0) {
      /*Create the main INSERT query*/
      const insertQuery = `INSERT INTO ${schemaName}.${tablename} (${columns}) VALUES (${placeholders}) RETURNING *;`;

      /*Execute the main INSERT query*/
      const saveObj = await executeQuery(insertQuery, getPostgresDBRef, values);

      /* Create a query to retrieve the primary key column name*/
      const queryPrimaryKey = `
                SELECT column_name
                FROM information_schema.columns
                WHERE table_name = $1 AND table_schema = $2 AND column_name IN (
                SELECT column_name
                FROM information_schema.key_column_usage
                WHERE table_name = $1 AND table_schema = $2 );
            `;

      /*Execute the query to retrieve the primary key column name*/
      const getPrimaryKeyArray = await getPostgresDBRef.query(queryPrimaryKey, [
        tablename,
        schemaName,
      ]);

      /* Get the primary key column name*/
      const mainObjectId = getPrimaryKeyArray.rows[0].column_name;

      /*Get the primary key value from the result of the main INSERT query*/
      const getPrimaryKeyValue = saveObj[0][`${mainObjectId}`];

      /* Check if the main object has arrays and process them*/
      const keys = Object.keys(modifiedData);

      /*Start processing the next step of data*/
      await processNextStep(0, keys, modifiedData, null, getPrimaryKeyValue);
    } else {
      /* Log an error message if there are no values to insert*/
      console.log(
        'YOU HAVE CREATED WRONG CONFIGURATION. ADD SOME FIELDS IN COLLECTION'
      );
    }
  };

  /*
        Define an asynchronous function to process the next step of data
        Check if there are more keys to process
    */
  const processNextStep = async (
    index,
    keys,
    modifiedData,
    parentKey,
    getPrimaryKeyValue
  ) => {
    if (index < keys.length) {
      /* Get the current key*/
      const key = keys[index];

      /*Check if the value corresponding to the key is an array*/
      if (Array.isArray(modifiedData[key])) {
        /* Process the array data*/
        await processArray(modifiedData[key], key, getPrimaryKeyValue);
      }

      /*Process the next key recursively*/
      await processNextStep(
        index + 1,
        keys,
        modifiedData,
        parentKey,
        getPrimaryKeyValue
      );
    }
  };

  /* Start processing the object of modified data*/
  await processObject(storeObj);
};

const updateDataInPostgresDB2 = async function (
  updateObj,
  condition,
  tablename,
  getPostgresDBRef,
  schemaName
) {
  let newStoreObj = {};
  let conditionTwo = '';

  /*
        Define an asynchronous function to process an array of data
        Start processing array items from index 0
    */
  const processArray = async (arrayData, parentKey, getPrimaryKeyValue) => {
    await processArrayItems(0, arrayData, parentKey, getPrimaryKeyValue);
  };

  /*
        Define an asynchronous function to process individual array items
        Check if there are more items to process
    */
  const processArrayItems = async (
    index,
    arrayData,
    parentKey,
    getPrimaryKeyValue
  ) => {
    if (index < arrayData.length) {
      /* Get the current array item*/
      const item = arrayData[index];

      /* Add the invoice_id property to the current array item*/
      item.invoice_id = condition.conditionColunmData;

      /*Create a string of column names for the INSERT query*/
      const arrayColumns = Object.keys(item);

      /*Create an array of values for the INSERT query*/
      const arrayValues = Object.values(item);

      // Construct the SET part of the query without commas
      const setClauseTwo = arrayColumns
        .map((col, index) => `"${col}" = $${index + 1}`)
        .join(', ');

      let parentKeySub = parentKey.replace(/\s/g, '');

      parentKeySub = parentKeySub.toLowerCase();

      /*Create the update query for the array item*/
      const updateQuery = `UPDATE ${schemaName}.${tablename}_${parentKeySub} SET ${setClauseTwo} WHERE ${conditionTwo} RETURNING *;`;

      /* Execute the INSERT query for the array item*/
      const updateObj = await executeQuery(
        updateQuery,
        getPostgresDBRef,
        arrayValues
      );

      console.log(updateQuery,arrayValues,'arrayValues')

      /*Process the next array item recursively*/
      await processArrayItems(
        index + 1,
        arrayData,
        parentKey,
        getPrimaryKeyValue
      );
    }
  };

  /*
        Define an asynchronous function to process an object of modified data
        Filter and iterate over key-value pairs of modifiedData
    */
  const processObject = async (modifiedData) => {
    await Object.entries(modifiedData).filter(([key, value]) => {
      if (!Array.isArray(value) && typeof value !== 'object') {
        /*  Add the key-value pair to newStoreObj*/
        newStoreObj[key] = value;
      } else if (!Array.isArray(value) && typeof value === 'object') {
        /* If the value is an object, iterate over its key-value pairs*/
        Object.entries(value).filter(([key, value]) => {
          /* Add the key-value pair to newStoreObj*/
          newStoreObj[key] = value;
        });
      }
    });

    /* Create a string of column names for the main INSERT query*/
    const columns = Object.keys(newStoreObj);
    /*Create an array of values for the main INSERT query*/
    const values = Object.values(newStoreObj);

    /*Create a string of placeholders for the main update query */
    const setClauseTwo = columns
      .map((col, index) => `"${col}" = $${index + 1}`)
      .join(', ');

    /*Check if there are values to insert*/
    if (values.length !== 0) {
      conditionTwo = `${condition.conditionColunm} = '${condition.conditionColunmData}'`;

      /*Create the main update query*/
      const updateQuery = `UPDATE ${schemaName}.${tablename} SET ${setClauseTwo} WHERE ${conditionTwo} RETURNING *;`;

      /*Execute the main INSERT query*/
      const updateObj = await executeQuery(
        updateQuery,
        getPostgresDBRef,
        values
      );

      /* Check if the main object has arrays and process them*/
      const keys = Object.keys(modifiedData);

      /*Start processing the next step of data*/
      await processNextStep(0, keys, modifiedData, null, conditionTwo);
    } else {
      /* Log an error message if there are no values to insert*/
      console.log(
        'YOU HAVE CREATED WRONG CONFIGURATION. ADD SOME FIELDS IN COLLECTION'
      );
    }
  };

  /*
        Define an asynchronous function to process the next step of data
        Check if there are more keys to process
    */
  const processNextStep = async (
    index,
    keys,
    modifiedData,
    parentKey,
    getPrimaryKeyValue
  ) => {
    if (index < keys.length) {
      /* Get the current key*/
      const key = keys[index];

      /*Check if the value corresponding to the key is an array*/
      if (Array.isArray(modifiedData[key])) {
        /* Process the array data*/
        await processArray(modifiedData[key], key, getPrimaryKeyValue);
      }

      /*Process the next key recursively*/
      await processNextStep(
        index + 1,
        keys,
        modifiedData,
        parentKey,
        getPrimaryKeyValue
      );
    }
  };

  /* Start processing the object of modified data*/
  await processObject(updateObj);
};

module.exports = {
  executeQuery,
  insertDataInPostgresDB2,
  updateDataInPostgresDB2,
};
