import { Component } from '@angular/core';
interface SideNavToaggle{
  screenWidth:number
  collapsed:boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReqHubClient';
  sideBarOpen:any=false

  isCollapsed:any
  screenWidth:any

  sideBarToggle() {
    this.sideBarOpen=!this.sideBarOpen
  }

  onToggleSideNav(data:SideNavToaggle):void{
    this.screenWidth = data.screenWidth
    this.isCollapsed = data.collapsed
  }
}
