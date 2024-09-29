const mongoose = require('mongoose');

// Define a schema model for storing invoice schemas in MongoDB
const InvoiceSchema = new mongoose.Schema(
  {
    /*  Define fields for your actual employee here */
    /* This schema will be dynamic based on the stored invoice-related information */
  },
  { strict: false }, //{ strict: false }, allowing any key-value pairs.
);
module.exports = InvoiceSchema;



/*


const invoiceAtualSchema = new mongoose.Schema({
  /!*  Define fields for your actual invoices here *!/
  /!* This schema will be dynamic based on the stored invoice-related information *!/

  dynamicField:Object

});



module.exports = invoiceAtualSchema */
