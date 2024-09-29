import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NavController} from "@ionic/angular";
import {ServiceService} from "../service.service";
import {Router} from "@angular/router";
import {ServicesService} from "../../services.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupData: FormGroup;
  signup:any
  password:any
  iconPassword:any
  otpInput:boolean=false

  constructor(private formBuilder: FormBuilder,private navCtrl: NavController,
              private auth:ServiceService,private router:Router,private service:ServicesService) {
    this.signupData = this.formBuilder.group({
      email: ['',[Validators.required]],
      contact: ['', [Validators.required,Validators.pattern(/^\d{10}$/), this.customPhoneNumberValidator]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue],
      otp: ['',[Validators.required]],
    } ,{ validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  customPhoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const phoneNumber = control.value;
    const isValid = /^\d{10}$/.test(phoneNumber);
    return isValid ? null : { invalidPhoneNumber: true };
  }



  ngOnInit() {
  }

  sendOTP(){
    if (this.signupData.get('contact')?.valid){
      const contactDetails = this.signupData.value;
      console.log(contactDetails.contact)
      this.auth.sendOTP({contact:contactDetails.contact}).subscribe((res) => {
        console.log(res)
        this.service.toastSuccess('OTP sent successfully')
        this.otpInput = true
      },(error) => {
        console.log(error)
          this.service.toastSuccess(error);
        });
    }else {
      this.service.toastSuccess('Please enter a valid contact number');
    }
  }

  verifyOTP() {
    const contactDetails = this.signupData.value;
    console.log(contactDetails.contact,contactDetails.otp)
    this.auth.verifyOTP({contact:contactDetails.contact,otp:contactDetails.otp}).subscribe((res:any)=>{
      console.log(res)
      this.service.toastSuccess('OTP verified successfully')
      this.otpInput = false
    },
    (error) => {
      this.service.toastSuccess(error.error.message);
    })
  }

  SignUp(){
    if (this.signupData.valid) {
      console.log(this.signupData.value)
      this.auth.signup(this.signupData.value).subscribe((res:any) => {
        if (res.status === 'success') {
          this.service.toastSuccess('Account created successfully');
          this.router.navigate(['/login']);
        }else {
          this.service.toastSuccess('Signup failed. Please try again');
        }
      },
      (error) => {
        this.service.toastSuccess(error.error.message);
      })
    } else {
      this.service.toastSuccess('Please fill all required fields correctly');
      console.log('Form is invalid');
      // Display validation errors
    }
  }

  showHidePassword(){
    this.password = document.getElementById('confirmPassword');
    this.iconPassword = document.getElementById('icon-password-register');
    if (this.password?.type == 'password') {
      this.password.setAttribute('type', 'text');
      this.iconPassword.classList.add('show-password-register');
    } else {
      this.password.setAttribute('type', 'password');
      this.iconPassword.classList.remove('show-password-register');
    }
  };
  emailAndContactValid(): boolean {
    const emailControl = this.signupData.get('email');
    const contactControl = this.signupData.get('contact');
    return (emailControl?.valid ?? false) && (contactControl?.valid ?? false);
  }

}
