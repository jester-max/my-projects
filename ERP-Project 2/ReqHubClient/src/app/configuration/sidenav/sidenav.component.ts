import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {StructureService} from "../../configured/structure.service";
import {ActivatedRoute} from "@angular/router";
interface SideNavToaggle{
  screenWidth:number
  collapsed:boolean
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToaggle> = new EventEmitter<any>();

  collapsed:any=false
  screenWidth=0
  services:any

  constructor(private service:StructureService,
              private router:ActivatedRoute,){}
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.service.GetTenantServiceStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      this.services = res.data
      console.log(res)
    })
  }

  toggleCollapes() {
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }

  closeCollapes(){
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth});
  }
}
