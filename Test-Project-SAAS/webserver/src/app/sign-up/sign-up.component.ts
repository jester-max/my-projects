import { Component } from '@angular/core';
import {ServiceService} from "../service.service";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private service:ServiceService) {
  }
  SignUp(data:any){
    console.log(data)
    this.service.addTenant(data).subscribe((res:any)=>{
      console.log(res)
    })
  }
}
