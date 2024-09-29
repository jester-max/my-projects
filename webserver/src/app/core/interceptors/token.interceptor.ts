import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {MainAuth} from "../services/mainAuth";

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private mainAuth:MainAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the user is logged in

    const isLoggedIn = this.mainAuth.isLoggedIn();

    // If the user is logged in, add the authorization token
    if (isLoggedIn) {
      const authToken = localStorage.getItem('accessToken');

      if (authToken) {
        const authReq = request.clone({
          headers: request.headers.set('Content-Type', 'application/json')
            .set('Authorization', `accessToken ${authToken}`)
        });
        return next.handle(authReq);
      }
    }
    //If there is no token, passing the original request
    return next.handle(request)

  }

}
