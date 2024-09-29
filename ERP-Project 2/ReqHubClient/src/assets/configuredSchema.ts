export function someFunction2(data:any) {

  var array:any = []

  for (let keyMain in data) {
    if(data[keyMain].type=='array'){

      var arrayLength = Object.values(data[keyMain].items).length;
      var arrayFields = {key:keyMain,value:[{}],type:'array',relation:'array',belong:keyMain,isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:true,
        default:"NA",required:true,enum:false,enumValues: [],arrayLength:arrayLength}

      const entries = Object.entries(data[keyMain].items);

      entries.forEach(([keySec, value]) => {
        // @ts-ignore
        arrayFields.value.push({key:keySec,type:value.type,relation:'array',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
          // @ts-ignore
          default:value.default,required:true,enum:value.enum,enumValues: value.enumValues})

      });

      array.push(arrayFields)

    }else if(data[keyMain].type!='array' && data[keyMain].type=='object'){



      var objectFields = {key:keyMain,value:[{}],type:'object',relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
        default:"NA",required:true,enum:false,enumValues: [],arrayLength:0}

      const entries2 = Object.entries(data[keyMain].properties);
      entries2.forEach(([keySec, value]) => {
        // @ts-ignore
        objectFields.value.push({key:keySec,type:value.type,relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
          // @ts-ignore
          default:value.default,required:true,enum:false,enumValues: []})

      });

      array.push(objectFields)

    }else{
      array.push({key:keyMain,type:data[keyMain].type,relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
        default:data[keyMain].default,required:true,enum:data[keyMain].enum,enumValues: data[keyMain].enumValues,arrayLength:0})
    }
  }
  return array
}


// export function ValidationFunction(properties:any) {
//
//   var newObj :any={}
//
//   for (let item in properties) {
//     let schema: any = {};
//     if (properties[item]?.type === 'array') {
//       let arrayName = properties[item].key;
//       properties[item].value.forEach((num: any) => {
//         if (num.key !== undefined){
//           schema[num.key] = num.default;
//         }
//
//         newObj[arrayName] = [schema];
//       });
//     } else if (properties[item]?.type === 'object'){
//       let arrayName = properties[item].key;
//       properties[item].value.forEach((num: any) => {
//         if (num.key !== undefined){
//           schema[num.key] = num.default;
//         }
//         // let newObj: any = {};
//         newObj[arrayName] = schema;
//       });
//     } else if (properties[item]?.type !== undefined){
//
//       newObj[properties[item].key] = properties[item].default;
//     }
//   }
//   return newObj;
// }

export function ValidationFunction(properties: any) {


  var newObj: any = {};

  for (let item in properties) {
    let schema: any = {};

    if (properties[item]?.type === 'array') {
      let arrayName = properties[item].key;
      newObj[arrayName] = [];

      var indexLengthChecker = 0,ourIndex = 0
      properties[item].value.forEach((num: any) => {


        if (num.key !== undefined) {
          ourIndex++
          schema[num.key] = num.default;
        }

        if(properties[item]?.arrayLength+indexLengthChecker===ourIndex){


          indexLengthChecker = ourIndex
          newObj[arrayName].push(schema);
          schema ={}
        }


      });



    } else if (properties[item]?.type === 'object') {
      let objectName = properties[item].key;
      let objectSchema: any = {};

      properties[item].value.forEach((num: any) => {
        if (num.key !== undefined) {
          objectSchema[num.key] = num.default;
        }
      });

      newObj[objectName] = objectSchema;

    } else if (properties[item]?.type !== undefined) {
      newObj[properties[item].key] = properties[item].default;
    }
  }

  return newObj;
}

export function someFunction(data:any) {
  // Functionality to export
  console.log(data)
  var array:any = []

  for (let keyMain in data) {
    if(Array.isArray(data[keyMain])){

      var arrayFields = {key:keyMain,value:[{}],type:'array',relation:'array',belong:keyMain,isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:"NA",required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',dateToFormat:'isoDate',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:''}

      const entries = Object.entries(data[keyMain][0]);

      entries.forEach(([keySec, value]) => {

        arrayFields.value.push({key:keySec,type:typeof value,relation:'array',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          Default:true,default:value,required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',dateToFormat:'isoDate',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:''})

      });

      array.push(arrayFields)

    }else if(!Array.isArray(data[keyMain])&& typeof data[keyMain]=='object'){

      var objectFields = {key:keyMain,value:[{}],type:'object',relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:"NA",required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',dateToFormat:'isoDate',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:''}

      const entries2 = Object.entries(data[keyMain]);
      entries2.forEach(([keySec, value]) => {

        objectFields.value.push({key:keySec,type:typeof value,relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          Default:true,default:value,required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',dateToFormat:'isoDate',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:''})

      });

      array.push(objectFields)

    }else{
      console.log(typeof data[keyMain])
      array.push({key:keyMain,type:typeof data[keyMain],relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:data[keyMain],required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',dateToFormat:'isoDate',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:''
      })
    }
  }
  return array
}
