const { ApiError } = require ("../utilities/ApiError");
const { asyncHandler } = require ("../utilities/asyncHandler");
const jwt = require ("jsonwebtoken")
const { getTenantModelMongodb } = require('../databases/tenant.mongodb.connection');


const verifyJWT = asyncHandler(async function (req, _, next) {

        // Extract the JWT token from cookies or headers
        const token =
            // req.cookies?.accessToken ||
            // req.header('Authorization')?.replace('Bearer ', '')||
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50TmFtZSI6ImFua2l0IiwiZW1haWwiOiJhbmtpdEBoYXJpcHJpeWFncnAuY29tIiwiaWF0IjoxNzA0MTk0NzkzLCJleHAiOjE3MDQyODExOTN9.WDePF7ANrNg4jl8gMw-E-KiV9qoPju9wt2c8Zd16lno'

        // Check if the token is missing
        if (!token) {
                throw new ApiError(401, 'Unauthorized request');
        }

        // Decode the JWT token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch the MongoDB model for the tenant
        const mongodbTenantModel = await getTenantModelMongodb(decodedToken.accountName);

        // Find the tenant in MongoDB based on the decoded email from the token
        const tenantExist = await mongodbTenantModel.findOne({ email: decodedToken?.email }).select('-password -refreshToken');

        // Check if the tenant exists
        if (!tenantExist) {
                throw new ApiError(401, 'Invalid Access Token');
        }

        // Assign the tenant information to the request object
        req.tenant = tenantExist;

        // Continue to the next middleware or route handler
        next();
});


const verifyJWT1 = asyncHandler(async(req, _, next) => {

        req.params.tenantID = 'mahesh'

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")||'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1haGVzaCIsImVtYWlsIjoibWFoZXNoQGhhcmlwcml5YWdycC5jb20iLCJvcmdhbml6YXRpb25HU1QiOiJuYXlhayIsImlhdCI6MTcwMzczNzIzMywiZXhwIjoxNzAzODIzNjMzfQ.A59GnXGU9t3Frdoxv0T9SUG-XnN-Zs55NSMy2t1ZlFc'

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const mongodbTenantModel = await getTenantModelMongodb(req.params.tenantID);

        const tenantExist = await mongodbTenantModel.findOne({email:decodedToken?.email}).select("-password -refreshToken")

        if (!tenantExist) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.tenant = tenantExist;

        next()

})

module.exports = {verifyJWT};