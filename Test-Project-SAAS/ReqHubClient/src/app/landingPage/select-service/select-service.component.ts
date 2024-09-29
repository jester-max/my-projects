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

  constructor(public router:Router,private Auth:AuthService, public ActiveRoute: ActivatedRoute,) {}

  ngOnInit():void{
    this.services={
      erp:false,
      crm:false,
      payroll:false,
      benefits:false
    }
    console.log(this.ActiveRoute.snapshot.params['_accessToken'])
  }

  selectServices(){
    if (this.services.erp||this.services.crm||this.services.payroll||this.services.benefits){
      // @ts-ignore
      document.getElementById('sub-btn').classList.add('check')
    } else {
      // @ts-ignore
      document.getElementById('sub-btn').classList.remove('check')
    }
  }

}
