import { Component } from '@angular/core';
import {someFunction2, ValidationFunction} from "../../invoice/custome";
import {someFunction} from "../../custome-tenant/custome";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../../service.service";
import {NgToastService} from "ng-angular-popup";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  data:any
  data2:any

  navigate:any=['Create','Display']

  array:any=[]
  object:any=[]
  neWdata:any=[]

  newObj:any={}
  newArray:any=[]
  create:boolean=true
  display:boolean=false
  Data:any=[]
  getData:any=[]

  // Initialize arrays to store keys and values
  allKeys:any = [];
  allValues:any = [];

  pageSize = 20;
  pageIndex = 0;
  constructor(private router:ActivatedRoute,private service:ServiceService,private toast:NgToastService,private route:Router,
              private cookieService: CookieService) {}

  ngOnInit():void{
    console.log(this.router.snapshot.params['_id'])
    this.service.getSaleInvoiceStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.status === "SUCCESS"){
        // this.toast.success({detail:'Success',summary:res.Status})
        this.data = someFunction2(res.data)
        console.log(this.data)
        for(let Data of this.data){
          if (Data.type !== undefined){
            this.Data.push(Data)
          }
        }
      }else{
        // this.toast.error({detail:'Error',summary:res.error})
      }
    })
  }

  config(){
    this.route.navigate(['mainModules/', this.router.snapshot.params['_id']])
    this.cookieService.set('PUBLISH','invoice')
  }

  toggle(){
    if (this.create){
      // this.service.getSaleInvoice(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      //   console.log(res)
      //   if (res.status === "SUCCESS"){
      //     for (let i = 0; i < res.data.length; i++) {
      //       this.getData.push(someFunction(res.data[i]))
      //     }
      //   }else{
      //     // this.toast.error({detail:'Error',summary:res.error})
      //   }
      // })
      this.create=false
      this.display=true
    } else {
      this.create=true
      this.display=false
    }
  }


  add(i:number){
    for (let keyMain = 0; keyMain < 5; keyMain++) {
      if(this.data[i].value[keyMain]){
        var arrayFields = {key:this.data[i].value[keyMain].key,value:[{}],type:this.data[i].value[keyMain].type,relation:'array',belong:'array',isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:false,
          Default:true,default:this.data[i].value[keyMain].default,required:false,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:false,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'old'}
        this.data[i].value.push(arrayFields)
      }
    }
  }

  remove(i: number) {
    this.data.splice(i, 1);
  }

  submit(data:any){
    this.service.postInvoiceAdmin(ValidationFunction(this.data),this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.status === "SUCCESS"){
        this.toast.success({detail:'Success',summary:res.Status})
      }else {
        this.toast.error({detail: 'Error', summary: res.error})
      }
    })
  }


  flattenObject(obj:any, parentKey = '') {
    let result:any = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentKey =  key;

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          // If the value is an object or array, recursively flatten it
          Object.assign(result, this.flattenObject(obj[key], currentKey));
        } else {
          // If the value is not an object, add it to the result
          result[currentKey] = obj[key];
        }
      }
    }
    return result
  }
}
