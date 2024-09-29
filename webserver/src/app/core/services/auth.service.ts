import { Injectable } from '@angular/core';
import {of, Observable, throwError, BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from "rxjs/operators";
import {User} from "../models/user.model";
import {environment} from "../constants/variables";
import {RESTAPIService} from "../../shared/services/restApi.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loginUrl = `${environment.apiUrl}login/user`;
  private adminLoginUrl = `${environment.apiUrl}login/admin`;

  private signupUrl = `${environment.apiUrl}register/user`;
  private verifyOtpUrl = `${environment.apiUrl}verifyMailOtp`;
  private verifyOtpPhoneUrl = `${environment.apiUrl}verifyOtpPhone`;
  private verifyAndLoginUrl = `${environment.apiUrl}login/user/with/otp`;
  private getUserUrl = `${environment.apiUrl}user`

  private currentUser = new BehaviorSubject<any>(null);

  constructor(private restApi: RESTAPIService) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.fetchUserDetails();
    }
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true,

  };

  login(loginContext: any): Observable<any> {
    console.log('login data',loginContext)
    return this.restApi.post(`${this.loginUrl}`, loginContext)
      .pipe(
        catchError((error) => {
          console.log('AuthService: Error during login:', error);
          return throwError(error.error.message);
        }),
        tap((res: any) => {
          if (res && res.accessToken) {
            console.log('Setting the token');
            const newToken = res.accessToken;
            const existingToken = localStorage.getItem('accessToken');
            console.log(existingToken, 'existing Token')
            if (existingToken===null||undefined) {
              localStorage.setItem('accessToken', newToken);
              this.fetchUserDetails();
            } else {
              console.log('Token is the same; no need to update.');
            }
          } else {
            console.log('Cannot set the token');
            localStorage.removeItem('accessToken');
          }
        }));
  }


  adminLogin(loginContext: User): Observable<any> {

    return this.restApi.post(`${this.adminLoginUrl}`, loginContext)
      .pipe(
        catchError((error) => {
          console.log('AuthService: Error during login:', error);
          return throwError(error);
        }),
        tap((res: any) => {
          if (res && res.accessToken) {
            console.log('Setting the token');
            const newToken = res.accessToken;
            const existingToken = localStorage.getItem('accessToken');
            console.log(existingToken, 'existing Token')
            if (existingToken===null||undefined) {
              localStorage.setItem('accessToken', newToken);
            } else {
              console.log('Token is the same; no need to update.');
            }
          } else {
            console.log('Cannot set the token');
            localStorage.removeItem('accessToken');
          }
        }));
  }



  addUser(registrationData: any): Observable<any> {
    console.log('regData :', registrationData)
    return this.restApi
      .post(`${this.signupUrl}`, registrationData).pipe(catchError((error)=>{
        console.log('error during register user',error)
        return throwError(error)
      }),tap((res:any)=>{
        if (res && res.accessToken) {
          console.log('Setting the token');
          const newToken = res.accessToken;
          const existingToken = localStorage.getItem('accessToken');

          console.log(existingToken, 'existing Token')
          if (existingToken===null||undefined) {
            localStorage.setItem('accessToken', newToken);
          } else if(existingToken !== newToken){
            console.log('setted up new token ');
            localStorage.setItem('accessToken', newToken);

          }
        } else {
          console.log('Cannot set the token');
          localStorage.removeItem('accessToken');
        }
      }))
  }
  verifyOtp(otp: string): Observable<any> {
    return this.restApi.post(`${this.verifyOtpUrl}`, { otp });
  }

  verifyPhoneOtp(data:any): Observable<any> {
    return this.restApi.post(`${this.verifyOtpPhoneUrl}`, data);
  }

  verifyAndLogin(data:any): Observable<any> {
    return this.restApi.post(`${this.verifyAndLoginUrl}`, data);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  // Method to fetch logged-in user details
  fetchUserDetails() {
    this.restApi.get(this.getUserUrl).subscribe(
      (user) => {
        this.currentUser.next(user.data);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }


}
