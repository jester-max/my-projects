import { Component } from '@angular/core';
interface SideNavToaggle{
  screenWidth:number
  collapsed:boolean
}
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
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
