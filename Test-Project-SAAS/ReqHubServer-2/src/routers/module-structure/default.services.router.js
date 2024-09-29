const express = require('express');

const { defaultMongodbAdminModel ,defaultMongodbAdminStaticModel} = require('../../databases/tenant.mongodb.connection');

const defaultServicesRouter = express.Router();

// http://localhost:3000/tenant
defaultServicesRouter.
      route('/default/module-structure').
      post(async (req, res) => {
  try {
    const dataFromFrontend = req.body;

    const defaultAdminModelObj = await defaultMongodbAdminModel();

    const saveObj = await defaultAdminModelObj.create(dataFromFrontend);

    res.json({
      Status: 'SUCCESS',
      language: 'en_US',
      StatusCode: res.StatusCode,
      data: saveObj,
      error: null,
    });
  } catch (err) {

    res.json({
      Status: 'ERROR',
      language: 'en_US',
      StatusCode: res.StatusCode,
      data: null,
      error: err.message,
    });
  }
});

// http://localhost:3000/tenant
defaultServicesRouter
  .route('/default/module-structure')
  .get(async function (req, res) {
    try {

      const defaultAdminModelObj = await defaultMongodbAdminModel();

      const getObj = await defaultAdminModelObj.findOne();

      // Extract fields from the object
      // const extractedFields = extractFields(getObj);

      res.json({
        Status: 'SUCCESS',
        language: 'en_US',
        StatusCode: res.StatusCode,
        data: getObj,
        error: null,
      });
    } catch (err) {
      res.json({
        Status: 'ERROR',
        language: 'en_US',
        StatusCode: res.StatusCode,
        data: null,
        error: err.message,
      });
    }
  });

function extractFields(obj, parentKey = '') {
  const fields = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;
      const fieldType = typeof obj[key];

      if (fieldType === 'object') {
        if (Array.isArray(obj[key])) {
          // Handle arrays
          const arrayField = {
            fieldName: currentKey,
            fieldType: 'array',
            fields: [],
          };

          // Iterate over array elements
          if (obj[key].length > 0 && typeof obj[key][0] === 'object') {
            arrayField.fields.push(
              ...extractFields(obj[key][0], `${currentKey}[0]`),
            );
          }

          fields.push(arrayField);
        } else {
          // Handle nested objects
          const objectField = {
            fieldName: currentKey,
            fieldType: 'object',
            fields: [],
          };
          objectField.fields.push(...extractFields(obj[key], currentKey));
          fields.push(objectField);
        }
      } else {
        // Handle primitive types
        fields.push({ fieldName: currentKey, fieldType });
      }
    }
  }

  return fields;
}


// http://localhost:3000/tenant
defaultServicesRouter.
route('/default/static').
post(async (req, res) => {
  try {

    const defaultAdminModelObj = await defaultMongodbAdminStaticModel();

    const saveObj = await defaultAdminModelObj.create(req.body);

    res.json({
      Status: 'SUCCESS',
      language: 'en_US',
      StatusCode: res.StatusCode,
      data: saveObj,
      error: null,
    });
  } catch (err) {
    res.json({
      Status: 'ERROR',
      language: 'en_US',
      StatusCode: res.StatusCode,
      data: null,
      error: err.message,
    });
  }
});

defaultServicesRouter.
route('/default/static').get(async function (req,res,next) {
  try{
    const defaultAdminModelObj1 = await defaultMongodbAdminStaticModel();

    const staticdate = await defaultAdminModelObj1.findOne({})

    const defaultAdminModelObj = await defaultMongodbAdminModel();

    const invoice = await defaultAdminModelObj.findOne({});

    console.log(invoice)

    var todayDate = invoice.invoiceDate.getDate()
    var todayMonth = invoice.invoiceDate.getMonth()+1
    var todayYear = invoice.invoiceDate.getFullYear()

    var testingDate,testingMonth
    if(todayDate<10&&todayMonth<10){
      testingDate = '0'+todayDate
      testingMonth = '0'+todayMonth
    }else if(todayDate>=10&&todayMonth<10){
      testingDate = todayDate
      testingMonth = '0'+todayMonth
    }else if(todayDate>=10&&todayMonth>10){
      testingDate = todayDate
      testingMonth = todayMonth
    } else{
      testingDate = '0'+todayDate
      testingMonth = todayMonth
    }


    var newCurrentDate = testingDate+'/'+testingMonth+'/'+todayYear
    invoice.newCurrentDate = newCurrentDate


    // var newCurrentDate = todayYear+'/'+testingMonth+'/'+testingDate

    var num =  invoice.invoiceValue.toLocaleString("en-IN")
    var num1 =  invoice.textableValue.toLocaleString("en-IN")

    function getDecimalPart(num) {

      const decimalStr = num.split('.')[1];

      return (decimalStr);
    }

    if(getDecimalPart(num)===undefined){
      var inter = num+'.00'
      invoice.invoiceValueUpdate = inter

    }else if(getDecimalPart(num)<10){
      var inter1 = num+'0'
      invoice.invoiceValueUpdate = inter1
    }else{
      invoice.invoiceValueUpdate = num
    }


    if(getDecimalPart(num1)===undefined){
      var inter = num1+'.00'
      invoice.textableValueUpdate = inter

    }else if(getDecimalPart(num1)<10){
      var inter1 = num1+'0'
      invoice.textableValueUpdate = inter1
    }else{
      invoice.textableValueUpdate = num1
    }


    if(invoice.TermsAndConditions.length<4){
      for(var iter = 0 ;iter<4;iter++){
        if(iter===invoice.TermsAndConditions.length){
          invoice.TermsAndConditions.push({condition: ''})
        }
      }
    }

    invoice.sellerInfo = staticdate
    mention = false
    for(var iter=0;iter<invoice.productDetails.length;iter++){

      if(invoice.productDetails[iter].productDiscount!==0){
        mention = true
      }
    }
    if(mention===true){
      res.render('salein', {data:invoice},function (err, html) {
        res.send(html)
      })
    }else{

      res.render('sale', {data:invoice},function (err, html) {
        res.send(html)
      })
    }

  }catch (err) {
    console.log(err)
    res.json({
      Status: "ERROR",
      language: "en_US",
      StatusCode:res.statusCode,
      data: null,
      error: err.message
    })
  }
})


module.exports = defaultServicesRouter;
