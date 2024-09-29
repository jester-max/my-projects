/* Function to remove spaces in keys of an object */
const removeSpacesInKeys = function (obj) {
  const result = {};

  /* Iterate through each key in the object*/
  for (const key in obj) {
    /*  Check if the key is a direct property of the object (not from the prototype chain)*/
    if (obj.hasOwnProperty(key)) {
      /*  Remove spaces from the key using a regular expression*/
      const newKey = key.replace(/\s/g, '');
      /* Get the value associated with the current key*/
      const value = obj[key];

      /*Check if the value is an object (and not null)*/
      if (typeof value === 'object' && value !== null) {
        /* Recursively call the function for arrays or nested objects*/
        if (Array.isArray(value)) {
          /*Convert array to an object without indices*/
          result[newKey] = value.map((item) => removeSpacesInKeys(item));
        } else {
          /*Recursively call the function for nested objects*/
          result[newKey] = removeSpacesInKeys(value);
        }
      } else {
        /*For non-object values, simply assign the value to the new key*/
        result[newKey] = value;
      }
    }
  }

  /* Return the modified object*/
  return result;
};

/*const validateField = function (actaulFieldName, fieldConfig)  {


    if (!fieldConfig.type) {
        return `Invalid configuration for ${actaulFieldName}: 'type' property is required`;
    }

    if (fieldConfig.type === 'array') {

        let arrayItems = fieldConfig.items;

        delete arrayItems[undefined];


        /!*Validate each property of the array items*!/
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
                    var obj = {
                        fields:actaulFieldName,
                        operation:'all fiedls empty',
                        message:`Missing 'type' property for field: ${actaulFieldName}`
                    }
                    throw new Error ( JSON.stringify(obj))
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
                    var obj = {
                        fields:actaulFieldName,
                        operation:'fkey',
                        message:`Invalid configuration for ${actaulFieldName}: 'fkey' requires requires and not to be set to true with unique`
                    }
                    throw new Error ( JSON.stringify(obj))
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
                    var obj = {
                        fields:actaulFieldName,
                        operation:'min',
                        message:`Invalid configuration for ${actaulFieldName}: 'min' and 'max' are applicable only for number type`
                    }
                    // throw new Error ( JSON.stringify(obj))
                    throw new Error (`Invalid configuration for ${actaulFieldName}: 'min' and 'max' are applicable only for number type` ,actaulFieldName)


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

                    throw new Error (JSON.stringify(obj))



                }

                // Check for minlength and maxlength conflicts

                if (
                    (fieldConfig.minlength !== undefined || fieldConfig.maxlength !== undefined) &&
                    !['string', 'number','email','date'].some(type => fieldConfig.type.includes(type))
                ) {
                    var obj = {
                        fields:actaulFieldName,
                        operation:'minlength',
                        message:`Invalid configuration for ${actaulFieldName}: 'minlength' and 'maxlength' are applicable only for string or number type\` `
                    }
                    throw new Error ( JSON.stringify(obj))

                }

                // Add more checks as needed...
            }
        }

        return null; // Schema validation successful
    }
};*/

// Define the CustomValidationError class
class CustomValidationError extends Error {
  constructor(fieldName, message) {
    super(`Invalid configuration for ${fieldName}: ${message}`);
    this.name = 'CustomValidationError';
    this.fields = fieldName;
    this.message = `${message}`;
    // this.message = `Invalid configuration for ${fieldName}: ${message}`;
  }
}

const createError = (actualFieldName, message) => {
  throw new CustomValidationError(actualFieldName, message);
};

