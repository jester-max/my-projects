
const generateSchema = function (properties) {

    const schemaObject = {};

    properties.forEach((property) => {

        const {
            key,
            type,
            isArray,
            value,
            ...otherProperties
        } = property;

        if (isArray && value) {

            schemaObject[key] = {
                type: 'array',
                items: generateSchema(value),
                // ...otherProperties,
            };
        } else if (!isArray && value) {

            schemaObject[key] = {
                type: 'object',
                properties: generateSchema(value),
                // ...otherProperties,
            };
        } else {

            schemaObject[key] = {
                type,
                ...otherProperties,
            };
        }
    });

    return schemaObject;
}
const validateField = (actaulFieldName, fieldConfig) => {


    if (!fieldConfig.type) {
        return `Invalid configuration for ${actaulFieldName}: 'type' property is required`;
    }

    if (fieldConfig.type === 'array') {

        let arrayItems = fieldConfig.items;

        delete arrayItems[undefined];


        // Validate each property of the array items
        for (const prop in arrayItems) {

            if (arrayItems.hasOwnProperty(prop)) {

                delete arrayItems['proDetails'];
                const propConfig = arrayItems[prop];

                const arrayItemValidationResult = validateField(`${actaulFieldName}.${prop}`, propConfig);

                if (arrayItemValidationResult) {
                    return arrayItemValidationResult;
                }
            }
        }

        return null;
    } else if (fieldConfig.type === 'object') {
        // Validate object type
        if (!fieldConfig.properties || typeof fieldConfig.properties !== 'object') {
            return `Invalid configuration for ${actaulFieldName}: 'properties' property is required for object type`;
        }

        const objectProperties = fieldConfig.properties;
        delete objectProperties[undefined];

        // Validate each property of the object
        for (const prop in objectProperties) {
            if (objectProperties.hasOwnProperty(prop)) {

                const propConfig = objectProperties[prop];

                const objectPropertyValidationResult = validateField(`${actaulFieldName}.${prop}`, propConfig);

                if (objectPropertyValidationResult) {
                    return objectPropertyValidationResult;
                }
            }
        }

        return null;
    } else {

    for (const fieldName in fieldConfig) {


        if (fieldConfig.hasOwnProperty(fieldName)) {

            // const fieldConfig = fieldConfig[fieldName];

            // Check for required properties
            if (fieldConfig.type === undefined) {
                throw new Error (`Missing 'type' property for field: ${actaulFieldName}`)
            }

            // Check dependencies
            if ((fieldConfig.lowercase&&!fieldConfig.uppercase) && !fieldConfig.type.includes('string')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'lowercase',
                    message:`Invalid configuration for ${actaulFieldName}: 'lowercase' is applicable only for string type and uppercase is false`
                }
                throw new Error ( JSON.stringify(obj))
            }

            if ((fieldConfig.uppercase&&!fieldConfig.lowercase) && !fieldConfig.type.includes('string')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'uppercase',
                    message:`Invalid configuration for ${actaulFieldName}: 'uppercase' is applicable only for string type lowercase is false`
                }
                throw new Error ( JSON.stringify(obj))
            }

            if (fieldConfig.trim && !fieldConfig.type.includes('string')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'trim',
                    message:`Invalid configuration for ${actaulFieldName}: 'trim' is applicable only for string type`
                }
                throw new Error ( JSON.stringify(obj))
            }

            // Add more dependency checks as needed...

            // Check boolean conditions
            if (fieldConfig.sign && !fieldConfig.type.includes('number')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'sign',
                    message:`Invalid configuration for ${actaulFieldName}: 'sign' is applicable only for number type`
                }
                throw new Error ( JSON.stringify(obj))

            }

            // Check boolean conditions
            if (fieldConfig.sign&&fieldConfig.unsign && fieldConfig.type.includes('number')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'sign',
                    message:`Invalid configuration for ${actaulFieldName}: 'select only one sign or unsign for number type`
                }
                throw new Error ( JSON.stringify(obj))

            }
            if (fieldConfig.unsign && !fieldConfig.type.includes('number')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'unsign',
                    message:`Invalid configuration for ${actaulFieldName}: 'unsign' is applicable only for number type`
                }
                throw new Error ( JSON.stringify(obj))

            }
            // Check float and integer conditions
            if (fieldConfig.float && !fieldConfig.type.includes('number')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'float',
                    message:`Invalid configuration for ${actaulFieldName}: 'float' is applicable only for number type`
                }
                throw new Error ( JSON.stringify(obj))

            }

            if (fieldConfig.int && !fieldConfig.type.includes('number')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'int',
                    message:`Invalid configuration for ${actaulFieldName}: 'int' is applicable only for number type`
                }
                throw new Error ( JSON.stringify(obj))
            }

            if (fieldConfig.celling && fieldConfig.float) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'ceiling',
                    message:`Invalid configuration for ${actaulFieldName}: 'ceiling' is applicable only for integer type`
                }
                throw new Error ( JSON.stringify(obj))
            }
            if (fieldConfig.celling &&fieldConfig.int&&fieldConfig.floor) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'ceiling',
                    message:`Invalid configuration for ${actaulFieldName}: 'select only one celling or floor for integer type`
                }
                throw new Error ( JSON.stringify(obj))
            }

            if (fieldConfig.floor && fieldConfig.float) {

                var obj = {
                    fields:actaulFieldName,
                    operation:'floor',
                    message:`Invalid configuration for ${actaulFieldName}: 'floor' is applicable only for integer type not for float`
                }
                throw new Error ( JSON.stringify(obj))
            }

            if ((fieldConfig.steps === undefined||fieldConfig.steps===0) && (fieldConfig.float)) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'steps',
                    message:`Invalid configuration for ${actaulFieldName}: 'steps' is applicable only for float type with float and greather then 0`
                }
                throw new Error ( JSON.stringify(obj))
            }

            // Add more boolean conditions as needed...

            // Check enumValues
            if(fieldConfig.enum&&fieldConfig.default!==''&&!fieldConfig.enumValues.includes(fieldConfig.default) ){
                var obj = {
                    fields:actaulFieldName,
                    operation:'default',
                    message:`Invalid configuration for ${actaulFieldName}: 'enumValues' should be match default value`
                }
                throw new Error ( JSON.stringify(obj))
            }
            if (fieldConfig.enum && (!fieldConfig.enumValues || !Array.isArray(fieldConfig.enumValues))) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'enum',
                    message:`Invalid configuration for ${actaulFieldName}: 'enumValues' should be an array when 'enum' is true`
                }
                throw new Error ( JSON.stringify(obj))
            }
            if (fieldConfig.enum &&fieldConfig.autoIncrement) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'autoIncrement',
                    message:`Invalid configuration for ${actaulFieldName}: 'enum' not with autoIncrement`
                }
                throw new Error ( JSON.stringify(obj))
            }

            // Check keys and indexes
            if (fieldConfig.primarykey && !fieldConfig.indexes) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'primarykey',
                    message:`Invalid configuration for ${actaulFieldName}: 'primarykey' and 'indexes'  used together`
                }
                throw new Error ( JSON.stringify(obj))

            }
            // Check candidate key
            // if (fieldConfig.ckey && fieldConfig.required===false||fieldConfig.unique===false) {
            //     throw new Error ( `Invalid configuration for ${actaulFieldName}: 'ckey' and 'require' and unique to be used together`)
            // }
            // Check foreign key
            if (fieldConfig.fkey && fieldConfig.unique&&!fieldConfig.required) {
                throw new Error ( `Invalid configuration for ${actaulFieldName}: 'fkey' requires requires and not to be set to true with unique`)
            }


            // Check unique property
            if (fieldConfig.unique && !fieldConfig.indexes) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'indexes',
                    message:`Invalid configuration for ${actaulFieldName}: 'unique' requires 'indexes' to be set to true`
                }
                throw new Error ( JSON.stringify(obj))

            }

            // Check for auto-increment conflicts
            if (fieldConfig.autoIncrement && fieldConfig.type.includes('string')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'autoIncrement',
                    message:`Invalid configuration for ${actaulFieldName}: 'autoIncrement' not be set to true with type string`
                }
                throw new Error ( JSON.stringify(obj))
            }

            // Check for min and max conflicts
            if ((fieldConfig.min !== 0 || fieldConfig.max !== 0) && !fieldConfig.type.includes('number')) {
                throw new Error ( `Invalid configuration for ${actaulFieldName}: 'min' and 'max' are applicable only for number type`)
            }

            // Check for min and max conflicts
            if ((fieldConfig.min >=0&& fieldConfig.max < fieldConfig.min ) && fieldConfig.type.includes('number')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'min',
                    message:`Invalid configuration for ${actaulFieldName}: 'min' and 'max' are not same and always max is greather`
                }
                throw new Error ( JSON.stringify(obj))

            }
            // Check for min and max conflicts
            if ((fieldConfig.min === fieldConfig.max) && fieldConfig.type.includes('number')) {
                var obj = {
                    fields:actaulFieldName,
                    operation:'min',
                    message:`Invalid configuration for ${actaulFieldName}: 'min' and 'max' are not same `
                }
                throw new Error ( JSON.stringify(obj))

            }

            // Check for minlength and maxlength conflicts

            if (
                (fieldConfig.minlength !== undefined || fieldConfig.maxlength !== undefined) &&
                !['string', 'number','email','date'].some(type => fieldConfig.type.includes(type))
            ) {
                throw new Error ( `Invalid configuration for ${actaulFieldName}: 'minlength' and 'maxlength' are applicable only for string or number type`)
            }

            // Add more checks as needed...
        }
    }

    return null; // Schema validation successful
    }
};
const validateSchema = (schemaObject) => {

    // Perform validation for each field in the schema
    for (const fieldName in schemaObject) {

        if (schemaObject.hasOwnProperty(fieldName)) {

            const fieldConfig = schemaObject[fieldName];

            const fieldValidationResult = validateField(fieldName, fieldConfig);

            if (fieldValidationResult) {
                return fieldValidationResult;
            }
        }
    }

    return null; // Schema validation successful
};



