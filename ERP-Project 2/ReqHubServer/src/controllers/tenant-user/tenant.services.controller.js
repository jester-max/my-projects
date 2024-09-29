const {
  getMongodbModels,
  getTenantModelMongodb,
  getTenantServiceModelMongodb,
} = require('../../databases/tenant.mongodb.connection');

const { asyncHandler } = require('../../utilities/asyncHandler');
const { ApiResponse } = require('../../utilities/ApiResponse');
const { ApiError } = require('../../utilities/ApiError');


// tenant-user is create service like erp ,crm
const createTenantServices = asyncHandler(async function (req, res) {
  try {
    const serviceNames = req.body;

    /* Fetch the MongoDB model for the tenant-user-user */
    const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

    /* Find the tenant-user-user in MongoDB based on the username */
    const tenant = await tenantModel.findOne({ email: req.tenant.email });

    /* Check if the tenant-user-user exists */
    if (tenant) {
      /* Fetch the MongoDB model for the service */
      const TenantServiceModel = await getTenantServiceModelMongodb(
        tenant.accountName
      );

      if (serviceNames.length === 0) {
        return res.json(new ApiError(400, 'SELCT AT LEAT ONE', 'services'));
      }

      await serviceNames.forEach(async (serviceName) => {
        const tenantServiceInstance = new TenantServiceModel({
          serviceName: serviceName,
        });

        await tenantServiceInstance.save();

      });

      const mongodbTenantModel = await getTenantModelMongodb(tenant.accountName);

      const existingTenant = await mongodbTenantModel.findOneAndUpdate(
          {accountName:tenant.accountName},
          {
            $set: {
              completeConfiguration: 'progress',
            },
          },
          {
            new: true,
          }
          );


      /* Return a JSON response with a success message */
      return res.json(new ApiResponse(200, { completeConfiguration: existingTenant.completeConfiguration,}));
    } else {
      /* Return a JSON response indicating that the tenant-user-user ID is not correct */
      return res.json(
        new ApiError(400, 'TENANT email IS NOT CORRECT', 'email')
      );
    }
  } catch (err) {
    /* Return a JSON response indicating that the tenant-user-user ID is not correct */
    return res.json(new ApiError(400, err.message, ''));
  }
});


// tenant-user is get service like erp ,crm
const getTenantServices = asyncHandler(async function (req, res) {
  try {
    /* Fetch the MongoDB model for the tenant-user-user */
    const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

    /* Find the tenant-user-user in MongoDB based on the username */
    const tenant = await tenantModel.findOne({ email: req.tenant.email });

    /* Check if the tenant-user-user exists */
    if (tenant) {
      /* Fetch the MongoDB model for the service */
      const TenantServiceModel = await getTenantServiceModelMongodb(
        tenant.accountName
      );

      const getTeantServies = await TenantServiceModel.find();

      /* Return a JSON response with a success message */
      return res.json(new ApiResponse(200, getTeantServies));
    } else {
      /* Return a JSON response indicating that the tenant-user-user ID is not correct */
      return res.json(
        new ApiError(400, 'TENANT email IS NOT CORRECT', 'email')
      );
    }
  } catch (err) {
    /* Return a JSON response indicating that the tenant-user-user ID is not correct */
    return res.json(new ApiError(400, err.message, ''));
  }
});


// tenant-user is update service like erp ,crm
const updateModuleTenantServices = asyncHandler(async function (req, res) {
  try {

    /* Fetch the MongoDB model for the tenant-user-user */
    const tenantModel = await getTenantModelMongodb(req.tenant.accountName);

    /* Find the tenant-user-user in MongoDB based on the username */
    const tenant = await tenantModel.findOne({ email: req.tenant.email });

    /* Check if the tenant-user-user exists */
    if (tenant) {
      /* Fetch the MongoDB model for the service */
      const TenantServiceModel = await getTenantServiceModelMongodb(
        tenant.accountName
      );

      let getTenantServices = await TenantServiceModel.findOne({
        serviceName: req.body.serviceName,
      });

      if (getTenantServices === null) {
        return res.json(new ApiError(400, 'SERVICE NOT FOUND ', 'serviceName'));
      }
      if (req.body.modules.length === 0) {
        return res.json(
          new ApiError(400, 'CREATE AT LEAT ONE MODULE', 'modules')
        );
      }

      getTenantServices.modules = req.body.modules;

      await TenantServiceModel.findOneAndUpdate(
        { serviceName: req.body.serviceName },
        getTenantServices
      );


      const existingTenant = await tenantModel.findOneAndUpdate(
          {accountName:tenant.accountName},
          {
            $set: {
              completeConfiguration: 'progress',
            },
          },
          {
            new: true,
          }
      );



      /* Return a JSON response with a success message */
      return res.json(new ApiResponse(200, null));
    } else {
      /* Return a JSON response indicating that the tenant-user-user ID is not correct */
      return res.json(
        new ApiError(400, 'TENANT email IS NOT CORRECT', 'email')
      );
    }
  } catch (err) {
    /* Return a JSON response indicating that the tenant-user-user ID is not correct */
    return res.json(new ApiError(400, err.message, ''));
  }
});



module.exports = {
  createTenantServices,
  getTenantServices,
  updateModuleTenantServices,
};
