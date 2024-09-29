const express = require('express');
const cors = require('cors');
var morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express();

// Import router manager
const connectRouters = require('./routers/manage.router');

app.set('view engine','ejs')
app.use(express.json());
app.use(morgan('tiny'))
app.use(cookieParser())

app.use(cors());


// Connect all routers through the router manager
connectRouters(app);

/* exports app object */
module.exports = app;

//
// const _ = require('lodash');
//
// function compareSchemas(oldSchema, newSchema) {
//     const addedFields = _.difference(Object.keys(newSchema), Object.keys(oldSchema));
//     const removedFields = _.difference(Object.keys(oldSchema), Object.keys(newSchema));
//
//     const modifiedFields = _.reduce(oldSchema, (result, value, key) => {
//         if (_.isObject(value) && _.isObject(newSchema[key])) {
//             const nestedChanges = compareSchemas(value, newSchema[key]);
//             if (!_.isEmpty(nestedChanges.added) || !_.isEmpty(nestedChanges.removed) || !_.isEmpty(nestedChanges.modified)) {
//                 result[key] = nestedChanges;
//             }
//         } else if (!_.isEqual(value, newSchema[key])) {
//             result[key] = { oldValue: value, newValue: newSchema[key] };
//         }
//         return result;
//     }, {});
//
//     return { added: addedFields, removed: removedFields, modified: modifiedFields };
// }
//
// // Example usage
// const oldSchema = {
//     invID: {
//         type: 'number',
//         enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//     },
//     newField: {
//         type: 'string',
//     },
//     nestedObject: {
//         nestedField:{
//             type: 'number',
//             enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//         },
//         nestedField2: {
//             type: 'number',
//             enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//         },
//     },
// };
//
// const newSchema = {
//     invID: {
//         type: 'string',
//         default:'PUNJAB BANK',
//         trim:true,
//         enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//     },
//     nestedObject: {
//         nestedField:{
//             type: 'number',
//             default:'BANK OF INDIA',
//             enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//         },
//         nestedField2: {
//             type: 'number',
//             enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//         },
//     },
//     nestedArray: [
//         {
//             arrayField: {
//                 type: 'number',
//                 enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//             },
//             arrayField2: {
//                 type: 'number',
//                 enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//             }
//             },
//     ],
//     invID2: {
//         type: 'number',
//         enumValues: ['BANK OF INDIA', 'STATE BANK', 'PUNJAB BANK', 'ICICI BANK'],
//     },
//     newField: {
//         type: 'string',
//     },
// };
//
// const changes = compareSchemas(oldSchema, newSchema);
// console.log('Added fields:', changes.added);
// // console.log('Removed fields:', changes.removed);
// // console.log('Modified fields:', changes.modified);





/*const createTable = async (tableName, dataObject, parentColumnName = null,fkey) => {
    var index = true
    const columns = await Promise.all(Object.keys(dataObject).map(async key => {

        const columnName = parentColumnName ? `${parentColumnName}_${key.toLowerCase()}` : key;

        if (Array.isArray(dataObject[key]) && dataObject[key].length > 0 && typeof dataObject[key][0] === 'object') {
            // Create a separate table for arrays of objects

            const subTableName = `${tableName}_${key.toLowerCase()}`;
            await createTable(subTableName, dataObject[key][0],null,`${tableName} INTEGER REFERENCES ${tableName}(id)[]`);
            // return `${key} INTEGER REFERENCES ${subTableName}(id)[]`;
        } else if (typeof dataObject[key] === 'object' && !Array.isArray(dataObject[key])) {
            if (key === 'custDetails') {
                // Handle custDetails object separately and add its properties as columns
                const custDetailsColumns = await createTable(tableName, dataObject[key], columnName);
                return custDetailsColumns;
            } else {
                // Flatten nested objects and add columns directly in the main table
                await createTable(tableName, dataObject[key], columnName);
            }
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
        const query = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${columns.join(', ')},
        id SERIAL PRIMARY KEY
      )
    `;
        // await db.none(query);
        console.log(`Table ${tableName} created successfully`,query);
    }

    return columns.join(', ');
};

const exampleData = {
    invoiceNumber: 1,
    invoiceID: 'HPGI_01',
    invoiceDate: 'HPGI_01',
    proDetails: [{ productName: 'pencil', productHsnCode: '1234' }],

};

const tableName = `invoice`;
const tableCreationQuery = createTable(tableName, exampleData);

console.log(tableCreationQuery)*/

