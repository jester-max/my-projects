import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {delay, finalize, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {userNotification} from "../../../shared/services/userNotification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent {

  isLoading:boolean = false;
  adminEmail:any;
  adminPass:any;
  constructor(
              private authService:AuthService,
              private router : Router,
              private userNotificationService :userNotification
  ) {

  }
  loginAdmin(){

      this.isLoading = true;

      if (this.adminEmail && this.adminPass) {
        const credentials = {workEmail:this.adminEmail,password:this.adminPass};

        this.authService
          .adminLogin(credentials)
          .pipe(
            delay(500),
            tap(() => {
              this.isLoading = false;

              setTimeout(() => {
                this.router.navigate(['/admin']);
              }, 1000);

              console.log('login successful');
              this.userNotificationService.showSuccess('login successful')
            }),
            finalize(() => (this.isLoading = false)),
            catchError((error) => {

              this.userNotificationService.showError(error.error.message || error.message);


              return of(error);
            }),
          )
          .subscribe();
      }
    }

}
