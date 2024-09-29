const { check ,validationResult} = require('express-validator');
const {ApiError} = require("../../src/utilities/ApiError");

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
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
];

const validateSigninRequest = [

    check('accountName')
        .notEmpty()
        .withMessage('Account name is required')
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage('Account name must not contain spaces or special symbols'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6, max: 14 })
        .withMessage('Password must be between 6 and 14 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
];





const isRequestValidated = function (req, res, next)  {

    const errors = validationResult(req);
    if(errors.array().length > 0){
        console.log(errors.array()[0].msg,errors.array()[0].path,'errors')
        return res.
        json(new ApiError(400,errors.array()[0].msg,errors.array()[0].path));

    }
    next();
}


module.exports = {validateSignupRequest,validateSigninRequest,isRequestValidated}

