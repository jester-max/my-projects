import { Component } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {AuthService} from "../../authService/auth.service";

@Component({
  selector: 'app-sign-up-verification',
  templateUrl: './sign-up-verification.component.html',
  styleUrls: ['./sign-up-verification.component.css']
})
export class SignUpVerificationComponent {

  password:any
  iconPassword:any

  Response:any
  Verfify:any={}

  constructor(public router:Router, private Auth:AuthService) { }

  showHidePassword(){
    this.password = document.getElementById('password');
    this.iconPassword = document.getElementById('icon-password');
    if (this.password?.type == 'password') {
      this.password.setAttribute('type', 'text');
      this.iconPassword.classList.add('show-password');
    } else {
      this.password.setAttribute('type', 'password');
      this.iconPassword.classList.remove('show-password');
    }
  };

  ngOnInit():void{
    this.Verfify={
      email:'',
      accountName:'',
      password:'',
      veriCode:''
    }
  }

  SignUpVerfify() {
  this.Auth.SignUpVerfifyPost(this.Verfify).subscribe((Response:any)=>{
    this.Response = Response
    console.log(this.Response)
    if (Response.status === 'SUCCESS' && this.Verfify.veriCode){
      console.log(this.Response)
      this.router.navigate(['/sign-up-contact-info',Response.data.accountName])
    }
  })
  }

  NevigateToRootUser() {
    this.router.navigate(['sign-in-root-user'])
  }

  resendCode() {
    this.Verfify.veriCode=''
    this.SignUpVerfify()
  }
}

