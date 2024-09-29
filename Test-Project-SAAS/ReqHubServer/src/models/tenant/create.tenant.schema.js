const mongoose = require('mongoose');


const createTenantSchema = new mongoose.Schema({
  tenantID: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  tenantName: {
    type: String,
    required: true,
    trim: true,
  },
  tenantDate: {
    type: Date,
    trim: true,
    uppercase: true,
    required: true,
    default: Date.now(),
  },
  tenantDatabase: {
    type: String,
    trim: true,
    uppercase: true,
  },
  completeConfiguration:{
    type:String,
    enum:['pending','progress','complete'],
    default:'pending'
  }
});


module.exports = createTenantSchema;