const validateField = function (
  actaulFieldName,
  fieldConfig,
  primaryKeyEncountered = false
) {
  if (!fieldConfig.type) {
    return createError(
      actaulFieldName,
      'all fiedls empty',
      `'type' property is required`
    );
  }
  if (fieldConfig.primarykey) {
    if (actaulFieldName !== 'invoice_id') {
      return createError(
        actaulFieldName,
        `'primarykey' must contain name is  invoice_id`
      );
    }

    if (primaryKeyEncountered) {
      return createError(
        actaulFieldName,
        `'primarykey' should be specified only once`
      );
    }

    // Add specific terms and conditions for the primary key
    if (fieldConfig.unique !== true) {
      return createError(
        actaulFieldName,
        `'primarykey' must be used with 'unique' set to true`
      );
    }

    if (fieldConfig.required !== true) {
      return createError(actaulFieldName, `'primarykey' must be required`);
    }

    // Add more terms and conditions for the primary key as needed...

    // Update the flag to indicate that a primary key has been encountered
    primaryKeyEncountered = true;
  }
  if (fieldConfig.fkey) {
    if (
      fieldConfig.moduleName.length === 0 ||
      fieldConfig.subModuleName.length === 0 ||
      fieldConfig.primaryKey2.length === 0
    ) {
      return createError(
        actaulFieldName,
        `'moduleName ,subModuleName ,primaryKey2 are required`
      );
    }
  }

  if (fieldConfig.type === 'array') {
    const arrayItems = fieldConfig.items;

    delete arrayItems[undefined];

    /*Validate each property of the array items*/
    for (const prop in arrayItems) {
      if (arrayItems.hasOwnProperty(prop)) {
        delete arrayItems['proDetails'];
        const propConfig = arrayItems[prop];
        const arrayItemValidationResult = validateField(
          `${actaulFieldName}.${prop}`,
          propConfig,
          (primaryKeyEncountered = true)
        );

        if (arrayItemValidationResult) {
          return arrayItemValidationResult;
        }
      }
    }

    return null;
  } else if (fieldConfig.type === 'object') {
    // Validate object type
    if (!fieldConfig.properties || typeof fieldConfig.properties !== 'object') {
      return createError(
        actaulFieldName,
        'properties',
        `'properties' property is required for object type`
      );
    }

    const objectProperties = fieldConfig.properties;
    delete objectProperties[undefined];

    // Validate each property of the object
    for (const prop in objectProperties) {
      if (objectProperties.hasOwnProperty(prop)) {
        const propConfig = objectProperties[prop];
        const objectPropertyValidationResult = validateField(
          `${actaulFieldName}.${prop}`,
          propConfig
        );

        if (objectPropertyValidationResult) {
          return objectPropertyValidationResult;
        }
      }
    }

    return null;
  } else {
    for (const fieldName in fieldConfig) {
      if (fieldConfig.hasOwnProperty(fieldName)) {
        const fieldType = fieldConfig.type;

        // Check for required properties
        if (fieldType === undefined) {
          createError(actaulFieldName, `'type' property is required`);
        }

        // Check dependencies
        const hasLowercase = fieldConfig.lowercase;
        const hasUppercase = fieldConfig.uppercase;
        const isStringType = fieldType.includes('string');

        if (
          (hasLowercase && !hasUppercase) ||
          (hasUppercase && !hasLowercase && !isStringType)
        ) {
          createError(
            actaulFieldName,
            `'lowercase' is applicable only for string type and uppercase is false`
          );
        }

        if (
          (hasUppercase && !hasLowercase) ||
          (hasLowercase && !hasUppercase && !isStringType)
        ) {
          createError(
            actaulFieldName,
            `'uppercase' is applicable only for string type and lowercase is false`
          );
        }

        // Add more dependency checks as needed...

        // Check boolean conditions
        if (fieldConfig.sign && !fieldType.includes('number')) {
          createError(
            actaulFieldName,
            `'sign' is applicable only for number type`
          );
        }

        // Check boolean conditions
        if (
          fieldConfig.sign &&
          fieldConfig.unsign &&
          fieldType.includes('number')
        ) {
          createError(
            actaulFieldName,
            `'select only one sign or unsign for number type`
          );
        }

        if (fieldConfig.unsign && !fieldType.includes('number')) {
          createError(
            actaulFieldName,
            `'unsign' is applicable only for number type`
          );
        }

        // Check float and integer conditions
        if (fieldConfig.float && !fieldType.includes('number')) {
          createError(
            actaulFieldName,
            `'float' is applicable only for number type`
          );
        }

        if (fieldConfig.int && !fieldType.includes('number')) {
          createError(
            actaulFieldName,
            `'int' is applicable only for number type`
          );
        }

        if (
          fieldConfig.celling &&
          fieldConfig.float &&
          !fieldType.includes('number')
        ) {
          createError(
            actaulFieldName,
            `'ceiling' is applicable only for number type`
          );
        }

        if (fieldConfig.celling && fieldConfig.int && fieldConfig.floor) {
          createError(
            actaulFieldName,
            `'select only one celling or floor for number type`
          );
        }

        if (fieldConfig.floor && fieldConfig.float) {
          createError(
            actaulFieldName,
            `'floor' is applicable only for number type not for float`
          );
        }

        if (
          (fieldConfig.steps === undefined || fieldConfig.steps === 0) &&
          fieldConfig.float
        ) {
          createError(
            actaulFieldName,
            `'steps' is applicable only for float type with float and greater than 0`
          );
        }

        // Add more boolean conditions as needed...

        // Check enumValues
        const hasEnum = fieldConfig.enum;
        const hasDefault = fieldConfig.default !== '';
        const hasEnumValues = fieldConfig.enumValues;

        if (
          hasEnum &&
          hasDefault &&
          !hasEnumValues.includes(fieldConfig.default)
        ) {
          createError(
            actaulFieldName,
            `'enumValues' should be match default value`
          );
        }

        if (hasEnum && (!hasEnumValues || !Array.isArray(hasEnumValues))) {
          createError(
            actaulFieldName,
            `'enumValues' should be an array when 'enum' is true`
          );
        }

        if (hasEnum && fieldConfig.autoIncrement) {
          createError(actaulFieldName, `'enum' not with autoIncrement`);
        }

        // Check keys and indexes
        const hasPrimaryKey = fieldConfig.primarykey;
        const hasIndexes = fieldConfig.indexes;

        if (hasPrimaryKey && !hasIndexes) {
          createError(
            actaulFieldName,
            `'primarykey' and 'indexes' used together`
          );
        }

        // Check candidate key
        // if (fieldConfig.ckey && fieldConfig.required===false||fieldConfig.unique===false) {
        //     createError(actaulFieldName, 'ckey', `'ckey' and 'require' and unique to be used together`);
        // }

        // Check foreign key
        const hasForeignKey = fieldConfig.fkey;
        const hasUnique = fieldConfig.unique;
        const isRequired = fieldConfig.required;

        if (hasForeignKey && hasUnique && !isRequired) {
          createError(
            actaulFieldName,
            `'fkey' requires requires and not to be set to true with unique`
          );
        }

        // Check unique property
        if (hasUnique && !hasIndexes) {
          createError(
            actaulFieldName,
            `'unique' requires 'indexes' to be set to true`
          );
        }

        // Check for auto-increment conflicts
        if (fieldConfig.autoIncrement && isStringType) {
          createError(
            actaulFieldName,
            `'autoIncrement' not be set to true with type string`
          );
        }

        // Check for min and max conflicts
        const hasMin = fieldConfig.min !== 0;
        const hasMax = fieldConfig.max !== 0;

        if ((hasMin || hasMax) && !fieldType.includes('number')) {
          createError(
            actaulFieldName,
            `'min' and 'max' are applicable only for number type`
          );
        }

        if (
          hasMin &&
          hasMax &&
          fieldConfig.min >= 0 &&
          fieldConfig.max < fieldConfig.min &&
          fieldType.includes('number')
        ) {
          createError(
            actaulFieldName,
            `'min' and 'max' are not same and always max is greater`
          );
        }

        if (
          fieldConfig.min === fieldConfig.max &&
          fieldType.includes('number')
        ) {
          createError(actaulFieldName, `'min' and 'max' are not same`);
        }

        // Check for minlength and maxlength conflicts
        const hasMinLength = fieldConfig.minlength;
        const hasMaxLength = fieldConfig.maxlength;

        if (
          hasMinLength === 0 &&
          hasMaxLength === 0 &&
          ['string', 'number'].some((type) => fieldType.includes(type))
        ) {
          createError(
            actaulFieldName,
            `'minlength' and 'maxlength' are applicable only for string or number type`
          );
        }
        // Add more checks as needed...
      }
    }

    return primaryKeyEncountered;
  }
};