// // Example usage
// const actualData = {
//     invoiceNumber: 1,
//     invoiceID: 'HPGI_01',
//     customerName: '123456',
//     customerGST: '123456',
//     customer:{
//         customerName: '123456',
//         customerGST: '123456',
//     },
//     prodetails: [
//         { productname: 'pen', hsncode: '12', hsncod: '12' },
//         { productname: 'pencil', hsncode: '1234', hsncod: '12' },
//         { productname: 'pencil', hsncode: '1234', hsncod: '12' },
//     ],
// };
//
// // Dynamically determine the main table and related tables
// const mainTableName = Object.keys(actualData);
// const mainTableData = actualData[mainTableName];
//
// console.log(mainTableName)

// const actualData = {
//     invoiceNumber: 1,
//     invoiceID: 'HPGI_01',
//     // customerName: '123456',
//     // customerGST: '123456',
//     customer: {
//         customerName: '123456',
//         customerGST: '123456',
//     },
//     prodetails: [
//         { productname: 'pen', hsncode: '12', hsncod: '12' },
//         { productname: 'pencil', hsncode: '1234', hsncod: '12' },
//         { productname: 'pencil', hsncode: '1234', hsncod: '12' },
//     ],
// };
//
// var obj ={}
//
// // Extract key-value pairs without array key and values
// const filteredKeyValuePairs = Object.entries(actualData).filter(([key, value]) => {
//      if(!Array.isArray(value) && typeof value !== 'object'){
//          obj[key] = value
//      }else if(!Array.isArray(value) && typeof value === 'object'){
//
//          Object.entries(value).filter(([key, value]) => {
//              obj[key] = value
//          })
//      }
//
// });
//
// console.log('Filtered Key-Value Pairs:', obj);

// const originalString = "maheshnayak";
// const substringToRemove = "mahesh";
//
// const modifiedString = originalString.replace(substringToRemove, '');
//
// console.log(modifiedString);


// const originalString = "CREATE TABLE IF NOT EXISTS sale_invoice ( , ,bdffdbdfbdf text, ,  id SERIAL PRIMARY KEY, , ,qnvNum TEXT)";
//
// // Remove extra commas and empty strings
// const cleanedString = originalString.replace(/,+/g, ',').replace(/( ,)+/g, '');
//
// console.log(cleanedString)


const actualData = {
    'invoice Number': 1,
    'invoice ID': 'HPGI_01',
    // customerName: '123456',
    // customerGST: '123456',
    'customer info': {
        'customer Name': '123456',
        'customer GST': '123456',
    },
    'customer details': [
        { 'customer Name': '123456', 'customer GST': '123456' },
        { 'customer Name': '123456', 'customer GST': '123456' },
        // Add more objects if needed
    ],
};

// Function to remove spaces in keys of an object
const removeSpacesInKeys = (obj) => {
    const result = {};

    // Iterate through each key in the object
    for (const key in obj) {
        // Check if the key is a direct property of the object (not from the prototype chain)
        if (obj.hasOwnProperty(key)) {
            // Remove spaces from the key using a regular expression
            const newKey = key.replace(/\s/g, '');
            // Get the value associated with the current key
            const value = obj[key];

            // Check if the value is an object (and not null)
            if (typeof value === 'object' && value !== null) {
                // Recursively call the function for arrays or nested objects
                if (Array.isArray(value)) {
                    // Convert array to an object without indices
                    result[newKey] = value.map((item) => removeSpacesInKeys(item));
                } else {
                    // Recursively call the function for nested objects
                    result[newKey] = removeSpacesInKeys(value);
                }
            } else {
                // For non-object values, simply assign the value to the new key
                result[newKey] = value;
            }
        }
    }

    // Return the modified object
    return result;
};

// Call the function to remove spaces in keys for the given object
const modifiedData = removeSpacesInKeys(actualData);

// Log the modified object to the console
// console.log(modifiedData);
