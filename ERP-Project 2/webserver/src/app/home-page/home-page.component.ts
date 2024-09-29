import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
// @ts-ignore
import AOS from 'aos';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private router:Router,private routerr:ActivatedRoute) {
  }

  ngOnInit():void{
    AOS.init();
  }
  navigate() {
    this.router.navigate([`/mainModules/${this.routerr.snapshot.params['_id']}`])
  }
}
