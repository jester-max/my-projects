import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {MainAuth} from "../services/mainAuth";



@Injectable({

  providedIn: 'root'

})

export class AuthGuard implements CanActivate {

  constructor(private mainAuth: MainAuth, private router: Router) {}

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.mainAuth.isLoggedIn()) {
      console.log('hi')

      this.router.navigate(['/admin/login']);

      return false;

    }

    return true;

  }

}
