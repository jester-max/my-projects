import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {ServiceService} from "./service.service";
import {NgApexchartsModule} from "ng-apexcharts";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, QRCodeModule,HttpClientModule,FormsModule,NgApexchartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},CookieService,{ provide: HTTP_INTERCEPTORS, useClass: ServiceService, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
