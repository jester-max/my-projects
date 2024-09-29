import {Component, OnInit} from '@angular/core';
import { register } from 'swiper/element/bundle';
import {ServiceService} from "./auth/service.service";
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private service: ServiceService) {
  }

  ngOnInit():void{
    this.service.refreshNeeded().subscribe(()=>{})
  }

}
