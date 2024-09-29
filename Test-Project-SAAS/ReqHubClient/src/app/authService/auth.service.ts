import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private cookies:CookieService) { }

  url='http://192.168.1.4:9090'

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.cookies.get('accessToken')

    console.log(token)

    let jwttoken = req.clone({
      setHeaders: {
        Authorization:`Bearer ${token}`,
      }
    })
    return next.handle(jwttoken)
  }

  SignUpVerfifyPost(SignUpVerifyEmail:any){
    return this.http.post(`${this.url}/sendmailfortenant`,SignUpVerifyEmail)
  }

  SignUpVerfifyUpdate(SignUpVerifyInfo:any,_tenantId:any){
    return this.http.put(`${this.url}/tenant/updatedata/${_tenantId}`,SignUpVerifyInfo)
  }

  SignInRootUser(SignInRootUserInfo:any){
    return this.http.post(`${this.url}/tenant/login`,SignInRootUserInfo)
  }
}
