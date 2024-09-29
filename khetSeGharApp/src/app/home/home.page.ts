import {Component, OnInit} from '@angular/core';
import {StatusBar} from "@capacitor/status-bar";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() {}

  ngOnInit() {
    StatusBar.setBackgroundColor({color:'#ffffff'})
  }
}
