const { ApiError } = require('../utilities/ApiError');
const { asyncHandler } = require('../utilities/asyncHandler');
const jwt = require('jsonwebtoken');
const {
  getTenantModelMongodb,
} = require('../databases/tenant.mongodb.connection');

const verifyJWT = asyncHandler(async function (req, res, next) {

  console.log(req.header('Authorization')?.replace('Bearer ', ''))

  // Extract the JWT token from cookies or headers
  const token =
    // req.cookies?.accessToken ||
    // req.header('Authorization')?.replace('Bearer ', '')||
   //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50TmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBoYXJpcHJpeWFncnAuY29tIiwiaWF0IjoxNzA3MjgxODkyLCJleHAiOjE3MDczNjgyOTJ9.0-qndXaS0hWZKr3mLkAclFN78UpmllQXBy9L2iN1-Xc'
   req.params.tenantID

  // Check if the token is missing
  if (!token) {
    return res.json(new ApiError(401, 'Unauthorized request', ''));
  }

  console.log('decodedToken')

  // Decode the JWT token
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  console.log(decodedToken)

  // Fetch the MongoDB model for the tenant-user-user
  const mongodbTenantModel = await getTenantModelMongodb(
    decodedToken.accountName
  );

  // Find the tenant-user-user in MongoDB based on the decoded email from the token
  const tenantExist = await mongodbTenantModel
    .findOne({ email: decodedToken?.email })
    .select('-password -refreshToken');

  // Check if the tenant-user-user exists
  if (!tenantExist) {
    return res.json(new ApiError(400, 'Invalid Access Token', ''));
  }

  // Assign the tenant-user-user information to the request object
  req.tenant = tenantExist;

  // Continue to the next middleware or route handler
  next();
});

const verifyJWT1 = asyncHandler(async (req, _, next) => {
  req.params.tenantID = 'mahesh';

  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '') ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1haGVzaCIsImVtYWlsIjoibWFoZXNoQGhhcmlwcml5YWdycC5jb20iLCJvcmdhbml6YXRpb25HU1QiOiJuYXlhayIsImlhdCI6MTcwMzczNzIzMywiZXhwIjoxNzAzODIzNjMzfQ.A59GnXGU9t3Frdoxv0T9SUG-XnN-Zs55NSMy2t1ZlFc';

  if (!token) {
    throw new ApiError(401, 'Unauthorized request');
  }

  // in next step i am implement verify code and attached information to req

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const mongodbTenantModel = await getTenantModelMongodb(req.params.tenantID);

  const tenantExist = await mongodbTenantModel
    .findOne({ email: decodedToken?.email })
    .select('-password -refreshToken');

  if (!tenantExist) {
    throw new ApiError(401, 'Invalid Access Token');
  }

  req.tenant = tenantExist;

  next();
});

module.exports = { verifyJWT };
