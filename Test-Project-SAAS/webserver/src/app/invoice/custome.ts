

export function someFunction2(data:any) {

  console.log(data)
  var array:any = []

  for (let keyMain in data) {
    if(data[keyMain].type=='array'){
      var arrayFields = {key:keyMain,value:[{}],type:'array',relation:'array',belong:keyMain,isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:true,
        default:"NA",required:true,enum:false,enumValues: []}

      const entries = Object.entries(data[keyMain].items);

      entries.forEach(([keySec, value]) => {
        // @ts-ignore
        arrayFields.value.push({key:keySec,type:value.type,relation:'array',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
          // @ts-ignore
          default:value.default,required:true,enum:false,enumValues: []})

      });

      array.push(arrayFields)

    }else if(data[keyMain].type!='array' && data[keyMain].type=='object'){

      var objectFields = {key:keyMain,value:[{}],type:'object',relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
        default:"NA",required:true,enum:false,enumValues: []}

      const entries2 = Object.entries(data[keyMain].properties);
      entries2.forEach(([keySec, value]) => {
        // @ts-ignore
        objectFields.value.push({key:keySec,type:value.type,relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
          // @ts-ignore
          default:value.default,required:true,enum:false,enumValues: []})

      });

      array.push(objectFields)

    }else{
      console.log(data[keyMain].type)
      array.push({key:keyMain,type:data[keyMain].type,relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:true,
        default:data[keyMain].default,required:true,enum:false,enumValues: []})
    }
  }
  return array
}


export function ValidationFunction(properties:any) {

  var newObj :any={}

  for (let item in properties) {
    let schema: any = {};
    if (properties[item]?.type === 'array') {
      let arrayName = properties[item].key;
      properties[item].value.forEach((num: any) => {
        if (num.key !== undefined){
          schema[num.key] = num.default;
        }

        newObj[arrayName] = [schema];
      });
    } else if (properties[item]?.type === 'object'){
      let arrayName = properties[item].key;
      properties[item].value.forEach((num: any) => {
        if (num.key !== undefined){
          schema[num.key] = num.default;
        }
        // let newObj: any = {};
        newObj[arrayName] = schema;
      });
    } else if (properties[item]?.type !== undefined){

      newObj[properties[item].key] = properties[item].default;
    }
  }
  return newObj;
}
