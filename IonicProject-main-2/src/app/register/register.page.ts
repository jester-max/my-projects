import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import{ServiceService} from "../service.service";
import {CookieService} from "ngx-cookie-service";
import {StatusBar} from "@capacitor/status-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  password:any
  iconPassword:any
  message:any
  passwordValue:any=''

  constructor(private router:Router,private ActiveRouter:ActivatedRoute,private service:ServiceService,private cookie:CookieService) { }

  ngOnInit(){
    StatusBar.setBackgroundColor({color:'#3880ff'})
  }

  register(data:any){
    console.log(data)
    this.service.register(data).subscribe((res:any)=>{
      console.log(res,'hii')
       if (res.status=='SUCCESS'){
         this.router.navigate(['sign-in'])
       }else if (res.status == 'ERROR'){
         this.message = res.message
         console.log('error',res)
       }
    })

  }


  showHidePassword(){
    this.password = document.getElementById('password-register');
    this.iconPassword = document.getElementById('icon-password-register');
    if (this.password?.type == 'password') {
      this.password.setAttribute('type', 'text');
      this.iconPassword.classList.add('show-password-register');
    } else {
      this.password.setAttribute('type', 'password');
      this.iconPassword.classList.remove('show-password-register');
    }
  };


  strenghtChecker(pass:any): any {
    this.passwordValue = pass
    let passwordStrength = document.getElementById("password-strength");
    let lowUpperCase = document.querySelector(".low-upper-case svg");
    let number = document.querySelector(".one-number svg");
    let specialChar = document.querySelector(".one-special-char svg");
    let eightChar = document.querySelector(".eight-character svg");
    let passwordError = document.getElementById('password-register');
    let strength = 0;

    //If password contains both lower and uppercase characters
    // @ts-ignore
    if (this.passwordValue.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
      // @ts-ignore
      lowUpperCase.classList.remove('fi-rr-circle-small');
      // @ts-ignore
      lowUpperCase.classList.add('fi-rr-check-circle');
    } else {
      // @ts-ignore
      lowUpperCase.classList.add('fi-rr-circle-small');
      // @ts-ignore
      lowUpperCase.classList.remove('fi-rr-check-circle');
    }
    //If it has numbers and characters
    // @ts-ignore
    if (this.passwordValue.match(/([0-9])/)) {
      strength += 1;
      // @ts-ignore
      number.classList.remove('fi-rr-circle-small');
      // @ts-ignore
      number.classList.add('fi-rr-check-circle');
    } else {
      // @ts-ignore
      number.classList.add('fi-rr-circle-small');
      // @ts-ignore
      number.classList.remove('fi-rr-check-circle');
    }
    //If it has one special character
    // @ts-ignore
    if (this.passwordValue.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
      // @ts-ignore
      specialChar.classList.remove('fi-rr-circle-small');
      // @ts-ignore
      specialChar.classList.add('fi-rr-check-circle');
    } else {
      // @ts-ignore
      specialChar.classList.add('fi-rr-circle-small');
      // @ts-ignore
      specialChar.classList.remove('fi-rr-check-circle');
    }
    //If password is greater than 7
    // @ts-ignore
    if (this.passwordValue.length > 7) {
      strength += 1;
      // @ts-ignore
      eightChar.classList.remove('fi-rr-circle-small');
      // @ts-ignore
      eightChar.classList.add('fi-rr-check-circle');
    } else {
      // @ts-ignore
      eightChar.classList.add('fi-rr-circle-small');
      // @ts-ignore
      eightChar.classList.remove('fi-rr-check-circle');
    }

    // If value is less than 2
    if (strength < 2) {
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-warning');
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-success');
      // @ts-ignore
      passwordStrength.classList.add('progress-bar-danger');
      // @ts-ignore
      passwordStrength.style.width = '10%';
      // @ts-ignore
      // passwordError.style.border = '2px solid #e90f10';
      return false
    } else if (strength == 3) {
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-success');
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-danger');
      // @ts-ignore
      passwordStrength.classList.add('progress-bar-warning');
      // @ts-ignore
      passwordStrength.style.width = '60%';
      // @ts-ignore
      // passwordError.style.border = '2px solid #ffad00';
      return false
    } else if (strength == 4) {
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-warning');
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-danger');
      // @ts-ignore
      passwordStrength.classList.add('progress-bar-success');
      // @ts-ignore
      passwordStrength.style.width = '100%';
      // @ts-ignore
      // passwordError.style.border = '2px solid #02b502';
      return true
    }
  }
}
