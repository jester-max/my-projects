import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../service.service";
import {Router} from "@angular/router";
import {ServicesService} from "../../services.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData: FormGroup;
  isLoading = false;
  validInput:any=false

  password:any
  iconPassword:any

  constructor(private fb: FormBuilder, private auth:ServiceService,
              private router:Router,private service:ServicesService) {
    this.loginData = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      otp: ['', Validators.required],
    })
  }

  emailLogin(){
  const numberRegex = /^[0-9]{10}$/;
  const valid = numberRegex.test(this.loginData.get('email')?.value)
  let data = {}
  if (valid){
    data={
      contact:this.loginData.get('email')?.value,
      password:this.loginData.get('password')?.value
    }
  } else {
    data={
      email:this.loginData.get('email')?.value,
      password:this.loginData.get('password')?.value
    }
  }
  this.login(data)
}

login(data:any){
  this.auth.loginUser(data).subscribe((res:any)=>{
    console.log(res)
      this.service.toastSuccess('Login successfully');
      localStorage.setItem('accessToken',res.accessToken)
      this.router.navigate(['/home-panel'])
  },error => {
    console.log(error)
    this.service.toastSuccess(error.error.message);
  })

}

  verifyOTP() {
    const contactDetails = this.loginData.value;
    console.log(contactDetails.contact,contactDetails.otp)
    this.auth.verifyOTP({contact:contactDetails.contact,otp:contactDetails.otp}).subscribe((res:any)=>{
      console.log(res)
      this.login({contact:contactDetails.contact,otp:contactDetails.otp})
      this.service.toastSuccess('OTP verified successfully')

    },
    (error) => {
      this.service.toastSuccess(error.error.message);
    })
  }

  checkNumber(){
    const numberRegex = /^[0-9]{10}$/;
    this.validInput = numberRegex.test(this.loginData.get('email')?.value)
  }

  sendOTPLogin(){
    const numberRegex = /^[0-9]{10}$/;
    if (numberRegex.test(this.loginData.get('contact')?.value)){
      console.log('hi')
      const contactDetails = this.loginData.value;
      this.auth.sendOTPLogin({contact:contactDetails.contact}).subscribe((res) => {
        console.log(res)
        this.service.toastSuccess('OTP sent successfully')
      },
      (error) => {
        this.service.toastSuccess(error.error.message);
      })
    }else {
      this.service.toastSuccess('Please enter a valid contact number');
    }
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

  ngOnInit() {
  }
}
