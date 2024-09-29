/* Generates a schema object based on the provided properties. */
const generateSchema = function (properties) {
  /* Initialize an empty schema object */
  const schemaObject = {};

  /* Iterate through each property in the properties array */
  properties.forEach((property) => {
    /* Destructure the property object to extract key, type, isArray, value, and other properties */
    const { key, type, isArray, value, ...otherProperties } = property;

    /*  Check if the property is an array with nested values */
    if (isArray && value) {
      let fkeyArray = {
        key: 'invoice_id',
        type: 'string',
      };

      value.push(fkeyArray);

      value.key = key;

      /* Create an array type schema with nested items */
      schemaObject[key] = {
        type: 'array',
        items: generateSchema(value),
        /* Include other properties if any
                 ...otherProperties, */
      };
    } else if (!isArray && value) {
      value.key = key;
      /* Create an object type schema with nested properties */
      schemaObject[key] = {
        type: 'object',
        properties: generateSchema(value),
        /* Include other properties if any
                 ...otherProperties, */
      };
    } else {
      /*  Create a simple property with type and other properties */
      schemaObject[key] = {
        type,
        key,
        /* Include other properties if any */
        ...otherProperties,
      };
    }
  });

  /* Return the generated schema object */
  return schemaObject;
};

module.exports = { generateSchema };
