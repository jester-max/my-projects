import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {userNotification} from "../../../shared/services/userNotification.service";
import {RESTAPIService} from "../../../shared/services/restApi.service";
import {environment} from "../../../core/constants/variables";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.scss']
})
export class SignupComponentComponent {
  signupData:FormGroup;
  otpForm:FormGroup;
  isLoading = false;
  showOtpBox: boolean = false;
  uppercaseValid: boolean = false;
  specialCharacterValid: boolean = false;
  characterLengthValid:boolean = false;
  numberValid:boolean = false;
  number:any

  constructor(private fb :FormBuilder,
              private authService : AuthService,
              private userNotificationService :userNotification,
              private restApiService : RESTAPIService,
              private router : Router
              ) {
    this.signupData = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      contact:['',[Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{10,}$/)]],
      confirmPassword:['',[Validators.required]],
      termNdCondition:['',[Validators.required]]
    },{validator:this.passwordMatchValidator()})
    this.signupData.get('password')?.valueChanges.subscribe(value=>{
      this.uppercaseValid = /[A-Z]/.test(value);
      this.specialCharacterValid = /[!@#$%^&*]/.test(value);
      this.characterLengthValid = value.length >= 10 && value.length <= 24;
      this.numberValid = /\d/.test(value);
    });

    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit6: ['', [Validators.required, Validators.pattern('[0-9]')]],
    });
  }

  //automatically focus on next input boxes in OTP
  @HostListener('input', ['$event.target'])
  onInput(input: HTMLInputElement) {
    const maxLength = input.maxLength;
    const nextInputId = parseInt(input.id.split('-')[1]) + 1;
    const nextInput = document.getElementById(`code-${nextInputId}`) as HTMLInputElement;
    if (nextInput && input.value.length === maxLength) {
      nextInput.focus();
    }
  }
  passwordMatchValidator(){
    return (formGroup: FormGroup): ValidationErrors | null => {
      const passwordControl = formGroup.get('password');
      const confirmPasswordControl = formGroup.get('confirmPassword');

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl?.setErrors(null);
        return null;
      }
    };
  }

  signup(){
    this.isLoading = true;
    const regData = this.signupData.value;
    console.log('registration data :',regData);
    if(this.signupData.valid){
      this.number = regData.contact

      /*      this.restApiService.post(`${environment.apiUrl}sendOtpMail`, {email:regData.email}).subscribe((res:any)=>{
        console.log('response from otp',res)
        this.userNotificationService.showSuccess('Otp Sent Successfully');
        this.showOtpBox = true;
      },(err:any)=>{
        this.userNotificationService.showError(err.error.error);
        console.log('error while sending otp',err)
        return throwError(err);
      })*/

      this.restApiService.post(`${environment.apiUrl}sendOtpPhone/registration`, {contact:regData.contact,password:regData.password}).subscribe((res:any)=>{
        console.log('response from otp',res)
        this.userNotificationService.showSuccess('Otp Sent Successfully');
        this.showOtpBox = true;
      },(err:any)=>{
        console.log('error while sending otp',err)
        this.userNotificationService.showError(err.error.message);
        return throwError(err);
      })
    }else if(this.signupData.get('termNdCondition')?.value ==='' ){
      console.log('hi')
      this.userNotificationService.showAlert('Please agree to the terms and conditions to proceed')
      this.isLoading = false;
    } else {
      console.log('hey')
      this.signupData.markAllAsTouched();
      this.isLoading = false;
    }
  }


  verifyOTP() {
    const digitOne = this.otpForm.get('digit1')?.value;
    const digitTwo = this.otpForm.get('digit2')?.value;
    const digitThree = this.otpForm.get('digit3')?.value;
    const digitFour = this.otpForm.get('digit4')?.value;
    const digitFive = this.otpForm.get('digit5')?.value;
    const digitSix = this.otpForm.get('digit6')?.value;


    const otp = digitOne+digitTwo+digitThree+digitFour+digitFive+digitSix
    const data= {
      otp:otp,
      contact:this.number
    }
    console.log('otp',data)
    this.authService.verifyPhoneOtp({contact:data.contact,otp:data.otp}).subscribe(
      (response) => {

        console.log('OTP verified successfully', response);
        const regData = this.signupData.value;

        this.authService.addUser(regData).pipe(
          tap((response:any)=>{
            console.log('response',response);
            if(response.status==='success'){
              this.userNotificationService.showSuccess('Your Account Created Successfully');
              this.router.navigate(['/action/login'])
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
    const contact = this.signupData.get('contact')?.value;
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

  isFieldInvalid(fieldName: string): boolean {
    const control = this.signupData.get(fieldName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  clearError(fieldName: string): void {
    const control = this.signupData.get(fieldName);
    if (control && control.invalid) {
      control.markAsUntouched();
      control.updateValueAndValidity();
    }
  }

  checkNumber(fieldName: string):void{
    this.number = this.signupData.get(fieldName);
    if (this.number?.value.length === 10){
      this.restApiService.post(`${environment.apiUrl}sendOtpPhone`, {contact:this.number?.value}).subscribe((res:any)=>{
        console.log('response from otp',res)
        this.userNotificationService.showSuccess('Otp Sent Successfully');
        this.showOtpBox = true;
      },(err:any)=>{
        this.userNotificationService.showError(err.error.error);
        console.log('error while sending otp',err)
        return throwError(err);
      })
    }
  }

}
