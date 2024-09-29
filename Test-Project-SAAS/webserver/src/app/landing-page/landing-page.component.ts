import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private route:Router, public router:ActivatedRoute, private cookieService: CookieService) {
  }
  Route(){
    this.route.navigate(['invoice/',this.router.snapshot.params['_id']])
  }

  config(){
    this.route.navigate(['mainModules/', this.router.snapshot.params['_id']])
    this.cookieService.set('PUBLISH','invoice')
  }

}
