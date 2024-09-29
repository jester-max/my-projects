import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../authService/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-sign-in-root-user',
  templateUrl: './sign-in-root-user.component.html',
  styleUrls: ['./sign-in-root-user.component.css']
})
export class SignInRootUserComponent {

  Response:any
  contactInfo:any={}

  password:any
  iconPassword:any

  constructor(public router:Router,private Auth:AuthService, private ActiveRoute: ActivatedRoute, private cookies:CookieService) {}

  SignInRootUser(SignInRootUserInfo:any) {
    this.Auth.SignInRootUser(SignInRootUserInfo).subscribe((Response:any)=>{
      this.Response = Response
      console.log(this.Response)
      if (this.Response.status === 'SUCCESS'){
        this.router.navigate(['select-service',this.Response.data.accessToken])
      }
      // this.cookies.set('accessToken',Response.data.accessToken)
    })
  }

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

  NevigateToUser() {
    this.router.navigate(['sign-in-user'])
  }

  NevigateToSignUp() {
    this.router.navigate(['sign-up'])
  }
}
