import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureService} from "../structure.service";
import {someFunction2, ValidationFunction} from "../../../assets/configuredSchema";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  data:any
  data2:any
  Data:any=[]

  constructor(public router:ActivatedRoute,
              private service:StructureService,
              private route:Router,
              private cookieService: CookieService) {}

  ngOnInit():void{
    this.service.getSaleInvoiceStructure(this.router.snapshot.params['token']).subscribe((res:any)=>{
      if (res.status === "SUCCESS"){
        // this.toast.success({detail:'Success',summary:res.Status})
        this.data = someFunction2(res.data)
        for (let i = this.data.length - 1; i >= 0; i--) {
          if (this.data[i].type === 'array') {
            this.data[i].value.splice(0, 1);
            this.Data.push(this.data[i]);
            this.data.splice(i, 1);
          }else if (this.data[i].key==='_id' || this.data[i].key==='__v'){
            this.data.splice(i, 1);
          }
        }
        console.log(this.data)
      }else{
        // this.toast.error({detail:'Error',summary:res.error})
      }
    })
  }

  submit(data:any){
    this.service.postInvoiceAdmin(ValidationFunction(this.data),this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.status === "SUCCESS"){
        // this.toast.success({detail:'Success',summary:res.Status})
      }else {
        // this.toast.error({detail: 'Error', summary: res.error})
      }
    })
  }
}
