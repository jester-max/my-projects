import {Component, OnInit} from '@angular/core';
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'KhetSeGhar';

constructor() {
}
  ngOnInit() {
    initFlowbite();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
  }



}
