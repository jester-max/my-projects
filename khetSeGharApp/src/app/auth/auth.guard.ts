import {CanActivate, CanActivateFn, CanLoad, Router} from '@angular/router';
import {AlertController} from "@ionic/angular";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private router : Router, private alertCtrl : AlertController) {}


  async canLoad(){
    if ( localStorage.getItem('accessToken')){
      return true;
    }else {
      this.router.navigate(['/login'])
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
    if ( localStorage.getItem('accessToken')){
      this.router.navigate(['/home-panel'])
      return false
    }else {
      return true
    }
  }

}
