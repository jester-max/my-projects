import {Component, ViewChild} from '@angular/core';
import {FeaturesModule} from "../../features.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {delay, finalize, of, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {UserNotificationComponent} from "../../../shared/notifications/user-notification/user-notification.component";
import {Router} from "@angular/router";
import {userNotification} from "../../../shared/services/userNotification.service";
import {environment} from "../../../core/constants/variables";
import {RESTAPIService} from "../../../shared/services/restApi.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData :FormGroup;
  isLoading = false;
  goThrowPhone:any=true
  number:any
  showOtpBox: boolean = false;
  otpForm:FormGroup;
  otp:any

  @ViewChild(UserNotificationComponent) userNotificationComponent!: UserNotificationComponent;
  constructor(private fb :FormBuilder,
              private authService:AuthService,
              private router : Router,
              private userNotificationService :userNotification,
              private restApiService : RESTAPIService,
              ) {
    this.loginData = this.fb.group({
      email:['',this.customValidator],
      password:['',Validators.required],
      contact:['',Validators.required],
    });

    /*this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit6: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });*/

    this.otpForm = this.fb.group({
     otp: ['', [Validators.required, Validators.pattern('[0-9]')]],
   });
  }

  customValidator(control:any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex = /^[0-9]{10}$/;
    const valid = emailRegex.test(control.value) || numberRegex.test(control.value);
    return valid ? null : { invalidEmailOrNum: true };
  }

  login() {
    this.isLoading = true;
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
    if (data) {
      const credentials = this.loginData.value;
      this.authService
        .login(data)
        .pipe(
          delay(500),
          tap(() => {
            this.isLoading = false;

            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
            console.log('login successful');
            this.userNotificationService.showSuccess('login successful')
          }),
          finalize(() => (this.isLoading = false)),
          catchError((error) => {
            console.log('Error in ts while login :', error.error.error);
            this.userNotificationService.showError(error.error.message);
            return of(error);
          }),
        )
        .subscribe();
    }
  }

  toggle(value:any){
    this.goThrowPhone = value
  }

  checkNumber(fieldName: string):void{
    this.number = this.loginData.get(fieldName);
    console.log(this.number)
    if (this.number?.value.length === 10){
      const numberRegex = /^[0-9]{10}$/;
      const valid = numberRegex.test(this.number?.value)
      if (valid){
        this.restApiService.post(`${environment.apiUrl}sendOtpPhone`, {contact:this.number?.value}).subscribe((res:any)=>{
          console.log('response from otp',res)
          this.userNotificationService.showSuccess('Otp Sent Successfully');
        },(err:any)=>{
          console.log('error while sending otp',err)
          return throwError(err);
        })
      } else {
        this.restApiService.post(`${environment.apiUrl}sendOtpMail`, {email:this.number?.value}).subscribe((res:any)=>{
          console.log('response from otp',res)
          this.userNotificationService.showSuccess('Otp Sent Successfully');
        },(err:any)=>{
          console.log('error while sending otp',err)
          return throwError(err);
        })

      }
    }
  }

  sendOtp(){
    this.restApiService.post(`${environment.apiUrl}sendOtpPhone/login`, {contact:this.loginData.get('contact')?.value}).subscribe((res:any)=> {
      console.log('response from otp', res)
      this.userNotificationService.showSuccess('Otp Sent Successfully');
      this.showOtpBox = true;
      this.goThrowPhone = false;
    })
  }


  verifyOTP() {
    const digitOne = this.otpForm.get('digit1')?.value;
    const digitTwo = this.otpForm.get('digit2')?.value;
    const digitThree = this.otpForm.get('digit3')?.value;
    const digitFour = this.otpForm.get('digit4')?.value;
    const digitFive = this.otpForm.get('digit5')?.value;
    const digitSix = this.otpForm.get('digit6')?.value;


    const otp = this.otpForm.get('otp')?.value;
    const data= {
      otp:otp,
      contact:this.loginData.get('contact')?.value
    }
    console.log('otp',data)
    this.authService.verifyPhoneOtp(data).subscribe(
      (response) => {

        console.log('OTP verified successfully', response);
        const regData = this.loginData.value;

        this.authService.login(data).pipe(
          tap((response:any)=>{
            console.log('response',response);
            if(response.status==='Success'){
              this.userNotificationService.showSuccess('Your Account Created Successfully');
              this.router.navigate(['/'])
            }
          }),
          catchError((error:any)=>{
            console.log('error while adding the user :',error);
            this.isLoading = false;
            this.userNotificationService.showError(error.error.error);

            return throwError(error);
          })
        ).subscribe();
      },
      (error) => {

        console.error('Error verifying OTP:', error);
      }
    );
  }

  resendOtp(){
    const contact = this.loginData.get('contact')?.value;
    console.log('contact',contact);
    this.restApiService
      .post(`${environment.apiUrl}sendOtpPhone`, { contact:contact })
      .subscribe(
        (res: any) => {
          console.log('response from otp', res);
        },
        (err: any) => {
          console.log('error while resending otp', err);
        },
      );
  }
}
