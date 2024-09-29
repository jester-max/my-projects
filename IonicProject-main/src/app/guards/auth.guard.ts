import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router : Router, private alertCtrl : AlertController) {}


  async canLoad(){
    if ( localStorage.getItem('jwt-token') && localStorage.getItem('csrf-token')){
      return true;
    }else {
      this.router.navigate(['/sign-in'])
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Session expired',
        message: 'Your session is expired please logged in again !!',
        buttons: [
           {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
      return false;
    }
  }

  canActivate() {
    if ( localStorage.getItem('jwt-token') && localStorage.getItem('csrf-token')){
      this.router.navigate(['/dashboard'])
      return false
    }else {
      return true
    }
  }

}
