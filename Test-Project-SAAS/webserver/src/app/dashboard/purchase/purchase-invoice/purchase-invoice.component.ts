import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../../../service.service";
import {NgToastService} from "ng-angular-popup";
import {CookieService} from "ngx-cookie-service";
import {someFunction2, ValidationFunction} from "../../../invoice/custome";
import {someFunction} from "../../../custome-tenant/custome";

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.css']
})
export class PurchaseInvoiceComponent {
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
  Data:any
  getData:any=[]

  // Initialize arrays to store keys and values
  allKeys:any = [];
  allValues:any = [];
  constructor(private router:ActivatedRoute,private service:ServiceService,private toast:NgToastService,private route:Router,
              private cookieService: CookieService) {}
  ngOnInit():void{
    console.log(this.router.snapshot.params['_id'])
    this.service.getPurchaseInvoiceStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.Status === "SUCCESS"){
        this.toast.success({detail:'Success',summary:res.Status})
        this.data = someFunction2(res.data)
        for(let Data of this.data){
          this.Data = Data
        }
      }else{
        this.toast.error({detail:'Error',summary:res.error})
      }
    })
  }

  config(){
    this.route.navigate(['mainModules/', this.router.snapshot.params['_id']])
    this.cookieService.set('PUBLISH','invoice')
  }

  toggle(){
    console.log('aaa')
    if (this.create){
      this.service.getPurchaseInvoice(this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res)
        if (res.Status === "SUCCESS"){
          for (let i = 0; i < res.data.length; i++) {
            this.getData.push(someFunction(res.data[i]))
          }
        }else{
          this.toast.error({detail:'Error',summary:res.error})
        }
      })
      this.create=false
      this.display=true
    } else {
      this.create=true
      this.display=false
    }
  }

  submit(data:any){
    this.service.postPurchaseInvoice(ValidationFunction(this.data),this.router.snapshot.params['_id']).subscribe((res:any)=>{
      if (res.Status === 'SUCCESS'){
        this.toast.success({detail:'Success',summary:res.Status})
      }else {
        console.log(res)
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
