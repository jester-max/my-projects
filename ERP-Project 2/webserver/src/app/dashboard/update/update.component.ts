import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../../service.service";
import {NgToastService} from "ng-angular-popup";
import {CookieService} from "ngx-cookie-service";
import {someFunction2, ValidationFunction} from "../../invoice/custome";
import {PageEvent} from "@angular/material/paginator";
import {someFunction, updateFunction} from "../../custome-tenant/custome";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
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
  GetData:any=[]

  // Initialize arrays to store keys and values
  allKeys:any = [];
  allValues:any = [];

  pageSize = 20;
  pageIndex = 0;
  constructor(private router:ActivatedRoute,private service:ServiceService,private toast:NgToastService,private route:Router,
              private cookieService: CookieService) {}

  ngOnInit():void{
    this.service.getSaleInvoiceStructure(this.router.snapshot.parent?.url[1].path).subscribe((res:any)=>{
      delete res.data._id;
      delete res.data.id;
      // delete res.data.invoice_id;
      if (res.status === "SUCCESS"){
        this.toast.success({detail:'Success',summary:res.status})
        this.data = someFunction2(res.data)
        for(let Data of this.data){
          if (Data.type !== undefined){
            this.Data.push(Data)
          }
        }
      }else{
        this.toast.error({detail:'Error',summary:res.error})
      }
    })

    this.service.getOneSaleInvoice(this.router.snapshot.params['_id'],this.router.snapshot.parent?.url[1].path).subscribe((res:any)=>{
      delete res.data[0].id;
      // delete res.data[0].invoice_id;
      this.getData = updateFunction(res.data)
      if (res.status === "SUCCESS"){
        for (let GetData of this.getData) {
          // this.getData.push(someFunction(res.data[i]))
          this.GetData.push(GetData.default)
        }
      }else{
        this.toast.error({detail:'Error',summary:res.error})
      }
    })
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
    this.data[i].value.splice(i, 1);
  }

  submit(data:any){
    this.service.updateSaleInvoice(ValidationFunction(this.getData),this.router.snapshot.parent?.url[1].path,this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.status === "SUCCESS"){
        this.toast.success({detail:'Success',summary:res.Status})
      }else {
        console.log(res)
        this.toast.error({detail: 'Error', summary: res.error})
      }
    })
  }
}
