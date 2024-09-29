import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements HttpInterceptor{

  constructor(private http:HttpClient, private cookies:CookieService) { }

  url='http://localhost:9090'

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
    return this.http.put(`${this.url}/tenant-user/updatedata/${_tenantId}`,SignUpVerifyInfo)
  }

  SignInRootUser(SignInRootUserInfo:any){
    return this.http.post(`${this.url}/tenant-user/login`,SignInRootUserInfo)
  }

  GetStartedServices(GetStartedServices:any,token:any){
    return this.http.post(`${this.url}/tenant-user/services/structure/${token}`,GetStartedServices)
  }
}
