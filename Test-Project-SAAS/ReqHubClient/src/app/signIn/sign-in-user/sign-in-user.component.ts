import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../authService/auth.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.css']
})
export class SignInUserComponent {

  password:any
  iconPassword:any

  constructor(public router:Router,private Auth:AuthService, private ActiveRoute: ActivatedRoute, private cookies:CookieService) {}

  NevigateToRootUser() {
    this.router.navigate(['sign-in-root-user'])
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

  NevigateToSignUp() {
    this.router.navigate(['sign-up'])
  }
}
