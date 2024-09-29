import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from "@angular/common/http";
import {RESTAPIService} from "./services/restApi.service";
import {userNotification} from "./services/userNotification.service";
import {CheckLocationComponent} from "./check-location/check-location/check-location.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {UserNotificationComponent} from "./notifications/user-notification/user-notification.component";
import {MainAuth} from "../core/services/mainAuth";
import {LocationService} from "./services/location.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomDatePipe} from "./pipes/custom-date";
import {OrderService} from "./services/order.service";
import {ShortNumberPipe} from "./pipes/short-number";



@NgModule({
  declarations: [
    CheckLocationComponent,
    UserNotificationComponent,
    CustomDatePipe,
    ShortNumberPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [CheckLocationComponent, UserNotificationComponent, CustomDatePipe,ShortNumberPipe],
  providers: [RESTAPIService, userNotification, MainAuth, LocationService,OrderService],
})
export class SharedModule {}
