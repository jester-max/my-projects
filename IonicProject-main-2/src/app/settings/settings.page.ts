import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  GetLoginData:any

  constructor(private service:ServiceService,private router:Router) {}

  ngOnInit() {
    this.service.LoginUser().subscribe((res:any)=>{
      this.GetLoginData = res.data
      console.log(res)
    })
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Yes',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev:any) {
    if (`${ev.detail.role}` === 'confirm'){
      localStorage.removeItem('jwt-token');
      localStorage.removeItem('csrf-token');
      this.router.navigate(['sign-in'])
    }
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}
