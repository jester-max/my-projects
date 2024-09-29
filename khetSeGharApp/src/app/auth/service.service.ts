import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Subject, tap} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  deliveryDates: any;
  url = environment.url;
  constructor( private router : Router ,private HTTP:HttpClient ) {
  }

  _refreshNeeded$ = new Subject<void>();

  refreshNeeded(){
    return this._refreshNeeded$
  }

  setDeliveryDates(dates: any) {
    this.deliveryDates = dates;
    sessionStorage.setItem('del_dates',JSON.stringify(this.deliveryDates))
  }

  loginUser(loginDetails:any){
   return this.HTTP.post(`${this.url}login/user`,loginDetails)
     .pipe(tap(()=>{
       this._refreshNeeded$.next();
     }))
  }

  signup(signupDetails:any){
    return this.HTTP.post(`${this.url}register/user`,signupDetails)
  }

  sendOTP(contactDetails:any){
    return this.HTTP.post(`${this.url}sendOtpPhone/registration`,contactDetails)
  }
  sendOTPLogin(contactDetails:any){
    return this.HTTP.post(`${this.url}sendOtpPhone/login`,contactDetails)
  }

  verifyOTP(otpDetails:any){
    return this.HTTP.post(`${this.url}verifyOtpPhone`,otpDetails)
  }


  getDeliveryDates() {
    return this.deliveryDates;
  }

}
