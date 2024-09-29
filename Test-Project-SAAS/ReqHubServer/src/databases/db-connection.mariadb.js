const mariadb = require('mariadb');

const connect = async function (dbName) {
  try {
    const pool = mariadb.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '1234',
      connectionLimit: 5,
    });

    pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);

    const pool2 = mariadb.createPool({
      host: '127.0.0.1',
      user: 'root',
      password: '1234',
      connectionLimit: 5,
      database: dbName,
    });

    var dbconn2 = await pool2.getConnection();

    // Perform database operations with dbconn2
    dbconn2.release(); // Release the connection back to the pool

    return dbconn2;
  } catch (err) {
    console.log('errorr is: ', err);
  }
};

module.exports = {
  connect,
};

//
// const mariadb = require('mariadb');
//
// const connect =async function (dbName)  {
//     try{
//         const pool = await mariadb.createPool({
//             host: '127.0.0.1',
//             user: 'root',
//             password: '1234',
//             connectionLimit: 5,
//         })
//
//         const connObj = await pool.getConnection();
//
//        return await connObj.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
//
//
//     }catch (err) {
//         console.log("errorr is: ",err)
//     }
//
// };
//
//
//
//
// module.exports = {
//     connect
// }
