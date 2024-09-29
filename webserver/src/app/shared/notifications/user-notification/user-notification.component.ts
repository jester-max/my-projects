import {Component, OnDestroy, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {userNotification} from "../../services/userNotification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss']
})
export class UserNotificationComponent implements OnDestroy{
  successMessage:string ='';
  errorMessage:string ='';
  alertMessage:string ='';
  private successMessageSubscription: Subscription;
  private errorMessageSubscription: Subscription;
  private alertMessageSubscription: Subscription;


  constructor(private notificationService :userNotification) {
    this.successMessageSubscription = this.notificationService.successMessage$.subscribe(message => {
      this.successMessage = message;
      setTimeout(()=>{
        this.successMessage = '';
      },3000);
    });
    this.errorMessageSubscription = this.notificationService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
      setTimeout(()=>{
        this.errorMessage = '';
      },3000);
    });
    this.alertMessageSubscription = this.notificationService.alertMessage$.subscribe(message => {
      this.alertMessage = message;
      setTimeout(()=>{
        this.alertMessage = '';
      },3000);
    });
  }

  showError(message: string): void {
    this.errorMessage = message;
  }
  ngOnDestroy(): void {
    initFlowbite()
    this.successMessageSubscription.unsubscribe();
    this.alertMessageSubscription.unsubscribe();
    this.errorMessageSubscription.unsubscribe();
  }

  dismiss(): void {
    console.log('hello from dismiss')
    this.successMessage = '';
    this.alertMessage = '';
    this.errorMessage = '';
  }

}
