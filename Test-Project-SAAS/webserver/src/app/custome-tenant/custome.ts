

export function someFunction(data:any) {
  // Functionality to export
console.log(data)
  var array:any = []

  for (let keyMain in data) {
    if(Array.isArray(data[keyMain])){

      var arrayFields = {key:keyMain,value:[{}],type:'array',relation:'array',belong:keyMain,isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:"NA",required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',Indexestype:''}

      const entries = Object.entries(data[keyMain][0]);

      entries.forEach(([keySec, value]) => {

        arrayFields.value.push({key:keySec,type:typeof value,relation:'array',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          Default:true,default:value,required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',Indexestype:''})

      });

      array.push(arrayFields)

    }else if(!Array.isArray(data[keyMain])&& typeof data[keyMain]=='object'){

      var objectFields = {key:keyMain,value:[{}],type:'object',relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:"NA",required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',Indexestype:''}

      const entries2 = Object.entries(data[keyMain]);
      entries2.forEach(([keySec, value]) => {

        objectFields.value.push({key:keySec,type:typeof value,relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          Default:true,default:value,required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',Indexestype:''})

      });

      array.push(objectFields)

    }else{
      console.log(typeof data[keyMain])
      array.push({key:keyMain,type:typeof data[keyMain],relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:data[keyMain],required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old',Indexestype:''
      })
    }
  }
 return array
}

export function someFunction2(data:any) {
  // Functionality to export
  var array:any = []

  for (let keyMain in data) {
    if(data[keyMain].type==='array'){

      var arrayFields = {key:keyMain,value:[{}],type:'array',relation:'array',belong:keyMain,isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:"NA",required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:false,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old'}

      const entries = Object.entries(data[keyMain].items);

      entries.forEach(([keySec, value]) => {
        // @ts-ignore
        arrayFields.value.push({key:keySec,type:value.type,relation:value.relation,belong:keyMain,isArray:false,primarykey:value.primarykey,fkey:value.fkey,ckey:value.ckey,uppercase:value.uppercase,
          // @ts-ignore
          Default:value.Default,default:value.default,required:value.required,enum:value.enum,enumValues:value.enumValues,minlength:value.minlength,maxlength:value.maxlength,boolean:value.boolean,
          // @ts-ignore
          autoIncrement:value.autoIncrement,lowercase:value.lowercase,trim:value.trim,unique:value.unique,min:value.min,max:value.max,sign:value.sign,unsign:value.unsign,float:value.float,int:value.int,
          // @ts-ignore
          floor:value.floor,celling:value.celling,steps:value.steps,indexes:value.indexes,hasFeilds:'old'})

      });

      array.push(arrayFields)

    }else if(!Array.isArray(data[keyMain]) && data[keyMain].type=='object'){

      var objectFields = {key:keyMain,value:[{}],type:'object',relation:'object',belong:keyMain,isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
        Default:true,default:"NA",required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:false,
        autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old'}

      const entries2 = Object.entries(data[keyMain].properties);
      entries2.forEach(([keySec, value]) => {

        // @ts-ignore
        objectFields.value.push({key:keySec,type:value.type,relation:value.relation,belong:keyMain,isArray:false,primarykey:value.primarykey,fkey:value.fkey,ckey:value.ckey,uppercase:value.uppercase,
          // @ts-ignore
          Default:value.Default,default:value.default,required:value.required,enum:value.enum,enumValues:value.enumValues,minlength:value.minlength,maxlength:value.maxlength,boolean:value.boolean,
          // @ts-ignore
          autoIncrement:value.autoIncrement,lowercase:value.lowercase,trim:value.trim,unique:value.unique,min:value.min,max:value.max,sign:value.sign,unsign:value.unsign,float:value.float,int:value.int,
          // @ts-ignore
          floor:value.floor,celling:value.celling,steps:value.steps,indexes:value.indexes,hasFeilds:'old'})

      });

      array.push(objectFields)

    }else{
      array.push({key:keyMain,type:data[keyMain].type,relation:data[keyMain].relation,belong:keyMain,isArray:false,primarykey:data[keyMain].primarykey,fkey:data[keyMain].fkey,ckey:data[keyMain].ckey,uppercase:data[keyMain].uppercase,
        // @ts-ignore
        Default:data[keyMain].Default,default:data[keyMain].default,required:data[keyMain].required,enum:data[keyMain].enum,enumValues:data[keyMain].enumValues,minlength:data[keyMain].minlength,maxlength:data[keyMain].maxlength,boolean:data[keyMain].boolean,
        // @ts-ignore
        autoIncrement:data[keyMain].autoIncrement,lowercase:data[keyMain].lowercase,trim:data[keyMain].trim,unique:data[keyMain].unique,min:data[keyMain].min,max:data[keyMain].max,sign:data[keyMain].sign,unsign:data[keyMain].unsign,float:data[keyMain].float,int:data[keyMain].int,
        // @ts-ignore
        floor:data[keyMain].floor,celling:data[keyMain].celling,steps:data[keyMain].steps,indexes:data[keyMain].indexes,hasFeilds:'old'})
    }

  }

  return array
}
