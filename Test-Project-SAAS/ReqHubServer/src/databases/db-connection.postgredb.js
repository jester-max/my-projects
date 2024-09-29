const { Client } = require('pg');

const connect = async function (dbName) {
    try {

        dbName = dbName.toLowerCase();

        const client = new Client({
            host: 'localhost',
            port: 5432,
            database: 'postgres', // Connect to the default database
            user: 'postgres',
            password: '1234'
        });

        await client.connect();

        // Note: Enclose dbName in single quotes
        const createDbQuery = `SELECT CASE WHEN EXISTS (SELECT 1 FROM pg_database WHERE datname = '${dbName}') THEN 1 ELSE 0 END;`;

        const result = await client.query(createDbQuery);

        const existsDB = result.rows[0].case;

      if(existsDB===1){
          // Connect to the specified database
          const newClient = new Client({
              host: 'localhost',
              port: 5432,
              database: dbName,
              user: 'postgres',
              password: '1234'
          });

          await newClient.connect();

          return newClient;
      }else{

          const createDbQuery = `CREATE DATABASE ${dbName}`;
          await client.query(createDbQuery);

          // Connect to the specified database
          const newClient = new Client({
              host: 'localhost',
              port: 5432,
              database: dbName,
              user: 'postgres',
              password: '1234'
          });

          await newClient.connect();

          return newClient;

      }
    } catch (err) {

        throw err; // Re-throw the error to indicate failure
    }
};


module.exports = {
    connect,
};
