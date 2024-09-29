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
  }

  ngOnInit():void{
    this.Verfify={
      email:'',
      accountName:'',
      password:'',
      veriCode:''
    }
  }

  NevigateToRootUser() {
    this.router.navigate(['sign-in-root-user'])
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

  resendCode() {
    this.Verfify.veriCode=''
    this.SignUpVerfify()
  }

  strenghtChecker(pass:any): any {
    let password = pass
    let passwordStrength = document.getElementById("password-strength");
    let lowUpperCase = document.querySelector(".low-upper-case i");
    let number = document.querySelector(".one-number i");
    let specialChar = document.querySelector(".one-special-char i");
    let eightChar = document.querySelector(".eight-character i");
    let passwordError = document.getElementById('password');
    let strength = 0;

    console.log(passwordStrength, lowUpperCase, number, specialChar, eightChar, passwordError)

    //If password contains both lower and uppercase characters
    // @ts-ignore
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
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
    if (password.match(/([0-9])/)) {
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
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
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
    if (password.length > 7) {
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
      passwordStrength.style = 'width: 10%';
      // @ts-ignore
      passwordError.style.border = '2px solid #e90f10';
      return false
    } else if (strength == 3) {
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-success');
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-danger');
      // @ts-ignore
      passwordStrength.classList.add('progress-bar-warning');
      // @ts-ignore
      passwordStrength.style = 'width: 60%';
      // @ts-ignore
      passwordError.style.border = '2px solid #ffad00';
      return false
    } else if (strength == 4) {
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-warning');
      // @ts-ignore
      passwordStrength.classList.remove('progress-bar-danger');
      // @ts-ignore
      passwordStrength.classList.add('progress-bar-success');
      // @ts-ignore
      passwordStrength.style = 'width: 100%';
      // @ts-ignore
      passwordError.style.border = '2px solid #02b502';
      return true
    }
  }
}

