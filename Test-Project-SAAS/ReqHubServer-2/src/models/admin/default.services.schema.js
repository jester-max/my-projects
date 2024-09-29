/* ServicesSchema.js */
const mongoose = require('mongoose');

/*this schema is used by module-structure and show schema to module-data and module-data is use this this and create a own schema */
const defaultServicesSchema = new mongoose.Schema(
  {
    /*  Define fields for your actual employee here */
    /* This schema will be dynamic based on the stored invoice-related information */
  },
  { strict: false } /*  { strict: false }, allowing any key-value pairs. */,
);

module.exports = defaultServicesSchema;
