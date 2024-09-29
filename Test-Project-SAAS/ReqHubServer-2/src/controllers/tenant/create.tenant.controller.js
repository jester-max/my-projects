

const { getTenantModelMongodb } = require('../../databases/tenant.mongodb.connection');
const {asyncHandler} = require("../../utilities/asyncHandler");
const {ApiPending} = require("../../utilities/ApiPending");
const emailService = require('../../services/emailService.service');
const {ApiResponse} = require("../../utilities/ApiResponse");
const {ApiError} = require("../../utilities/ApiError");
const jwt = require('jsonwebtoken')
const axios = require("axios");

const generateAccessAndRefereshTokens = async function (tenantObj) {
    try {

        const accessToken = tenantObj.generateAccessToken()
        const refreshToken = tenantObj.generateRefreshToken()

        tenantObj.refreshToken = refreshToken
        await tenantObj.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const loginTenant = asyncHandler(async function (req, res) {

    const { accountName, password} = req.body

    const mongodbTenantModel = await getTenantModelMongodb(accountName);

    const existingTenant = await mongodbTenantModel.findOne({
        $or: [{accountName}]
    })

    if (!existingTenant) {

        return res.
        json(new ApiError(400, 'Tenant does not exist with accountName','accountName'));

    }

    const isPasswordValid = await existingTenant.isPasswordCorrect(password)

    if (!isPasswordValid) {

        return res.
        json(new ApiError(400, 'Invalid user credentials','password'));

    }

    const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(existingTenant)

    const options = {
        httpOnly: true,
        secure: true
    }


    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                   accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )

})

const logoutTenant = asyncHandler(async function (req, res)  {

    const mongodbTenantModel = await getTenantModelMongodb(req.tenant.tenantID);

    await mongodbTenantModel.findOneAndUpdate({email: req.tenant.email},
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
        .json(new ApiResponse(200, {}, "Tenant logged Out"))
})

const refreshAccessToken = asyncHandler(async function (req, res)  {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const mongodbTenantModel = await getTenantModelMongodb(decodedToken.tenantID);

        const tenantObj = await mongodbTenantModel.findOne({email:decodedToken?.email})

        if (!tenantObj) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== tenantObj?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")

        }


        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(tenantObj)

        return res
            .json(
                new ApiResponse(
                    200,
                    {accessToken, refreshToken: newRefreshToken},
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})


const getTenantData = async function (req,res) {

    try {
        const mongodbTenantModel = await getTenantModelMongodb(req.params.tenantID);

        const getObj = await mongodbTenantModel.find();

        res.json({
            Status: 'SUCCESS',
            language: 'en_US',
            StatusCode: res.StatusCode,
            data: getObj,
            error: null,
            page:'home'
        });
    } catch (err) {
        return res.
        json(new ApiError(500, err.message));
    }
}

const updateTenantConfiStatus = async function (req,res) {

    try {
        const mongodbTenantModel = await getTenantModelMongodb(req.params.tenantID);

        const UpdatetenantData = await mongodbTenantModel.
        findOneAndUpdate({tenantID:req.params.tenantID}, { $set: { completeConfiguration: 'complete' } },)

        return res.
        json(new ApiResponse(201));

    } catch (err) {
        return res.
        json(new ApiError(500, err.message));
    }
}

const updateTenantData = asyncHandler( async function (req, res)  {

        const mongodbTenantModel = await getTenantModelMongodb(req.params.accountname);

        const requestData = req.body

        const UpdatetenantData = await mongodbTenantModel.
        findOneAndUpdate({accountName:req.params.accountname}, { $set: requestData })

        return res
            .json(new ApiResponse(200, null, [], ));

})
const sendVerificationCode = async (email, accountName,password) => {

    try{
        // Generate a random 6-digit code
        const generateSixDigitCode = Math.floor(100000 + Math.random() * 900000);

        console.log(generateSixDigitCode,'generateSixDigitCode')

        const subject = 'Your Verification Code';
        const text = `Your verification code is: ${generateSixDigitCode.toString().bold()}`;

        const mongodbTenantModel = await getTenantModelMongodb(accountName);

        // Find existing tenant by email
        const existingTenant = await mongodbTenantModel.findOne({ email });

        if (existingTenant) {
            // If tenant exists, update the verification code
            existingTenant.veriCode = generateSixDigitCode;
            existingTenant.tenantDate = new Date(); // Update createdAt if needed

            // Save the updated document
            await existingTenant.save({ validateBeforeSave: false });

        } else {
            // If tenant doesn't exist, create a new document
            const tenantObj = new mongodbTenantModel({ email, veriCode: generateSixDigitCode, accountName,password });

            await tenantObj.save({ validateBeforeSave: false });
        }

        // Send the code to the user's email
        // await emailService.sendMail(email, subject, text);

        return generateSixDigitCode;
    }catch (e) {
        console.log(e)
    }
};

const handleVerification = async (email, accountName, verifyCode) => {

    const mongodbTenantModel = await getTenantModelMongodb(accountName);

    // Find the user by tenant and verification code
    const tenantObj = await mongodbTenantModel.findOne({
        email:email,
        veriCode: verifyCode,
        tenantDate: { $gt: new Date(Date.now() - 2 * 60 * 1000) }, // Check if createdAt is within the last 2 minutes
    });

    if (tenantObj) {
        // Code is correct and not expired
        return { success: 'SUCCESS', message: 'Verification successful.' };
    } else {
        // Code is incorrect or expired
        return { success: 'PENDING', message: 'Invalid or expired verification code.' };
    }
};

const sendAndCheckVerificationCode = asyncHandler(async function (req, res) {

    const { email, accountName,password,  veriCode } = req.body;

    if (veriCode) {

        // If verifyCode is provided, check verification
        const result = await handleVerification(email, accountName, veriCode);

       if(result.success==='SUCCESS'){
           return res.
           json(new ApiResponse(200 , {email,accountName}, 0, result.message));
       }


        return res.
        json(new ApiError(400, result.message,'veriCode'));

    } else {

        // If verifyCode is not provided, send verification code
      const generatedCode = await sendVerificationCode(email, accountName,password);

       return res.
        json(new ApiResponse(201, {email,accountName}, [], `Verification code is sented successfully.`));
    }
});





module.exports = {getTenantData,updateTenantConfiStatus,
    sendAndCheckVerificationCode,updateTenantData,loginTenant,logoutTenant,refreshAccessToken}




