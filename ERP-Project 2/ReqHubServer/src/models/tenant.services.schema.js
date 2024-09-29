const mongoose = require('mongoose');

const createTenantServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
    },
    serviceDate: {
      type: Date,
      default: Date.now(),
    },
    modules: [
      {
        moduleName: {
          type: String,
          default: '',
        },
        subModule: {
          type: Array,
          default: 0,
        },
        moduleDate: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = createTenantServiceSchema;
