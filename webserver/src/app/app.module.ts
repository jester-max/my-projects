import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {FeaturesModule} from "./features/features.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {InterceptorInterceptor} from "./core/interceptors/token.interceptor";
import {provideEcharts} from "ngx-echarts";
import {CollectionAgentModule} from "./features/collection-agent/collection-agent.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    CoreModule,
    SharedModule,
    CollectionAgentModule,
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:InterceptorInterceptor,multi:true}, provideEcharts()],
  bootstrap: [AppComponent]
})
export class AppModule { }
