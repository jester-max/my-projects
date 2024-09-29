// Define a schema model for storing invoice schemas in MongoDB
const mongoose = require('mongoose');

const commonSchema = new mongoose.Schema(
  {
    /*  Define fields for your actual employee here */
    /* This schema will be dynamic based on the stored invoice-related information */
  },
  { strict: false } //{ strict: false }, allowing any key-value pairs.
);
module.exports = commonSchema;