/* Validates the provided schema object.*/
const validateSchema = async function (schemaObject) {
  let fieldValidationResult = false;

  /* Iterate through each field in the schema */
  for (const fieldName in schemaObject) {
    /* Check if the field is a direct property of the object (not inherited) */
    if (schemaObject.hasOwnProperty(fieldName)) {
      /* Get the configuration for the current field*/
      const fieldConfig = schemaObject[fieldName];
      /* Validate the current field */
      fieldValidationResult = await validateField(
        fieldName,
        fieldConfig,
        fieldValidationResult
      );

      /* If validation fails, return the error message */
      // if (fieldValidationResult) {
      //     return fieldValidationResult;
      // }
    }
  }
  if (!fieldValidationResult) {
    return createError('', `'at leat one primary  key is created `);
  }

  /*  If all fields pass validation, return null indicating success */
  return null;
};

const validateFieldData = (fieldName, fieldValue, fieldConfig) => {
  if (
    fieldConfig.required &&
    !fieldConfig.autoIncrement &&
    fieldConfig.type === 'number' &&
    (fieldValue === undefined || fieldValue === null || fieldValue === '')
  ) {
    console.log(fieldName, 'createError');
    return createError(fieldName, `${fieldName} is required.`);
  }
  if (
    fieldConfig.required &&
    fieldConfig.type === 'string' &&
    (fieldValue === undefined || fieldValue === null || fieldValue === '')
  ) {
    return createError(fieldName, `${fieldName} is required.`);
  }
  if (
    fieldConfig.required &&
    fieldConfig.type === 'date' &&
    (fieldValue === undefined || fieldValue === null || fieldValue === '')
  ) {
    return createError(fieldName, `${fieldName} is required.`);
  }
  if (fieldConfig.type === 'number') {
    if (typeof fieldValue === 'number' && isNaN(fieldValue)) {
      return createError(fieldName, `${fieldName} must be a number.`);
    }
    if (fieldValue === '') {
      fieldValue = fieldConfig.default;
    }

    // Additional numeric validations
    if (fieldConfig.min !== undefined && fieldValue < fieldConfig.min) {
      return createError(
        fieldName,
        `${fieldName} must be greater than or equal to ${fieldConfig.min}.`
      );
    }
    if (fieldConfig.max !== undefined && fieldValue > fieldConfig.max) {
      return createError(
        fieldName,
        `${fieldName} must be less than or equal to ${fieldConfig.max}.`
      );
    }

    if (
      fieldConfig.float &&
      !Number.isInteger(fieldValue) &&
      typeof fieldValue !== 'number'
    ) {
      return createError(fieldName, `${fieldName} must be a float.`);
    }
  } else if (fieldConfig.type === 'string') {
    // Validate string fields
    if (typeof fieldValue !== 'string'&&fieldValue !== undefined) {
      return createError(fieldName, `${fieldName} must be a string.`);
    }

    // Additional string validations
    if (
      fieldConfig.minLength !== undefined &&
      fieldValue.length < parseInt(fieldConfig.minLength)
    ) {
      return createError(
        fieldName,
        `${fieldName} must have a length greater than or equal to ${fieldConfig.minLength}.`
      );
    }

    if (
      fieldConfig.maxLength !== undefined &&
      fieldValue.length > parseInt(fieldConfig.maxLength)
    ) {
      return createError(
        fieldName,
        `${fieldName} must have a length less than or equal to ${fieldConfig.maxLength}.`
      );
    }
    if (fieldValue === '') {
      fieldValue = fieldConfig.default;
    }
    if (fieldConfig.lowercase) {
      fieldValue = fieldValue.toLowerCase();
    }
    if (fieldConfig.uppercase) {
      fieldValue = fieldValue.toUpperCase();
    }
    if (fieldConfig.trim) {
      fieldValue = fieldValue.trim();
    }
  } else if (fieldConfig.type === 'date') {
    const dateToFormat = fieldValue ? new Date(fieldValue) : new Date();

    switch (fieldConfig.dateToFormat) {
      case 'utcDate':
        return dateToFormat.toUTCString();
      case 'isoDate':
        return dateToFormat.toISOString();
      case 'shortDateFormat':
        return dateToFormat.toLocaleDateString('en-US');
      case 'customFormatDate':
        return dateToFormat.toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        });
      default:
        return fieldValue; // Return original value if dateType is not recognized
    }
  } else if (fieldConfig.type === 'array') {
    if (!Array.isArray(fieldValue)) {
      return createError(fieldName, `${fieldName} must be an array.`);
    }

    const validatedArray = fieldValue.map((item, index) => {
      return validateActualData(fieldConfig.items, item);
    });

    return validatedArray;
  } else if (fieldConfig.type === 'object') {
    return validateActualData(fieldConfig.properties, fieldValue);
  }

  return fieldValue;
};

/* Function to validate fields in the data based on the schema */
const validateActualData = (schema, data) => {
  /* Object to store the validated data */
  const validatedData = {};

  /* Iterate through each field in the schema */
  Object.keys(schema).forEach((fieldName) => {
    /*  Check if the field exists in the data */
    if (data.hasOwnProperty(fieldName)) {
      /* Validate the field data and store the result */
      const fieldValidation = validateFieldData(
        fieldName,
        data[fieldName],
        schema[fieldName]
      );
      validatedData[fieldName] = fieldValidation;
    } else {
      /* Handle missing field based on your requirements (throw an error, set a default, etc.)
            For now, let's set it to null
            validatedData[fieldName] = null; */
    }
  });
  /* Return the validated data */
  return validatedData;
};

module.exports = {
  validateSchema,
  validateField,
  validateActualData,
  removeSpacesInKeys,
  CustomValidationError,
};
