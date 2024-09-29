import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../authService/auth.service";

@Component({
  selector: 'app-sign-up-contact-info',
  templateUrl: './sign-up-contact-info.component.html',
  styleUrls: ['./sign-up-contact-info.component.css']
})
export class SignUpContactInfoComponent {

  Response:any
  contactInfo:any={}
  constructor(public router:Router,private Auth:AuthService, private ActiveRoute: ActivatedRoute) {}

  SignUpContact(contactInfo:any) {
    console.log(contactInfo)
    this.Auth.SignUpVerfifyUpdate(contactInfo,this.ActiveRoute.snapshot.params['_tenantId']).subscribe((Response:any)=>{
      this.Response = Response
      console.log(this.Response)
      if (this.Response.status === 'SUCCESS'){
        this.router.navigate(['/sign-in-root-user'])
      }
    })

    // this.router.navigate(['/sign-up-billing-info'])
  }
}
