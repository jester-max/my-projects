import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomePageComponent } from './components/home-page/home-page.component';



@NgModule({
  declarations: [
    HomeHeaderComponent,
    HomePageComponent
  ],
  exports: [
    HomeHeaderComponent

  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
