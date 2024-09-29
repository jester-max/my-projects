import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../authService/auth.service";

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.css']
})
export class SelectServiceComponent {
  services:any
  checked:any=document.getElementById('sub-btn')
  SelectedServices:any=[]

  constructor(public router:Router,private Auth:AuthService, public ActiveRoute: ActivatedRoute,) {}

  ngOnInit():void{
    this.services={
      ERP:false,
      CRM:false,
      PAYROLL:false,
      BENEFITS:false
    }
    console.log(this.ActiveRoute.snapshot.params['_accessToken'])
  }

 /* selectServices(){
    if (this.services.erp||this.services.crm||this.services.payroll||this.services.benefits){
      // @ts-ignore
      document.getElementById('sub-btn').classList.add('check')
    } else {
      // @ts-ignore
      document.getElementById('sub-btn').classList.remove('check')
    }
  }*/

  selectServices(SelectedServices:any){
    if (this.services.ERP || this.services.CRM || this.services.PAYROLL || this.services.BENEFITS) {
      if (!this.SelectedServices.includes(SelectedServices)) {
        this.SelectedServices.push(SelectedServices);
        // @ts-ignore
        document.getElementById('sub-btn').classList.add('check')
        // You can add other actions you want when a service is selected
      } else {
        const indexToRemove = this.SelectedServices.indexOf(SelectedServices);
        if (indexToRemove !== -1) {
          this.SelectedServices.splice(indexToRemove, 1);
          // You can add other actions you want when a service is deselected
        }
      }
    } else {
      // @ts-ignore
      document.getElementById('sub-btn').classList.remove('check')
    }
  }

  GetStarted() {
    console.log(this.SelectedServices)
    this.Auth.GetStartedServices(this.SelectedServices,this.ActiveRoute.snapshot.params['_accessToken']).subscribe((res:any)=>{
      console.log(res)
      if (res.status === 'SUCCESS'){
       window.location.href = `http://localhost/configurationModule/${this.ActiveRoute.snapshot.params['_accessToken']}`;
     }
    })
  }

}