const validateFieldsData = (schema, data) => {

    const validatedData = {};

        Object.keys(schema).forEach((fieldName) => {

            // Check if the field exists in the data
            if (data.hasOwnProperty(fieldName)) {



                const fieldValidation = validateFieldData(fieldName, data[fieldName], schema[fieldName]);
                validatedData[fieldName] = fieldValidation;
            } else {
                // Handle missing field based on your requirements (throw an error, set a default, etc.)
                // For now, let's set it to null
                // validatedData[fieldName] = null;
            }
        });
        return validatedData;
};




const validateFieldData = (fieldName, fieldValue, fieldConfig) => {

    if (!fieldConfig) {
        // Handle the case where the field configuration is not provided
        throw new Error(`Configuration not found for field: ${fieldName}`);
    }

    if (fieldConfig.required &&fieldConfig.type === 'number'&& (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        throw new Error(`${fieldName} is required.`);
    }
    if (fieldConfig.required &&fieldConfig.type === 'string'&& (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        throw new Error(`${fieldName} is required.`);
    }
    if (fieldConfig.type === 'number') {

        if (typeof fieldValue === 'number' && isNaN(fieldValue)) {
            throw new Error(`${fieldName} must be a number.`);
        }
        if (fieldValue==='') {

            fieldValue = fieldConfig.default
        }

        // Additional numeric validations
        if (fieldConfig.min !== undefined && fieldValue < fieldConfig.min) {
            throw new Error(`${fieldName} must be greater than or equal to ${fieldConfig.min}.`);
        }
        if (fieldConfig.max !== undefined && fieldValue > fieldConfig.max) {
            throw new Error(`${fieldName} must be less than or equal to ${fieldConfig.max}.`);
        }

        if (fieldConfig.float && !Number.isInteger(fieldValue)) {
            throw new Error(`${fieldName} must be a float.`);
        }

    }else if (fieldConfig.type === 'string') {
        // Validate string fields
        if (typeof fieldValue !== 'string') {
            throw new Error(`${fieldName} must be a string.`);
        }

        // Additional string validations
        if (fieldConfig.minLength !== undefined && fieldValue.length < parseInt(fieldConfig.minLength)) {
            throw new Error(`${fieldName} must have a length greater than or equal to ${fieldConfig.minLength}.`);
        }

        if (fieldConfig.maxLength !== undefined && fieldValue.length > parseInt(fieldConfig.maxLength)) {
            throw new Error(`${fieldName} must have a length less than or equal to ${fieldConfig.maxLength}.`);
        }
        if (fieldValue==='') {

            fieldValue = fieldConfig.default
        }
        if (fieldConfig.lowercase) {
            fieldValue = fieldValue.toLowerCase()
        }
        if (fieldConfig.uppercase) {
            fieldValue = fieldValue.toUpperCase()

        }
        if (fieldConfig.trim) {
            fieldValue = fieldValue.trim()

        }

    } else if (fieldConfig.type === 'array') {
        if (!Array.isArray(fieldValue)) {
            throw new Error(`${fieldName} must be an array.`);
        }

        const validatedArray = fieldValue.map((item, index) => {
            return validateFieldsData(fieldConfig.items, item);
        });

        return validatedArray;
    } else if (fieldConfig.type === 'object') {

            return validateFieldsData(fieldConfig.properties, fieldValue);
    }

    return fieldValue;
};



module.exports = {generateSchema,validateSchema,validateFieldsData}






