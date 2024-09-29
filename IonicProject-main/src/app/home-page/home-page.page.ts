import { Component, OnInit } from '@angular/core';
import {StatusBar} from "@capacitor/status-bar";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor() { }

  ngOnInit() {
    StatusBar.setBackgroundColor({color:'#3880ff'})
  }

}
