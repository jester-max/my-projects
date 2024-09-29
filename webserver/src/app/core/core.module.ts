import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './static-components/navbar/navbar.component';
import { HeaderComponent } from './static-components/header/header.component';
import { CallToActionComponent } from './static-components/call-to-action/call-to-action.component';
import { FooterComponent } from './static-components/footer/footer.component';
import { PageNotFoundComponent } from './static-components/page-not-found/page-not-found.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { ContentLayoutComponent } from './static-components/content-layout/content-layout.component';
import { HomeComponent } from './static-components/home/home.component';
import { HeaderTwoComponent } from './static-components/header-two/header-two.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    CallToActionComponent,
    FooterComponent,
    PageNotFoundComponent,
    ContentLayoutComponent,
    HomeComponent,
    HeaderTwoComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    CallToActionComponent,
    HeaderTwoComponent,
  ],
  imports: [CommonModule, RouterLink, RouterOutlet, SharedModule],
})
export class CoreModule {}
