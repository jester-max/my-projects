const { check, validationResult } = require('express-validator');
const { ApiError } = require('../../src/utilities/ApiError');

const validateSignupRequest = [
  check('accountName')
    .notEmpty()
    .withMessage('Account name is required')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Account name must not contain spaces or special symbols'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 14 })
    .withMessage('Password must be between 6 and 14 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    ),
];

const validateSigninRequest = [
  check('accountName')
    .notEmpty()
    .withMessage('Account name is required')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Account name must not contain spaces or special symbols'),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 14 })
    .withMessage('Password must be between 6 and 14 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    ),
];

const validateContactInfo = [
  check('fullName')
    .notEmpty()
    .withMessage('Full Name is required')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Full Name must only contain letters and spaces'),

  check('organizationName')
    .notEmpty()
    .withMessage('Organization Name is required'),

  check('organizationGST')
    .notEmpty()
    .withMessage('Organization GST is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Invalid organization GST'),

  check('mobileNumber')
    .notEmpty()
    .withMessage('Mobile Number is required')
    .isNumeric()
    .withMessage('Invalid mobile number')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile Number must be 10 digits'),

  check('landmark').notEmpty().withMessage('Landmark is required'),

  check('city').notEmpty().withMessage('City is required'),

  check('pin')
    .notEmpty()
    .withMessage('PIN is required')
    .isNumeric()
    .withMessage('Invalid PIN code')
    .isLength({ min: 6, max: 6 })
    .withMessage('PIN must be 6 digits'),

  check('state').notEmpty().withMessage('State is required'),
  check('country')
    .notEmpty()
    .withMessage('Country is required')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Country must only contain letters and spaces'),
];
const isRequestValidated = function (req, res, next) {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    console.log(req.body, 'errors');
    return res.json(
      new ApiError(400, errors.array()[0].msg, errors.array()[0].path)
    );
  }
  next();
};

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  validateContactInfo,
  isRequestValidated,
};
