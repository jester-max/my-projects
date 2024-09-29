const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createTenantSchema = new mongoose.Schema(
  {
    accountID: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    accountDate: {
      type: Date,
      default: Date.now(),
    },
    accountName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    veriCode: {
      type: Number,
      required: true,
    },

    contactInfo: {
      fullName: {
        type: String,
        trim: true,
        required: true,
      },
      organizationName: {
        type: String,
        required: true,
        trim: true,
      },
      organizationGST: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      mobileNumber: {
        type: Number,
        unique: true,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
        lowerCase: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
      },
      pin: {
        type: String,
        required: true,
        minlength: [6, 'Must be at least 6, got {VALUE}'],
        maxlength: [6, 'Must be at most 6, got {VALUE}'],
        default: 451660,
      },
      state: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
      },
      stateCode: {
        type: Number,
        required: true,
        require: true,
      },
      country: {
        type: String,
        uppercase: true,
        required: true,
      },
    },
    completeConfiguration: {
      type: String,
      enum: ['pending', 'progress', 'complete'],
      default: 'progress',
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

createTenantSchema.methods.isPasswordCorrect = async function (password) {
  return password === this.password;
};

createTenantSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      accountName: this.accountName,
      tenantID: this.tenantID,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
createTenantSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      accountName: this.accountName,
      tenantID: this.tenantID,
      email: this.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

module.exports = createTenantSchema;
