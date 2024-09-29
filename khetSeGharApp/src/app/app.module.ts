import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ServicesService} from "./services.service";
import {ServiceService} from "./auth/service.service";
import {InterceptorService} from "./auth/interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule, FormsModule,  IonicStorageModule.forRoot(),HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide:HTTP_INTERCEPTORS,useClass: InterceptorService,multi:true} ],
  bootstrap: [AppComponent],
})
export class AppModule {}
