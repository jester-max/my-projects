import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.startsWith('https://api.postalpincode.in/pincode')){
      return next.handle(req)
    } else {
      let accessToken = localStorage.getItem('accessToken')

      if (accessToken){
        const authReq = req.clone({
          headers: req.headers.set('Content-type', 'application/json')
            .set('Authorization', `accessToken ${accessToken}`)
        })
        console.log('with token',authReq)
        return next.handle(authReq)
      }
      console.log('without token')
      return next.handle(req);
    }
  }
}
