import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../service.service";
import {StatusBar} from "@capacitor/status-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  password:any
  iconPassword:any
  message:any=''
  forgotData:any

  email:boolean=true
  verifyCode:boolean=false
  newPassword:boolean=false

  passwordValue:any=''
  constructor(private router:Router,private ActiveRouter:ActivatedRoute,private service:ServiceService) { }


  ngOnInit() {
    this.forgotData={
      email:'',
      verifyCode:'',
      newPassword:'',
    }
    StatusBar.setBackgroundColor({color:'#3880ff'})
  }

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

  sendMail(){
    this.service.SendMail(this.forgotData.email).subscribe((res:any)=>{
      console.log(res)
      if (res.status==='SUCCESS'){
        this.email=false;
        this.verifyCode=true;
      }else {
        this.email=true;
        this.verifyCode=false;
      }
      this.message=res.message
    })
  }

  sendToken(){
    this.service.SendVerifyToken(this.forgotData.verifyCode).subscribe((res:any)=>{
      console.log(res)
      if (res.status==='SUCCESS'){
        this.email=false;
        this.verifyCode=false;
        this.newPassword=true;
      }else {
        this.email=false;
        this.verifyCode=true;
        this.newPassword=false;
      }
      this.message=res.message
    })
  }

  createdPassword(){
    this.service.createPassword(this.forgotData).subscribe((res:any)=>{
      console.log(res)
      if (res.status==='SUCCESS') {
        this.router.navigate(['sign-in'])
      }else {
        console.log(res)
      }
    })
    // this.router.navigate(['/scanner/',"ankit"])
  }

  showHidePassword(){
    this.password = document.getElementById('password-login');
    this.iconPassword = document.getElementById('icon-password-login');
    if (this.password?.type == 'password') {
      this.password.setAttribute('type', 'text');
      this.iconPassword.classList.add('show-password-login');
    } else {
      this.password.setAttribute('type', 'password');
      this.iconPassword.classList.remove('show-password-login');
    }
  };


}
