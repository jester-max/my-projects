import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../../service.service";
import {NgToastService} from "ng-angular-popup";
import {CookieService} from "ngx-cookie-service";
import {someFunction2, ValidationFunction} from "../../invoice/custome";
import {someFunction, updateFunction} from "../../custome-tenant/custome";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
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

  length = 50;
  pageSize = 20;
  pageIndex = 0;
  pageNumber = 1
  searchInput:any=''
  pageSizeOptions = [20,50,80,100];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  goPage:any
  //pagination  end

  constructor(public router:ActivatedRoute,private service:ServiceService,private toast:NgToastService,private route:Router,
              private cookieService: CookieService) {}

  ngOnInit():void{
    this.service.getSaleInvoiceStructure(this.router.snapshot.params['_id'])?.subscribe((res:any)=>{
      console.log(res)
      if (res.status === "SUCCESS"){
        this.toast.success({detail:'Success',summary:res.Status})
        this.data = someFunction2(res?.data)
        for(let Data of this.data){
          if (Data.type !== undefined){
            this.Data.push(Data)
          }
        }
      }else{
        this.toast.error({detail:'Error',summary:res.error})
      }
      this.service.getSaleInvoice(this.pageSize,this.pageNumber,this.searchInput,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        if (res.status === "SUCCESS"){
          for (let i = 0; i < res.data.length; i++) {
            this.getData.push(someFunction(res?.data[i]))
          }
        }else{
          this.toast.error({detail:'Error',summary:res.error})
        }
      })
    })
  }

  config(){
    this.route.navigate(['mainModules/', this.router.snapshot.params['_id']])
    this.cookieService.set('PUBLISH','invoice')
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

  selectPageSize(size:any,number:any) {
    this.getData=[]
    this.pageSize = size;
    if (number===0){
      this.pageNumber = 1;
    } else {
      this.pageNumber = number;
    }
    this.service.getSaleInvoice(this.pageSize,this.pageNumber,this.searchInput,this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.status === "SUCCESS"){
        for (let i = 0; i < res.data.length; i++) {
          this.getData.push(someFunction(res?.data[i]))
        }
      }else{
        // this.toast.error({detail:'Error',summary:res.error})
      }
    })
  }

  search(size:any,number:any){
    this.getData=[]
    this.pageSize = size;
    this.pageNumber = number;
    this.service.getSaleInvoice(this.pageSize,this.pageNumber,this.searchInput,this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.status === "SUCCESS"){
        for (let i = 0; i < res.data.length; i++) {
          this.getData.push(someFunction(res.data[i]))
        }
      }else{
        // this.toast.error({detail:'Error',summary:res.error})
      }
    })
  }

  updateInvoice(id:any){
    this.route.navigate(['landing-page',this.router.snapshot.parent?.url[1].path,this.router.snapshot.parent?.url[0].path,this.router.snapshot.parent?.url[1].path,'Update',id])
  }

  deleteAllInvoice() {
    if (confirm('Are you want delete all?')){
      this.service.deleteAllInvoice(this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res)
        if (res.status === "SUCCESS"){
          this.toast.success({detail:'Success',summary:res.Status})
          location.reload()
        }else{
          this.toast.error({detail:'Error',summary:res.error})
        }
      })
    }
  }

  deleteOneInvoice(deleteId:any) {
    if (confirm('Are you want delete these?')){
      this.service.deleteOneInvoice(deleteId,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res)
        if (res.status === "SUCCESS"){
          this.toast.success({detail:'Success',summary:res.Status})
          location.reload()
        }else{
          this.toast.error({detail:'Error',summary:res.error})
        }
      })
    }
  }
}

