const { asyncHandler } = require('../utilities/asyncHandler');
const { validateField } = require('./common.validator');
const { ApiResponse } = require('../utilities/ApiResponse');

const validateStructureFields = asyncHandler(async function (req, res) {

  let reqValidationData = req.body;

  validateField(reqValidationData.key, reqValidationData);

  return res.json(new ApiResponse(200, null));

});

module.exports = { validateStructureFields };
