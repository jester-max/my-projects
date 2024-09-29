const {ApiError} = require("./ApiError");

const {CustomValidationError} = require('../validators/common.validator')
const asyncHandler = function (requestHandler) {

    return async function (req, res, next) {
        try {
            await requestHandler(req, res, next);
        } catch (err) {

            console.log(err)

            if (err instanceof CustomValidationError) {
                // Handle the custom validation error

                return res.
                json(new ApiError(400, err.message,err.fields));


            } else if (err.code === 11000 || err.name === 'MongoError') {
                // Handle common Mongoose errors
            }else{
                return res.
                json(new ApiError(400, err.message,''));
            }
        }
    };
};



module.exports =  { asyncHandler }