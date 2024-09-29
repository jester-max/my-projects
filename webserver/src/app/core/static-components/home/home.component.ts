import {Component, OnDestroy, OnInit} from '@angular/core';
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from "flowbite";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    initFlowbite();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
  }

}
